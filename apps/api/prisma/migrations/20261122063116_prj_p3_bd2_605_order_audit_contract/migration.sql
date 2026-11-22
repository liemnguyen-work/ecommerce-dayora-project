
-- PRJ-P3-BD2-FIX #605
-- One migration for Order, OrderItem and OrderStatusLog.
-- Legacy policy confirmed by PM on 22/11/2026.

-- 1. Order: rename address without losing existing values.
ALTER TABLE "Order"
  RENAME COLUMN "recipientAddress" TO "address";

ALTER TABLE "Order"
  ADD COLUMN "shippingZone" TEXT,
  ADD COLUMN "voucherCode" TEXT;

-- Backfill from current shipping rates.
-- Only use a zone when exactly one rate matches the saved fee.
-- Unknown or ambiguous matches fall back to OTHER.
-- Do not change the original shippingFee.
UPDATE "Order" AS o
SET "shippingZone" = COALESCE(
  (
    SELECT MIN(sr."zone")
    FROM "ShippingRate" AS sr
    WHERE sr."fee" = o."shippingFee"
    HAVING COUNT(*) = 1
  ),
  'OTHER'
);

ALTER TABLE "Order"
  ALTER COLUMN "shippingZone" SET NOT NULL;


-- 2. OrderItem: preserve color and backfill NULL values.
ALTER TABLE "OrderItem"
  RENAME COLUMN "colorSnapshot" TO "color";

UPDATE "OrderItem" AS oi
SET "color" = COALESCE(oi."color", s."color", '')
FROM "Sku" AS s
WHERE oi."skuId" = s."id";

UPDATE "OrderItem"
SET "color" = ''
WHERE "color" IS NULL;

ALTER TABLE "OrderItem"
  ALTER COLUMN "color" SET NOT NULL;


-- 3. OrderStatusLog: add new fields as nullable first.
ALTER TABLE "OrderStatusLog"
  ADD COLUMN "field" TEXT,
  ADD COLUMN "fromValue" TEXT,
  ADD COLUMN "toValue" TEXT,
  ADD COLUMN "actorId" TEXT;


-- 4. Read old snapshots in chronological order.
-- Use id as a stable tie-breaker when createdAt is equal.
-- NULL values cannot establish a reliable transition,
-- so unknown changes are not fabricated.

CREATE TEMP TABLE "_605_legacy_axes" AS
WITH snapshots AS (
  SELECT
    l."id" AS "legacyId",
    l."orderId",
    l."createdAt",
    l."status",
    l."paymentStatus",
    l."shippingStatus",

    LAG(l."id") OVER w AS "previousId",
    LAG(l."status") OVER w AS "previousStatus",
    LAG(l."paymentStatus") OVER w AS "previousPaymentStatus",
    LAG(l."shippingStatus") OVER w AS "previousShippingStatus"

  FROM "OrderStatusLog" AS l

  WINDOW w AS (
    PARTITION BY l."orderId"
    ORDER BY l."createdAt", l."id"
  )
),
changes AS (
  SELECT
    s."legacyId",
    s."orderId",
    s."createdAt",
    axis."field",
    CASE
      WHEN s."previousId" IS NULL THEN ''
      ELSE axis."oldValue"
    END AS "fromValue",
    axis."newValue" AS "toValue",
    axis."priority"

  FROM snapshots AS s

  CROSS JOIN LATERAL (
    VALUES
      (
        'status',
        s."previousStatus"::TEXT,
        s."status"::TEXT,
        1
      ),
      (
        'paymentStatus',
        s."previousPaymentStatus"::TEXT,
        s."paymentStatus"::TEXT,
        2
      ),
      (
        'shippingStatus',
        s."previousShippingStatus"::TEXT,
        s."shippingStatus"::TEXT,
        3
      )
  ) AS axis("field", "oldValue", "newValue", "priority")

  WHERE axis."newValue" IS NOT NULL
    AND (
      s."previousId" IS NULL
      OR (
        axis."oldValue" IS NOT NULL
        AND axis."oldValue" <> axis."newValue"
      )
    )
)
SELECT
  c.*,
  ROW_NUMBER() OVER (
    PARTITION BY c."legacyId"
    ORDER BY c."priority"
  ) AS "axisRow"
FROM changes AS c;


-- 5. Reuse the original snapshot id for its first known axis.
-- Preserve orderId and createdAt; mark converted logs.

UPDATE "OrderStatusLog" AS l
SET
  "field" = a."field",
  "fromValue" = a."fromValue",
  "toValue" = a."toValue",
  "actorId" = NULL,
  "note" = 'migrated:legacy'
FROM "_605_legacy_axes" AS a
WHERE l."id" = a."legacyId"
  AND a."axisRow" = 1;


-- 6. Skip snapshots with no determinable axis change.
DELETE FROM "OrderStatusLog" AS l
WHERE NOT EXISTS (
  SELECT 1
  FROM "_605_legacy_axes" AS a
  WHERE a."legacyId" = l."id"
    AND a."axisRow" = 1
);


-- 7. Insert additional axes from the same old snapshot.
INSERT INTO "OrderStatusLog" (
  "id",
  "orderId",
  "field",
  "fromValue",
  "toValue",
  "actorId",
  "note",
  "createdAt"
)
SELECT
  gen_random_uuid()::TEXT,
  a."orderId",
  a."field",
  a."fromValue",
  a."toValue",
  NULL,
  'migrated:legacy',
  a."createdAt"
FROM "_605_legacy_axes" AS a
WHERE a."axisRow" > 1;

DROP TABLE "_605_legacy_axes";


-- 8. Remove old snapshot columns only after conversion.
ALTER TABLE "OrderStatusLog"
  DROP COLUMN "status",
  DROP COLUMN "paymentStatus",
  DROP COLUMN "shippingStatus";

ALTER TABLE "OrderStatusLog"
  ALTER COLUMN "field" SET NOT NULL,
  ALTER COLUMN "fromValue" SET NOT NULL,
  ALTER COLUMN "toValue" SET NOT NULL;


-- 9. Update OrderStatusLog foreign key to ON DELETE CASCADE.
ALTER TABLE "OrderStatusLog"
  DROP CONSTRAINT "OrderStatusLog_orderId_fkey";

ALTER TABLE "OrderStatusLog"
  ADD CONSTRAINT "OrderStatusLog_orderId_fkey"
  FOREIGN KEY ("orderId")
  REFERENCES "Order"("id")
  ON DELETE CASCADE
  ON UPDATE CASCADE;

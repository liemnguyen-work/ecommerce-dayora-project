export function selectFeaturedProducts<T extends { isFeatured: boolean }>(items: T[]): T[] {
  const featured = items.filter((item) => item.isFeatured);
  return (featured.length ? featured : items).slice(0, 8);
}

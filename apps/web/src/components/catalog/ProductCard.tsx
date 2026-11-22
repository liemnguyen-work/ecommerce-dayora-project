import { forwardRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice, type Product } from '../../lib/catalog';
import '../../catalog.css';

function ProductImage({ src, alt }: { src?: string | null; alt: string }) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  return (
    <div className="catalog-image">
      {src && src !== failedSrc ? <img src={src} alt={alt} loading="lazy" onError={() => setFailedSrc(src)} /> : <span>Ảnh sản phẩm đang cập nhật</span>}
    </div>
  );
}

const ProductCard = forwardRef<HTMLElement, { product: Product; search?: string }>(
  function ProductCard({ product, search = '' }, ref) {
    const image = product.skus.find((sku) => sku.imageUrl)?.imageUrl;
    const sku = product.skus.reduce<Product['skus'][number] | undefined>((lowest, current) => {
      const effective = current.salePrice !== null && current.salePrice < current.price ? current.salePrice : current.price;
      const previous = lowest && lowest.salePrice !== null && lowest.salePrice < lowest.price ? lowest.salePrice : lowest?.price;
      return previous === undefined || effective < previous ? current : lowest;
    }, undefined);
    const discounted = sku && sku.salePrice !== null && sku.salePrice < sku.price;

    return (
      <article ref={ref} className="catalog-card">
        <Link to={`/san-pham/${encodeURIComponent(product.slug)}${search}`} className="catalog-card__link">
          <ProductImage src={image} alt={product.name} />
          <div className="catalog-card__body">
            <h3>{product.name}</h3>
            {sku ? <p className="catalog-card__price"><span>{formatPrice(discounted ? sku.salePrice! : sku.price)}</span>{discounted && <del>{formatPrice(sku.price)}</del>}</p> : <p className="catalog-card__price">Giá đang cập nhật</p>}
          </div>
        </Link>
      </article>
    );
  },
);

export default ProductCard;

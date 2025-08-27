import { storyblokEditable } from '@storyblok/react/rsc';
import '../styles/product.css';

export default function Product({ blok }) {
  return (
    <div className="product" {...storyblokEditable(blok)}>
      {blok.image?.filename && (
        <div className="product-image">
          <img src={blok.image.filename} alt={blok.image.alt || blok.name} />
        </div>
      )}
      <div className="product-info">
        {blok.name && <h3>{blok.name}</h3>}
        {blok.description && <p className="description">{blok.description}</p>}
        {blok.price && <p className="price">${blok.price}</p>}
        {blok.purchase_link?.url && (
          <a href={blok.purchase_link.url} className="cta">🧶 Add to Basket</a>
        )}
      </div>
    </div>
  );
}

import { storyblokEditable } from '@storyblok/react/rsc';
import Product from './product';
import '../styles/gallery.css';

export default function Gallery({ blok }) {
  return (
    <section>
<div className='product-title'><h1>Our Products</h1></div>
<div id="gallery" className="product-grid" {...storyblokEditable(blok)}>
       
      {blok.products.map(product => (
        <Product key={product._uid} blok={product} />
      ))}
    </div>
    </section>
  )
}

import '../styles/hero.css';
import { storyblokEditable } from '@storyblok/react/rsc';

export default function Hero({ blok }) {
  return (
    <section 
    id="hero"
      className="background_image"
      style={{ backgroundImage: blok.background_image?.filename ? `url(${blok.background_image.filename})` : 'none' }}
      {...storyblokEditable(blok)}
    >      
      <div className="headline">
        {blok.title && <h1>{blok.title}</h1>}
        {blok.subtitle && <p>{blok.subtitle}</p>}
        {blok.button_text && (
          <button className="cta">
            {blok.button_text} →
          </button>
        )}
      </div>
    </section>
  );
}

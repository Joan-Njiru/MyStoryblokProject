
import { storyblokEditable } from '@storyblok/react/rsc';
import '../styles/newsletter.css';

export default function Newsletter({ blok }) {
  return (
    <section id="newsletter" className="newsletter" {...storyblokEditable(blok)}>
      <div className="newsletter-container">
        {blok.title && (
          <h3 className="newsletter-title">{blok.headline}</h3>
        )}
        {blok.description && (
          <p className="newsletter-description">{blok.description}</p>
        )}
        
        <form className="newsletter-form">
          <input
            type="email"
            placeholder={blok.placeholder || "Your email address"}
            className="newsletter-input"
            required
          />
          <button type="submit" className="newsletter-button">
            {blok.button_text || "Subscribe"} 🧶
          </button>
        </form>
        
        {blok.success_message && (
          <p className="newsletter-success">{blok.success_message}</p>
        )}
      </div>
    </section>
  );
}
// src/components/footer.jsx
import { storyblokEditable } from '@storyblok/react/rsc';
import '../styles/footer.css';

export default function Footer({ blok }) {
  return (
    <footer className="footer" {...storyblokEditable(blok)}>
      <div className="footer-container">
        {/* Tagline Section */}
        {/* {blok.Tagline && (
          <div className="footer-tagline">
          <p className='tagline'>{blok.Tagline}</p>  
          </div>
        )} */}

        {blok.copyright && (
          <div className="footer-copyright">
            <p>{blok.copyright}</p>
          </div>
        )}
      </div>
    </footer>
  );
}
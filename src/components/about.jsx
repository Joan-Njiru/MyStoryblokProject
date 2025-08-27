import '../styles/about.css';
import { storyblokEditable } from '@storyblok/react/rsc';
import ReactMarkdown from 'react-markdown';

export default function About({ blok }) {
  return (
    <section id="about" className="about" {...storyblokEditable(blok)}>
      <div className="container">
        <div className='about_image'>
          {blok.image?.filename && (
            <img
              src={blok.image.filename}
              alt={blok.image.alt || "About image"}
              className="image"
            />
          )}
        </div>
        <div className='content'>
          {blok.headline && (
            <h2 className="headline">{blok.headline}</h2>
          )}
          {blok.text && (
            <div className="text">
              <ReactMarkdown>{blok.text}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
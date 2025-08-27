'use client';

import { useEffect } from 'react';

export default function StoryblokBridgeLoader() {
  useEffect(() => {
    const isInEditor = typeof window !== 'undefined' && 
                      window.location.search.includes('_storyblok');
    
    if (isInEditor) {
      console.log('📡 Storyblok editor detected, ensuring bridge...');

      // Check if bridge is already loaded
      if (typeof window.storyblok === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://app.storyblok.com/f/storyblok-v2-latest.js';
        script.async = true;
        
        script.onload = () => {
          console.log('✅ Storyblok bridge script loaded');
          if (window.storyblok) {
            window.storyblok.init();
            console.log('✅ Storyblok bridge initialized');
          }
        };

        document.body.appendChild(script);
      } else {
        console.log('ℹ️ Storyblok bridge already loaded');
        window.storyblok.init();
      }
    }
  }, []);

  return null;
}
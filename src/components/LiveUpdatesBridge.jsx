// components/LiveUpdatesBridge.jsx
"use client";
import { useEffect, useState } from "react";
import { useStoryblokBridge } from "@storyblok/react";

export default function LiveUpdatesBridge({ story }) {
  const [liveStory, setLiveStory] = useState(story);

  useEffect(() => {
    // Validate story structure before using it
    if (!story || typeof story !== 'object' || !story.id) {
      console.error('Invalid story prop:', story);
      return;
    }

    if (typeof window !== "undefined") {
      const isInEditor = window.location.search.includes('_storyblok');
      
      if (isInEditor) {
        try {
          useStoryblokBridge(story.id, (newStory) => {
            // Validate incoming story data
            if (newStory && newStory.content && typeof newStory.content === 'object') {
              setLiveStory(newStory);
            } else {
              console.error('Invalid story update:', newStory);
            }
          });
        } catch (bridgeError) {
          console.error('Storyblok bridge error:', bridgeError);
        }
      }
    }
  }, [story]);

  return null;
}
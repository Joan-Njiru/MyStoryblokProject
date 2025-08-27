"use client";

import { useEffect, useState } from "react";
import { useStoryblokBridge } from "@storyblok/react";

export default function LiveUpdatesBridge({ story }) {
  const [liveStory, setLiveStory] = useState(story);

  useEffect(() => {
    const isInEditor = typeof window !== "undefined" && 
                      window.location.search.includes('_storyblok');
    
    if (isInEditor && story && typeof window.storyblok !== 'undefined') {
      console.log(" Initializing Storyblok bridge for live updates");
      
      useStoryblokBridge(story.id, (newStory) => {
        console.log(" LIVE UPDATE RECEIVED:", newStory.name);
        setLiveStory(newStory);
        window.location.reload();
      });
    }
  }, [story]);

  return null;
}
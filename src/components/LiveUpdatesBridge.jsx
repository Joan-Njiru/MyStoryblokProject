"use client";

import { useState, useEffect } from "react";
import { useStoryblokBridge } from "@storyblok/react";

export default function LiveUpdatesBridge({ story, children }) {
  const [liveStory, setLiveStory] = useState(story);

  useEffect(() => {
    if (!story?.id) return;

    
    if (typeof window !== "undefined" && window.location.search.includes("_storyblok")) {
      useStoryblokBridge(story.id, (newStory) => {
        if (newStory?.content) {
          setLiveStory(newStory);
        }
      });
    }
  }, [story]);


  if (typeof children === "function") {
    return children(liveStory);
  }


  return children
    ? Array.isArray(children)
      ? children.map((child, i) =>
          child && child.props
            ? { ...child, props: { ...child.props, story: liveStory } }
            : child
        )
      : { ...children, props: { ...children.props, story: liveStory } }
    : null;
}

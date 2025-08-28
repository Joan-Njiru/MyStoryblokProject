'use client'; 

import { storyblokInit, apiPlugin, getStoryblokApi, StoryblokStory } from '@storyblok/react/rsc';
import StoryblokBridgeLoader from '@/components/StoryblokBridgeLoader';
import LiveUpdatesBridge from '@/components/LiveUpdatesBridge';
import PageComponent from "@/components/page";
import About from "@/components/about";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Gallery from "@/components/gallery";
import Navbar from "@/components/navbar";
import RetryButton from '@/components/RetryButton';
import Newsletter from '@/components/newsletter'

const isDevelopment = process.env.NODE_ENV === 'development';
const isPreview = process.env.NEXT_PUBLIC_PREVIEW_MODE === 'true';
const version = (isDevelopment || isPreview) ? 'draft' : 'published';

const accessToken = (isDevelopment || isPreview)
  ? process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN
  : process.env.NEXT_PUBLIC_STORYBLOK_TOKEN;

console.log('Environment:', process.env.NODE_ENV);
console.log('Token available:', !!accessToken);
console.log('Is production:', process.env.NODE_ENV === 'production');

storyblokInit({
  accessToken,
  use: [apiPlugin],
  components: {
    page: PageComponent,
    hero: Hero,
    footer: Footer,
    about: About,
    gallery: Gallery,
    newsletter: Newsletter,
  },
  apiOptions: { region: 'eu' },
});


export default async function DynamicPage({ params }) {
  try {
    const storyblokApi = getStoryblokApi();
    const slug = params.slug ? params.slug.join('/') : 'home';
    
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, { version });

    if (!data || !data.story || !data.story.content) {
      console.error('Invalid Storyblok response:', JSON.stringify(data, null, 2));
      throw new Error('Received invalid data from Storyblok API');
    }

   
    console.log('Story data received:', {
      hasStory: !!data.story,
      storyId: data.story?.id,
      hasContent: !!data.story?.content,
      contentKeys: data.story?.content ? Object.keys(data.story.content) : 'none'
    });

    return (
  <>
    <StoryblokBridgeLoader />
    <Navbar />
    <LiveUpdatesBridge story={data.story}>
      {(liveStory) => (
        <div className="page">
          <StoryblokStory story={liveStory} />
        </div>
      )}
    </LiveUpdatesBridge>
  </>
);
  } catch (error) {
    console.error('Error fetching Storyblok data:', error);


    return <RetryButton message={error.message} />;
  }
}

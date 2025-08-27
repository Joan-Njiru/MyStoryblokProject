import { storyblokInit, apiPlugin, getStoryblokApi, StoryblokStory } from '@storyblok/react/rsc';
import StoryblokBridgeLoader from '@/components/StoryblokBridgeLoader';
import LiveUpdatesBridge from '@/components/LiveUpdatesBridge';
import PageComponent from "@/components/page";
import About from "@/components/about";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Gallery from "@/components/gallery";
import Navbar from "@/components/navbar";
import Newsletter from "@/components/newsletter";

const isDevelopment = process.env.NODE_ENV === 'development';
const isPreview = process.env.NEXT_PUBLIC_PREVIEW_MODE === 'true';
const version = (isDevelopment || isPreview) ? 'draft' : 'published';
console.log('Environment:', process.env.NODE_ENV);
console.log('Token available:', !!process.env.NEXT_PUBLIC_STORYBLOK_TOKEN);
console.log('Is production:', process.env.NODE_ENV === 'production');

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  use: [apiPlugin],
  components: {
    page: PageComponent,
    hero: Hero,
    footer: Footer,
    about: About,
    gallery: Gallery,
    newsletter: Newsletter,
  },
  apiOptions: {
    region: 'eu',
  },
});

export default async function DynamicPage({ params }) {
  try {
    const storyblokApi = getStoryblokApi();
    const slug = params.slug ? params.slug.join('/') : 'home';
    
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
      version: 'draft',
    });

    // 🔥 CRITICAL VALIDATION - Add this
    if (!data || !data.story || !data.story.content) {
      console.error('Invalid Storyblok response:', JSON.stringify(data, null, 2));
      throw new Error('Received invalid data from Storyblok API');
    }

    // Log the data structure for debugging
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
        <LiveUpdatesBridge story={data.story} />
        <div className="page">
          <StoryblokStory story={data.story} />
        </div>
      </>
    );
  } catch (error) {
    console.error('Error fetching Storyblok data:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Error loading content</h1>
          <p className="text-gray-600">{error.message}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
}
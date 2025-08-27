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
      version: version, 
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
          <h1 className="text-2xl font-bold text-red-600">Page not found</h1>
          <p className="text-gray-600">Check console for details</p>
        </div>
      </div>
    );
  }
}
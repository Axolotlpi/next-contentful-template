import type { NextPage } from 'next';
import BaseLayout from '../layouts/BaseLayout';
import BaseHead from '../layouts/BaseHead';
import BlogPost from '../components/BlogPost';
import Banner from '../components/Banner';
import { getContent } from '../utils/helpers';
import { queries } from '../utils/queries';
import type { FeaturedPosts, SiteSettings } from '../utils/queries';

interface Props {
  siteSettings: SiteSettings;
  featuredPosts: FeaturedPosts;
}

export async function getStaticProps() {
  const [siteSettings, featuredPosts] = await Promise.all([
    getContent(queries.siteSettings),
    getContent(queries.featuredPosts),
  ]);
  return {
    props: { siteSettings, featuredPosts },
  };
}

const Home: NextPage<Props> = ({ siteSettings, featuredPosts }) => {
  return (
    <BaseLayout>
      <BaseHead {...siteSettings} />
      <main>
        <h1>{siteSettings.title}</h1>
        <div className="h-screen w-full text-center flex flex-col justify-evently items-center">
          <Banner
            title={featuredPosts[0].mainTitle}
            teaser={featuredPosts[0].teaser}
            image={{
              src: featuredPosts[0].mainImage.url,
              description: featuredPosts[0].mainImage.description,
            }}
          />
        </div>
        <ul>
          <BlogPost title="not many posts here" />
        </ul>
      </main>

      <footer></footer>
    </BaseLayout>
  );
};

export default Home;

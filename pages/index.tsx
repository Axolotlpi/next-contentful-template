import type { NextPage } from 'next';
import Link from 'next/link';
import BaseLayout from '../layouts/BaseLayout';
import BaseHead from '../layouts/BaseHead';
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
    <BaseLayout heading={siteSettings.title}>
      <BaseHead {...siteSettings} />
      <main>
        <div className="p-8 w-full mx-auto md:w-11/2 lg:w-10/12 max-w-6xl text-center">
          <Banner
            title={featuredPosts[0].mainTitle}
            teaser={featuredPosts[0].teaser}
            image={{
              src: featuredPosts[0].mainImage.url,
              description: featuredPosts[0].mainImage.description,
            }}
          />
        </div>
        <div className="p-8 flex justify-center items-center">
          <Link href="/posts/slug-here">
            <a className="h2 font-bold rounded border-2 border-accent-1">
              Go to post
            </a>
          </Link>
        </div>
      </main>

      <footer></footer>
    </BaseLayout>
  );
};

export default Home;

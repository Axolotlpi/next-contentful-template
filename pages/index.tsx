import type { NextPage } from 'next';
import Link from 'next/link';
import BaseLayout from '../layouts/BaseLayout';
import BaseHead from '../layouts/BaseHead';
import Banner from '../components/Banner';
import { getContent } from '../utils/helpers';
import { queries } from '../utils/queries';
import type { PostBrief, SiteSettings } from '../utils/queries';

interface Props {
  siteSettings: SiteSettings;
  featuredPosts: PostBrief[];
  posts: PostBrief[];
}

export async function getStaticProps() {
  const [siteSettings, featuredPosts, posts] = await Promise.all([
    getContent(queries.siteSettings),
    getContent(queries.featuredPosts),
    getContent(queries.posts, { limit: 50 }),
  ]);
  return {
    props: { siteSettings, featuredPosts, posts },
  };
}

const Home: NextPage<Props> = ({ siteSettings, featuredPosts, posts }) => {
  return (
    <BaseLayout heading={siteSettings.title}>
      <BaseHead {...siteSettings} />
      <main className="bg-primary-1">
        <div className="p-8 mx-auto w-b-1 text-center drop-shadow-xl">
          <Banner
            title={featuredPosts[0].mainTitle}
            teaser={featuredPosts[0].teaser}
            image={{
              src: featuredPosts[0].mainImage.url,
              description: featuredPosts[0].mainImage.description,
            }}
          />
        </div>
        <div className="p-2 md:p-4 lg:p-8 flex justify-center bg-primary-3">
          {posts &&
            posts.map(
              ({
                postPageSettings,
                sys,
                mainTitle,
                teaser,
                mainImage,
                description,
              }) => (
                <Link href={`/posts/${postPageSettings.slug}`}>
                  <a>
                    <h1>{mainTitle}</h1>
                  </a>
                </Link>
              )
            )}
        </div>
      </main>

      <footer></footer>
    </BaseLayout>
  );
};

export default Home;

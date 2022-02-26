import type { NextPage } from 'next';
import { GetStaticPaths, GetStaticProps } from 'next';
import BaseLayout from '../../layouts/BaseLayout';
import BaseHead from '../../layouts/BaseHead';
import { getContent, makePostCanonicalUrl } from '../../utils/helpers';
import { queries } from '../../utils/queries';
import type { SiteSettings, PageSettings, Post } from '../../utils/queries';

interface Props {
  pageSettings: SiteSettings;
  post: Post;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getContent(queries.postSlugs);
  const paths = slugs.map((slug: string) => ({ params: { id: slug } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const [siteSettings, post] = await Promise.all([
    getContent(queries.siteSettings),
    getContent(queries.postBySlug, { slug: params?.id }),
  ]);

  console.log(post);
  const pageSettings = {
    ...siteSettings,
    ...post.postPageSettings,
    canonicalUrl: makePostCanonicalUrl(siteSettings, post.postPageSettings),
  };

  return {
    props: { pageSettings, post },
  };
};

const Home: NextPage<Props> = ({ pageSettings, post }) => {
  return (
    <BaseLayout heading={pageSettings.title}>
      <BaseHead {...pageSettings} />
      <main>
        <h1>{post.mainTitle}</h1>
      </main>

      <footer></footer>
    </BaseLayout>
  );
};

export default Home;

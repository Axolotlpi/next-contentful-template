import type { NextPage } from 'next';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import BaseLayout from '../../layouts/BaseLayout';
import BaseHead from '../../layouts/BaseHead';
import PostBody from '../../components/PostBody';
import {
  getContent,
  makePostCanonicalUrl,
  formatBlogPostDate,
} from '../../utils/helpers';
import { queries } from '../../utils/queries';
import type { PageSettings, Post, RichText } from '../../utils/queries';

interface Props {
  pageSettings: PageSettings;
  post: Post;
  postBody: RichText;
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

  const postBody = await getContent(queries.postBody, { id: post.sys.id });

  const pageSettings = {
    ...siteSettings,
    ...post.postPageSettings,
    canonicalUrl: makePostCanonicalUrl(siteSettings, post.postPageSettings),
  };

  return {
    props: { pageSettings, post, postBody },
  };
};

const Home: NextPage<Props> = ({ pageSettings, post, postBody }) => {
  return (
    <BaseLayout heading={pageSettings.title}>
      <BaseHead {...pageSettings} />
      <main>
        <article className="pt-8 p-4 md:px-8 w-b mx-auto text-primary-3 bg-primary-0">
          <header className="font-heading">
            <Link href="/">
              <a className="p-2 h3 font-bold font-sans text-accent-1 hover:text-accent-2">
                &lt; Home
              </a>
            </Link>
            <div className="p-2 pb-8 pt-4 md:pb-20 md:pt-10 md:p-4 grid grid-rows-2 md:grid-cols-2 md:grid-rows-1 drop-shadow-xl">
              <h1 className="pt-8 pl-4 text-accent-1 break-normal">
                {post.mainTitle}
              </h1>
            </div>
          </header>
          <PostBody body={postBody} />
        </article>
      </main>

      <footer></footer>
    </BaseLayout>
  );
};

export default Home;

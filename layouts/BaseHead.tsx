import type { NextPage } from 'next';
import SocialGraph from '../components/SocialGraph';
import Head from 'next/head';
import { site } from '../utils/siteConfig';

export interface Props {
  title?: string;
  description?: string;
  canonicalURL?: string;
  socialImage?: string;
}

const BaseHead: NextPage<Props> = ({
  title,
  description,
  canonicalURL,
  socialImage,
}) => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, viewport-fit=cover"
      />

      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href={'../style/global.css'} />
      {/* Primary Meta Tags*/}
      <title>{title || site.title}</title>
      <meta name="title" content={title || site.title} />
      <meta name="description" content={description || site.description} />
      {/* Sitemap */}
      <link rel="sitemap" href="/sitemap.xml" />
      {/* Canonical */}
      <link rel="canonical" href={canonicalURL || site.url} />
      {/* RSS */}
      <link
        rel="alternate"
        type="application/rss+xml"
        title={`${site.name} Blog`}
        href={`${site.url}/feed/blog.xml`}
      />

      <SocialGraph
        title={title || site.title}
        description={description || site.description}
        canonicalURL={canonicalURL || site.url}
        imageUrl={socialImage}
      />

      {/* Favicons  */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#2b5797" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
  );
};

export default BaseHead;

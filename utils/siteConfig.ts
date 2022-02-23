import type { SiteSettings, Author } from './queries';

export const site: SiteSettings = {
  name: '',
  canonicalUrl: '',
  title: '',
  description: '',
  socialImage: '',
};

// for use with  <script type="application/ld+json>
export const generateStructuredData = (
  title: string,
  author: Author,
  permalink: string,
  datePublished: string, //iso 8601 format
  mainImage: string,
  description: string
) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  url: `${permalink}`,
  headline: `${title}`,
  datePublished: `${datePublished}`,
  description: `${description}`,
  image: {
    '@type': 'ImageObject',
    url: `${mainImage}`,
    width: 1200,
  },
  publisher: {
    '@type': 'Organization',
    name: `${site.name}`,
    url: `${site.canonicalUrl}/blog/`,
  },
  author: {
    '@type': 'Person',
    name: `${author.name}`,
    image: {
      '@type': 'ImageObject',
      url: `${author.image}`,
      width: 512,
      height: 512,
    },
    url: `${site.canonicalUrl}/author/${author.name}`,
  },
});

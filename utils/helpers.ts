import { parseISO, format } from 'date-fns';
import { GraphQLClient } from 'graphql-request';
import type { Asset, Entry, ImageTransformOptions, Query } from './queries';
import { queries } from './queries';

const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;

const client = new GraphQLClient(endpoint, {
  headers: { authorization: `Bearer ${process.env.CONTENTFUL_KEY}` },
});

export async function getContent(query: Query, variables?: Object) {
  const res = await client.request(query.string, variables);
  return query.reformat && res ? query.reformat(res) : res;
}

export function makePostCanonicalUrl(
  siteSettings: { canonicalUrl: string },
  postPageSettings: { slug: string }
) {
  return `${siteSettings.canonicalUrl}/posts/${postPageSettings.slug}`;
}

export function makeEntryMap<T>(entries: Entry<T>[]): Map<string, Entry<T>> {
  const entriesMap = new Map();
  entries.forEach((entry) => {
    entriesMap.set(entry.sys.id, entry);
  });
  return entriesMap;
}

//for more specific image urls
export async function getImageUrl(
  imageRaw: Asset,
  imageTransformOptions: ImageTransformOptions
) {
  const image = await getContent(queries.image, {
    imageId: imageRaw.sys.id,
    imageTransformOptions: imageTransformOptions,
  });
  return image.url;
}

export function formatBlogPostDate(date: string) {
  const dateString = parseISO(date);
  const formattedDateString = format(dateString, 'MMMM do, yyyy');
  return `${formattedDateString}`;
}

import { parseISO, format } from 'date-fns';
import { GraphQLClient } from 'graphql-request';
import type { Image, ImageTransformOptions, Query } from './queries';
import { queries, SiteSettings, PageSettings } from './queries';

const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;

const client = new GraphQLClient(endpoint, {
  headers: { authorization: `Bearer ${process.env.CONTENTFUL_KEY}` },
});

export async function getContent(query: Query, variables?: Object) {
  const res = await client.request(query.string, variables);
  return query.reformat && res ? query.reformat(res) : res;
}

export function makePostCanonicalUrl(
  siteSettings: SiteSettings,
  postPageSettings: PageSettings
) {
  return `${siteSettings.canonicalUrl}/posts/${postPageSettings.slug}`;
}

//for more specific image urls
export async function getImageUrl(
  imageRaw: Image,
  imageTransformOptions: ImageTransformOptions
) {
  const image = await getContent(queries.image, {
    imageId: imageRaw.sys.id,
    imageTransformOptions: imageTransformOptions,
  });
  return image.url;
}

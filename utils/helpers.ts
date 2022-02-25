import { parseISO, format } from 'date-fns';
import { GraphQLClient } from 'graphql-request';
import type { Query } from './queries';

const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;

const client = new GraphQLClient(endpoint, {
  headers: { authorization: `Bearer ${process.env.CONTENTFUL_KEY}` },
});

export async function getContent(query: Query, variables?: Object) {
  const res = await client.request(query.string, variables);
  return query.reformat && res ? query.reformat(res) : res;
}

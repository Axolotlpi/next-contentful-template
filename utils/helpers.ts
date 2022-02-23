import { parseISO, format } from 'date-fns';
import { GraphQLClient } from 'graphql-request';

const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;

const client = new GraphQLClient(endpoint, {
  headers: { authorization: `Bearer ${process.env.CONTENTFUL_KEY}` },
});

export async function getContent(query: string, variables?: Object) {
  return await client.request(query, variables);
}

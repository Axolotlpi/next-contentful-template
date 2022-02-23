//this file defines the coupling between cms schema and local types
import { gql } from 'graphql-request';

export const queries = {
  siteSettings: gql`
    query siteSettings {
      siteSettings(id: "7HAmX0aOWhBjyDGj3uAvxM") {
        title
        canonicalUrl
        description
        socialImage {
          url
        }
      }
    }
  `,
  landingPage: gql`
    query landingPage {
      landingPage(id: "27EJIPqxiEWpF7VxJlhklV") {
        mainTitle
      }
    }
  `,
};

export type SiteSettings = {
  name: string;
  title: string;
  description: string;
  canonicalUrl: string;
  socialImage: any;
};

export type LandingPage = {
  mainTitle: string;
};

export type Social = {
  name: string;
  icon: any;
  url: string;
};

export type Post = {
  title: string;
  description: string;
  slug: any;
  mainImage: any;
  author: Author;
  publishedAt: string; // iso 8601
  bodyRaw: any; // block
};

export type Author = {
  name: string;
  image: string;
  bio: any; //array of block text
};

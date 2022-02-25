//this file defines the coupling between cms schema and local types
import { gql } from 'graphql-request';

export type Query = {
  string: string;
  reformat?: (result: any) => any;
};

export const queries: { [queryNames: string]: Query } = {
  siteSettings: {
    string: gql`
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
    reformat: (res) => res.siteSettings,
  },
  image: {
    string: gql`
      query image( #required variables
        $imageId: String!
        $imageTransformOptions: ImageTransformOptions
      ) {
        image: asset(id: $imageId) {
          url(transform: $imageTransformOptions)
        }
      }
    `,
  },
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

export type ImageTransformOptions = {
  width: number; //1-4000
  height: number; //1-4000
  quality: number; //1-100
  cornerRadius: number;
  resizeStrategy: 'FIT' | 'PAD' | 'FILL' | 'SCALE' | 'CROP' | 'THUMB';
  resizeFocus:
    | 'CENTER'
    | 'TOP'
    | 'TOP_RIGHT'
    | 'RIGHT'
    | 'BOTTOM_RIGHT'
    | 'BOTTOM'
    | 'BOTTOM_LEFT'
    | 'LEFT'
    | 'TOP_LEFT'
    | 'FACE'
    | 'FACES';
  backgroundColor: string; //hex color
  format: 'JPG' | 'JPG_PROGRESSIVE' | 'PNG' | 'PNG8' | 'WEBP' | 'AVIF';
};

export type Image = {
  sys: {
    id: string;
  };
  description: string;
  url: string;
};

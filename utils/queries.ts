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
  featuredPosts: {
    string: gql`
      query featuredPosts {
        featuredBlogPosts(id: "60VW2wUa41gpp0Vg2cm39K") {
          #singleton of an array of refs
          featuredPostsCollection {
            items {
              sys {
                id
              }
              mainTitle
              teaser
              mainImage {
                sys {
                  id
                }
                description
                url
              }
            }
          }
        }
      }
    `,
    reformat: (res) => res.featuredBlogPosts.featuredPostsCollection.items,
  },
  postSlugs: {
    string: gql`
      query postsSlug {
        blogPostCollection {
          items {
            postPageSettings {
              slug
            }
          }
        }
      }
    `,
    reformat: (res) =>
      res.blogPostCollection.items.map(
        (item: any) => item.postPageSettings.slug
      ),
  },
  postBySlug: {
    string: gql`
      query postBySlug($slug: String) {
        blogPostCollection(where: { postPageSettings: { slug: $slug } }) {
          items {
            mainTitle
            teaser
            description
            publishDate
            author {
              sys {
                id
              }
            }
            postPageSettings {
              title
              description
              socialImage {
                sys {
                  id
                }
                description
                url
              }
              slug
            }
          }
        }
      }
    `,
    reformat: (res) => res.blogPostCollection.items[0],
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

export type PageSettings = {
  sys: { id: string };
  title: string;
  description: string;
  socialImage: Image;
  slug: string;
};

export type LandingPage = {
  mainTitle: string;
};

export type FeaturedPosts = {
  sys: {
    id: string;
  };
  mainTitle: string;
  teaser: string;
  mainImage: Image;
}[];

export type Social = {
  name: string;
  icon: any;
  url: string;
};

export type Post = {
  //body is queried seperately
  sys: { id: string };
  mainTitle: string;
  teaser: string;
  description: string;
  publishedDate: string; // iso 8601
  author: { sys: { id: string } };
  mainImage: Image;
  postPageSettings: PageSettings;
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

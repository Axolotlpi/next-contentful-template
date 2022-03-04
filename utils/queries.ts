//this file defines the coupling between cms schema and local types
import { gql } from 'graphql-request';

export type Query = {
  string: string;
  reformat?: (result: any) => any;
};

//comments on queries reflect the resulting type when called by getContent()
export const queries: { [queryNames: string]: Query } = {
  siteSettings: {
    //SiteSettings
    string: gql`
      query siteSettings {
        siteSettings(id: "") {
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
    //FeaturedPosts
    string: gql`
      query featuredPosts {
        featuredBlogPosts(id: "") {
          featuredPostsCollection {
            items {
              sys {
                id
              }
              mainTitle
              teaser
              mainImage {
                ...asset
              }
              postPageSettings {
                slug
              }
            }
          }
        }
      }
      fragment asset on Asset {
        sys {
          id
        }
        description
        url
        width
        height
      }
    `,
    reformat: (res) => res.featuredBlogPosts.featuredPostsCollection.items,
  },
  postSlugs: {
    //string[]
    string: gql`
      query postSlugs($skip: Int = 0, $limit: Int = 100) {
        blogPostCollection(skip: $skip, limit: $limit) {
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
    //string[]
    string: gql`
      query postBySlug($slug: String) {
        blogPostCollection(where: { postPageSettings: { slug: $slug } }) {
          items {
            sys {
              id
            }
            mainTitle
            teaser
            description
            publishDate
            author {
              sys {
                id
              }
            }
            mainImage {
              ...asset
            }
            postPageSettings {
              sys {
                id
              }
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

      fragment asset on Asset {
        sys {
          id
        }
        description
        url
        width
        height
      }
    `,
    reformat: (res) => res.blogPostCollection.items[0],
  },
  posts: {
    //Post[]
    string: gql`
      query posts($skip: Int = 0, $limit: Int = 100) {
        blogPostCollection(skip: $skip, limit: $limit) {
          items {
            sys {
              id
            }
            mainTitle
            teaser
            description
            publishDate
            author {
              sys {
                id
              }
            }
            mainImage {
              sys {
                id
              }
              description
              url
            }
            postPageSettings {
              sys {
                id
              }
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
    reformat: (res) => res.blogPostCollection.items,
  },
  postBody: {
    //RichText
    string: gql`
      query postBody($id: String!) {
        blogPost(id: $id) {
          body {
            json
            links {
              entries {
                inline {
                  __typename
                  ...linkedEntries
                }
                hyperlink {
                  sys {
                    id
                  }
                  contentfulMetadata {
                    tags {
                      id
                      name
                    }
                  }
                }
                block {
                  ...linkedEntries
                }
              }
              assets {
                hyperlink {
                  description
                  url
                }
                block {
                  ...asset
                }
              }
            }
          }
        }
      }

      fragment linkedEntries on Entry {
        __typename
        ... on Author {
          sys {
            id
          }
          name
          bio
          shortDescription
          pageUrl
          profileImage {
            ...asset
          }
        }
        ... on BlogPost {
          sys {
            id
          }
          mainTitle
          teaser
          description
          publishDate
          mainTitle
          mainImage {
            ...asset
          }
          postPageSettings {
            ...pageSettings
          }
        }
      }

      fragment asset on Asset {
        sys {
          id
        }
        description
        url
        width
        height
      }
      fragment pageSettings on PageSettings {
        sys {
          id
        }

        title
        description
        socialImage {
          ...asset
        }
        slug
      }
    `,
    reformat: (res) => res.blogPost.body,
  },
  image: {
    //{url:string}
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

export type Entry<T> = T & {
  sys: { id: string };
};

//GQL __typenames should correspond to these (if used in corresponding type)
export enum __TYPENAMES {
  AUTHOR = 'Author',
  BLOG_POST = 'BlogPost',
}

export type SiteSettings = {
  name: string;
  title: string;
  description: string;
  canonicalUrl: string;
  socialImage: any;
};

export type PageSettings = SiteSettings & {
  sys: { id: string };
  slug: string;
};

export type LandingPage = {
  mainTitle: string;
};

export type PostBrief = {
  sys: {
    id: string;
  };
  mainTitle: string;
  teaser: string;
  description: string;
  mainImage: Asset;
  postPageSettings: { slug: string };
};

export type Social = {
  name: string;
  icon: any;
  url: string;
};

export type Post = {
  //body is queried seperately
  __typename?: __TYPENAMES.BLOG_POST;
  sys: { id: string };
  mainTitle: string;
  teaser: string;
  description: string;
  publishDate?: string; // iso 8601
  author?: { sys: { id: string } };
  mainImage: Asset;
  postPageSettings: PageSettings;
};

export type Author = {
  __typename?: __TYPENAMES.AUTHOR;
  sys: {
    id: string;
  };
  name: string;
  profileImage: Asset;
  bio: string; //markdown
  shortDescription: string;
  pageUrl?: string;
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
//currently treated as an image
export type Asset = {
  sys: {
    id: string;
  };
  description: string;
  url: string;
  width: number;
  height: number;
};

export type Links = {
  entries: {
    inline: Entry<SupportedEntries>[];
    hyperlink: {
      sys: {
        id: string;
      };
    }[];
    block: Entry<SupportedEntries>[];
  };
  assets: {
    hyperlink: {
      description: string;
      url: string;
    };
    block: Asset[];
  };
};

//in order to be narrowable all supported entries must have a __typename type (with its corresponding __TYPENAME enum)
export type SupportedEntries = Author | Post;

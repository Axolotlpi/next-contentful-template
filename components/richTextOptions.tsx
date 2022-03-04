import { BLOCKS, INLINES, MARKS, Node } from '@contentful/rich-text-types';
import { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  RichText,
  Asset,
  __TYPENAMES,
  SupportedEntries,
  Entry,
  Author,
  Post,
} from '../utils/queries';

import { makeEntryMap } from '../utils/helpers';

const Code = ({ children }: { children: ReactNode }) => <code>{children}</code>;

const Text = ({ children }: { children: ReactNode }) => <p>{children}</p>;

const Quote = ({ children }: { children: ReactNode }) => (
  <blockquote>{children}</blockquote>
);

const Hr = () => <hr />;

const OlList = ({ children }: { children: ReactNode }) => <div>{children}</div>;

const UlList = ({ children }: { children: ReactNode }) => <div>{children}</div>;

const ImageAsset = function ({ image }: { image: Asset }) {
  return (
    <div className="flex justify-center">
      <div className="relative p-4 md:p-10 max-w-max">
        <Image
          className="rounded"
          src={image.url}
          alt={image.description}
          width={image.width}
          height={image.height}
        />
      </div>
    </div>
  );
};

const HyperLink = function ({
  link,
  children,
}: {
  link: string;
  children: ReactNode;
}) {
  return (
    <Link href={link}>
      <a>
        <span className="border-b-2 border-accent-2 hover:bg-accent-2 transition-colors ease-out">
          {children}
        </span>
      </a>
    </Link>
  );
};

const InlineAuthor = function ({ author }: { author: Entry<Author> }) {
  return (
    <>
      {author.pageUrl != undefined && (
        <Link href={author.pageUrl}>
          <a>
            <span className="border-b-2 border-accent-2 hover:bg-accent-2 transition-colors ease-out">
              {author.name}
            </span>
          </a>
        </Link>
      )}
      {author.pageUrl == undefined && <p className="inline">{author.name}</p>}
    </>
  );
};

const BlockAuthor = function ({ author }: { author: Entry<Author> }) {
  return (
    <h2 className="h3 leading-snug font-bold text-primary-0 truncate mb-1 sm:mb-0">
      {author.name}
    </h2>
  );
};

const InlineBlogPost = function ({ blogPost }: { blogPost: Entry<Post> }) {
  return (
    <HyperLink link={`/posts/${blogPost.postPageSettings.slug}`}>
      {blogPost.mainTitle}
    </HyperLink>
  );
};

const BlockBlogPost = function ({ blogPost }: { blogPost: Entry<Post> }) {
  return (
    <h2 className="cursor-pointer h3 leading-snug font-bold text-primary-0 mb-1 sm:mb-0 hover:text-accent-2 transition-colors ease-out">
      {blogPost.mainTitle}
    </h2>
  );
};

export const options = (body: RichText) => {
  const assetMap = makeEntryMap<Asset>(body.links.assets.block);
  const inlineEntryMap = makeEntryMap<SupportedEntries>(
    body.links.entries.inline
  );
  const blockEntryMap = makeEntryMap<SupportedEntries>(
    body.links.entries.block
  );

  return {
    // renderMark: {
    //   [MARKS.CODE]: (text: string) => <Code>{text}</Code>,
    // },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: Node, children: ReactNode) => (
        <Text>{children}</Text>
      ),
      [BLOCKS.QUOTE]: (node: Node, children: ReactNode) => (
        <Quote>{children}</Quote>
      ),
      [BLOCKS.OL_LIST]: (node: Node, children: ReactNode) => (
        <OlList>{children}</OlList>
      ),
      [BLOCKS.UL_LIST]: (node: Node, children: ReactNode) => (
        <UlList>{children}</UlList>
      ),
      [BLOCKS.QUOTE]: (node: Node, children: ReactNode) => (
        <Quote>{children}</Quote>
      ),
      [BLOCKS.HR]: () => <Hr />,
      [BLOCKS.EMBEDDED_ASSET]: (node: Node, children: ReactNode) => {
        const image = assetMap.get(node.data.target.sys.id);
        if (image == undefined) return;
        return <ImageAsset image={image} />;
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node: Node, children: ReactNode) => {
        const blockEntry = blockEntryMap.get(node.data.target.sys.id);
        if (!blockEntry || blockEntry == undefined) return;

        if (blockEntry.__typename == __TYPENAMES.AUTHOR)
          return <BlockAuthor author={blockEntry} />;

        if (blockEntry.__typename == __TYPENAMES.BLOG_POST)
          return <BlockBlogPost blogPost={blockEntry} />;

        return <p>{JSON.stringify(blockEntry?.__typename)}</p>;
      },
      [INLINES.EMBEDDED_ENTRY]: (node: Node, children: ReactNode) => {
        const inlineEntry = inlineEntryMap.get(node.data.target.sys.id);
        if (!inlineEntry || inlineEntry == undefined) return;

        if (inlineEntry.__typename == __TYPENAMES.AUTHOR)
          return <InlineAuthor author={inlineEntry} />;

        if (inlineEntry.__typename == __TYPENAMES.BLOG_POST)
          return <InlineBlogPost blogPost={inlineEntry} />;
      },
      [INLINES.HYPERLINK]: (node: Node, children: ReactNode) => {
        return <HyperLink link={node.data.uri}>{children}</HyperLink>;
      },
    },
  };
};

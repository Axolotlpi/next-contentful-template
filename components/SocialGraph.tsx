import type { NextPage } from 'next';

export interface Props {
  title: string;
  description: string;
  canonicalURL: string;
  imageUrl?: string;
}

const SocialGraph: NextPage<Props> = ({
  title,
  description,
  canonicalURL,
  imageUrl,
}) => {
  return (
    <>
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalURL} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {imageUrl && <meta property="og:image" content={imageUrl} />}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalURL} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      {imageUrl && <meta property="twitter:image" content={imageUrl} />}
    </>
  );
};

export default SocialGraph;

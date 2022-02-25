import type { NextPage } from 'next';
import Image from 'next/image';

interface Props {
  title: string;
  teaser: string;
  image: {
    src: string;
    description: string;
  };
}

const Banner: NextPage<Props> = ({ title, teaser, image }) => {
  return (
    <>
      <h1>{title}</h1>
      <p>{teaser}</p>
      <div className="relative w-4/5 h-4/5">
        <Image
          src={image.src}
          alt={image.description}
          layout="fill"
          objectFit="cover"
        />
      </div>
    </>
  );
};

export default Banner;

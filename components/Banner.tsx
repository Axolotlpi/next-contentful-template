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
      <div className="relative h-[40vh] sm:h-[50vh] md:h-[50vh] lg:h-[50vh] xl:h-[60vh] w-full">
        <Image
          className="-z-40"
          src={image.src}
          alt={image.description}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="bg-accent-1 flex flex-col md:flex-row justify-center items-end">
        <h1 className="p-4 text-primary-0">{title}</h1>
        <p className="p-4 font-bold bg-accent-2 text-primary-3">{teaser}</p>
      </div>
    </>
  );
};

export default Banner;

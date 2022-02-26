import type { NextPage } from 'next';

interface Props {
  heading?: string;
}

const Header: NextPage<Props> = ({ heading }) => {
  return (
    <>
      <div className="p-2 bg-primary-1">
        <h1 className="font-heading text-primary-3">{heading}</h1>
      </div>
    </>
  );
};

export default Header;

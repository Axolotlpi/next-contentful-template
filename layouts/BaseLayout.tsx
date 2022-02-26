import type { NextPage } from 'next';
import { ReactNode } from 'react';
import Header from '../components/Header';

interface Props {
  heading: string;
  children: ReactNode;
}

const BaseLayout: NextPage<Props> = ({ children, heading }) => {
  return (
    <>
      <header>
        <Header heading={heading} />
      </header>
      <main>{children}</main>
      <footer></footer>
    </>
  );
};

export default BaseLayout;

import type { NextPage } from 'next';
import { ReactNode } from 'react';
import styles from '../styles/Home.module.css';

interface Props {
  children: ReactNode;
}

const BaseLayout: NextPage<Props> = ({ children }) => {
  return (
    <>
      <main>{children}</main>
      <footer></footer>
    </>
  );
};

export default BaseLayout;

import type { NextPage } from 'next';
import BaseLayout from '../layouts/BaseLayout';
import BaseHead from '../layouts/BaseHead';
import { getContent } from '../utils/helpers';
import { LandingPage, queries, SiteSettings } from '../utils/queries';

interface Props {
  siteSettings: SiteSettings;
  landingPage: LandingPage;
}

export async function getStaticProps() {
  //fetches return double wrapped objs, getting inner one eg. siteSettings.siteSettings
  const [{ siteSettings }, { landingPage }] = await Promise.all([
    getContent(queries.siteSettings),
    getContent(queries.landingPage),
  ]);
  return {
    props: { siteSettings, landingPage },
  };
}

const Home: NextPage<Props> = ({ siteSettings, landingPage }) => {
  return (
    <BaseLayout>
      <BaseHead {...siteSettings} />
      <main>
        <h1>{landingPage.mainTitle}</h1>
      </main>

      <footer></footer>
    </BaseLayout>
  );
};

export default Home;

import type { NextPage } from 'next';
import BaseLayout from '../layouts/BaseLayout';
import BaseHead from '../layouts/BaseHead';
import BlogPost from '../components/BlogPost';
import Banner from '../components/Banner';
import { getContent } from '../utils/helpers';
import { queries } from '../utils/queries';
import type { SiteSettings } from '../utils/queries';

interface Props {
  siteSettings: SiteSettings;
}

export async function getStaticProps() {
  const [siteSettings] = await Promise.all([getContent(queries.siteSettings)]);
  return {
    props: { siteSettings },
  };
}

const Home: NextPage<Props> = ({ siteSettings }) => {
  return (
    <BaseLayout>
      <BaseHead {...siteSettings} />
      <main>
        <h1>{siteSettings.title}</h1>

        <ul>
          <BlogPost title="not many posts here" />
        </ul>
      </main>

      <footer></footer>
    </BaseLayout>
  );
};

export default Home;

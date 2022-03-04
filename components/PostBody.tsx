import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { options } from './richTextOptions';
import { RichText } from '../utils/queries';

const PostBody = ({ body }: { body: RichText }) => {
  return <>{body && documentToReactComponents(body.json, options(body))}</>;
};

export default PostBody;

import { getContent } from './content-manager';

const getLocalContext = ({stageContext, content, storeState={}, stripeKeyPub}) => ({
  assetUrl(assetPath) {
    return [stageContext.assetBase, assetPath].join('');
  },
  resourceUrl(resourcePath) {
    return [stageContext.resourceBase, resourcePath].join('')
  },
  ghostUrl(resourcePath) {
    return [stageContext.ghostBase, resourcePath].join('')
  },
  getContent(namespace, key) {
    console.log(content);
    return getContent(content, namespace, key);
  },
  stageContext,
  content,
  storeState
});

export default getLocalContext;

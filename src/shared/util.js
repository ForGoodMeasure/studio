import async from 'async';
import axios from 'axios';
import PropTypes from 'prop-types';

export const localContextType = {
  localContext: PropTypes.object
};

export const loadImages = (imageUrls, {onProgress, onComplete}) => {
  let progress = 0;
  const resultHandler = cb => () => {
    progress += 1;
    cb(null, true);
    onProgress( progress / imageUrls.length );
  }
  async.each(imageUrls, (url, callback) => {
    axios({
      method: 'get',
      url
    })
      .then(resultHandler(callback))
      .catch(resultHandler(callback));
  }, () => {
    setTimeout(onComplete, 300)
  });
};

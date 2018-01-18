import axios from 'axios';
import async from 'async';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { localContextType } from '../util';

const Style = styled.div`
  pointer-events: none;
  #panels {
    display: ${ p => p.isLoading ? 'none' : 'initial' };
  }
  #background {
    filter: ${ p => p.isLoading ? 'blur(20px)' : '' };
  }
`;

const loadImages = (imageUrls, {onProgress, onComplete}) => {
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
  }, onComplete);
}

class LoadingScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      percentDone: 0
    };
  }

  componentDidMount() {
    const imageUrls = window.__locals__.imageUrls;
    const wrappedImageUrls = imageUrls.map(this.context.localContext.assetUrl);
    loadImages(wrappedImageUrls, {
      onProgress: percentDone => this.setState({ percentDone }),
      onComplete: () => this.setState({ isLoading: false})
    });
  }

  render() {
    return (
      <Style isLoading={ this.state.isLoading }>
        { this.props.children }
      </Style>
    );
  }

};

LoadingScreen.contextTypes = localContextType;

export default LoadingScreen;

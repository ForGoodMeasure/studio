import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import scroll from 'scroll';
import dotty from 'dotty';

import Background from './background';
import { Px } from '../style/parallax';
import SVG from '../style/svg';
import Hideable from '../style/hideable';
import { loadImages, localContextType } from '../util';

const arctan = (x, scale) => {
  if (!x) {
    return 0;
  }
  return Math.atan( (2 * x) / scale - 1 ) * 4 / Math.PI;
}

const Style = styled.div`
  #panels {
    position: relative;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: hidden;
    opacity: ${ p => p.isLoading ? 0 : 1 };
    transition: opacity 4s ease-in-out 2s;
    .tilt-element {
      transform:
        translateX(${ p => p.transformX * -10 }vw)
        rotate3d(0, 1, 0, ${ p => p.transformX * 10 }deg);
    }
  }
  #background {
    filter: ${ p => p.isLoading ? 'blur(20px)' : 'blur(0)' };
  }
  #loading {

  }
  .cursor {
    height: 6em;
    width: 6em;
    position: fixed;
    z-index: 10;
    pointer-events:none;
  }
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;
  }
`;

class Panels extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      projectId: '',
      scrollTop: null,
      transformX: null,
      isLoading: true,
      percentDone: 0
    };
    this.childList = React.Children.toArray(props.children);
  }

  componentDidMount() {
    this.$panels = document.getElementById('panels');

    // Select a random starting panel from the the middle of the set of children
    const numProjects = 4;
    const numChildren = this.childList.length;
    const middleChildLow = numChildren / 2 - numProjects / 2;
    const randomChildIndex = Math.floor(Math.random() * numProjects + middleChildLow);
    const windowHeight = window.innerHeight;

    console.log(randomChildIndex);

    this.startingScrollTop = windowHeight * randomChildIndex;

    // Preload images
    const imageUrls = window.__locals__.imageUrls;
    const wrappedImageUrls = imageUrls.map(this.context.localContext.assetUrl);
    loadImages(wrappedImageUrls, {
      onProgress: percentDone => this.setState({ percentDone }),
      onComplete: () => this.setState({ isLoading: false})
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.isLoading) {
      return;
    }
    const scrollTop = this.getScrollTop();
    const transformX = this.getTransformX();
    const projectId = this.getProjectId();

    this.setState({
      scrollTop,
      transformX,
      projectId
    });
  }

  componentDidUpdate() {
    if (this.state.isLoading) {
      return;
    }
    this.$panels = this.$panels || document.getElementById('panels');
    this.$panels.scrollTop = this.state.scrollTop;
  }

  getScrollTop() {
    const docHeight = this.$panels.scrollHeight;
    const windowHeight = window.innerHeight;
    const baseRate = arctan(this.props.cursorY, windowHeight);
    const scrollRate =  35 * baseRate;

    // Edge cases for top, bottom, and starting position
    if (this.state.scrollTop > docHeight - windowHeight ) {
      return docHeight - windowHeight;
    } else if ( this.state.scrollTop < 0 ) {
      return 1;
    } else if ( !this.state.scrollTop ) {
      return this.startingScrollTop;
    }
    return this.state.scrollTop + scrollRate;
  }

  getTransformX() {
    const windowWidth = window.innerWidth;
    const baseTrans = arctan(this.props.cursorX, windowWidth);
    return baseTrans;
  }

  getProjectId() {
    const scrollTop = this.$panels.scrollTop;
    const docHeight = this.$panels.scrollHeight;
    const currentIndex = Math.floor(scrollTop / docHeight * (this.childList.length) + 0.5);
    return dotty.get(this.childList, `${ currentIndex }.props.projectId`);
  }

  getBgColor = () => {
    return ({
      rad: '#7F8893',
      sex: '#F9C9B6',
      hab: '#B7B2AC',
      sherpa: '#350700'
    })[this.state.projectId] || '#FFFFFF';
  }

  getTextColor = () => {
    return ({
      rad: '#313435',
      sex: '#000000',
      hab: '#F5F3F4',
      sherpa: '#C0BBB9'
    })[this.state.projectId] || '#000000';
  }

  render() {
    return (
      <Style transformX={ this.state.transformX } isLoading={ this.state.isLoading }>
         { this.props.cursorX &&
            <div
              className="cursor"
              style={{
                top: this.props.cursorY,
                left: this.props.cursorX,
                transform: this.state.scrollRate > 0 ? 'rotate(180deg)' : '',
                width: '5em',
                height: '5em'
              }}
            >
              <SVG path="back-forward-cursor.svg" />
            </div>
          }
          <Background
            id="background"
            bgColor={ this.getBgColor() }
            textColor={ this.getTextColor() }
          />
          {
            !this.state.isLoading &&
            <Px id="panels">
              {
                this.childList
              }
            </Px>
          }
      </Style>
    );
  }
};

Panels.contextTypes = localContextType;

export default Panels;

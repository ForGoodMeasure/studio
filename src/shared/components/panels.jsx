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

const arctan = (x, scale) => Math.atan( (2 * x) / scale - 1 ) * 4 / Math.PI;

const Style = styled.div`
  #panels {
    position: relative;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: hidden;
    .tilt-element {
      transform: translateX(${ p => p.transformX * -10 }vw);
    }
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
      index: 0,
      scrollTop: 0,
      transformX: 0
    };
    this.childList = React.Children.toArray(props.children);
  }

  componentDidMount() {
    this.$panels = document.getElementById('panels');

    const startingPanels = this.childList.filter( child => child.props.isStartingPanel );
    const randomPanel = startingPanels[ Math.floor( Math.random() * startingPanels.length )];
    const randomId = `starting-${ randomPanel.props.projectId }`;
    this.startingScrollTop = document.getElementById(randomId).offsetTop;
  }

  componentWillReceiveProps(nextProps) {
    const scrollTop = this.state.scrollTop
      ? this.state.scrollTop + this.getScrollRate()
      : this.startingScrollTop;
    const transformX = this.getTransformX();
    this.setState({ scrollTop, transformX });
  }

  componentDidUpdate() {
    this.$panels.scrollTop = this.state.scrollTop;
  }

  getScrollRate() {
    const windowHeight = window.innerHeight;
    const baseRate = arctan(this.props.cursorY, windowHeight);
    return 35 * baseRate;
  }

  getTransformX() {
    const windowWidth = window.innerWidth;
    const baseTrans = arctan(this.props.cursorX, windowWidth);
    return baseTrans;
  }

  getBgColor = () => {
    return 'white';
  }

  getTextColor = () => {
    return 'red';
  }

  render() {
    return (
      <Style transformX={ this.state.transformX }>
        <Hideable hideInitially visible>
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
          <Background
            bgColor={ this.getBgColor() }
            textColor={ this.getTextColor() }
          />
            <Px id="panels">
              {
                this.childList
              }
            </Px>
        </Hideable>
      </Style>
    );
  }
};

export default Panels;

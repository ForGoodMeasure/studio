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

const FGM_GRAY = "#383838";
const RAD_BLUE = "#38404b";
const HAB_GREEN = "#043e2f";
const SHERP_GRAY = '#333334';

const Style = styled.div`
  #panels {
    position: relative;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .cursor {
    height: 6em;
    width: 6em;
    position: fixed;
    z-index: 10;
    pointer-events:none;
    transition: 500ms transform;
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
    this.maxIndex = props.children.length - 1;
    this.state = {
      index: 0,
      cursorX: null,
      cursorY: null,
      scrollRate: 0
    };
    this.childList = React.Children.toArray(props.children);
  }

  componentDidMount() {
    this.$panels = document.getElementById('panels');

    const startingPanels = this.childList.filter( child => child.props.starting );
    const randomPanel = startingPanels[ Math.floor( Math.random() * startingPanels.length )];
    const randomId = `starting-${ randomPanel.props.projectId }`;
    this.$panels.scrollTop = document.getElementById(randomId).offsetTop;

    this.autoScrollInterval = window.setInterval(() => {
      const height = 45 * this.state.scrollRate + this.$panels.scrollTop;
      scroll.top(this.$panels, height, { duration: 50 });
    }, 10);
  }

  componentWillUnmount() {
    this.autoScrollInterval && window.clearInterval(this.autoScrollInterval);
  }

  onScroll = () => {
    const scrollTop = this.$panels.scrollTop + 600;
    const docHeight = this.$panels.scrollHeight;
    const currentIndex = Math.floor(scrollTop / docHeight * (this.maxIndex + 1));
    this.setState({
      index: currentIndex
    })
  }

  onClick = () => {
    const mousePosition = this.state.cursorY / window.innerHeight;

    if (mousePosition < 0.2) {
      this.increment();
    } else if ( mousePosition < 0.8 ) {

    } else {
      this.decrement();
    }
  }

  onMouseMove = e => {
    const windowHeight = window.innerHeight;
    const scrollRate = Math.atan( (2 * e.pageY) / windowHeight - 1 ) * 4 / Math.PI;
    this.setState({
      cursorX: e.pageX,
      cursorY: e.pageY,
      scrollRate
    });
  }

  getBgColor = () => {
    return 'white';
  }

  getTextColor = () => {
    return 'red';
  }

  getCursor = () => {
    if (typeof window === 'undefined' || !this.state.cursorX ) {
      return;
    }
    return (
      <div
        className="cursor"
        style={{
          top: this.state.cursorY,
          left: this.state.cursorX,
          transform: this.state.scrollRate > 0 ? 'rotate(180deg)' : '',
          width: '5em',
          height: '5em'
        }}
      >
        <SVG path="back-forward-cursor.svg" />
      </div>
    );
  }

  render() {
    return (
      <Style
        onMouseMove={ this.onMouseMove }
        onScroll={ this.onScroll }
      >
        <Hideable hideInitially visible>
          { this.getCursor() }
          <Background
            bgColor={ this.getBgColor() }
            textColor={ this.getTextColor() }
          />
            <Px
              maxIndex={ this.maxIndex }
              id="panels"
            >
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

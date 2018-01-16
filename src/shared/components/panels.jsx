import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import scroll from 'scroll';
import dotty from 'dotty';

import Background from './background';
import { Px } from '../style/parallax';
import SVG from '../style/svg';

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
    this.autoScrollInterval = window.setInterval(() => {
      const height = this.state.scrollRate + this.$panels.scrollTop;
      scroll.top(this.$panels, height, { duration: 15 });
    }, 10);
  }

  componentWillUnmount() {
    this.autoScrollInterval && window.clearInterval(this.autoScrollInterval);
  }

  modifyIndex(value, operator) {
    let newValue = value + operator;
    if (operator > 0 && newValue > this.maxIndex) {
      newValue = this.maxIndex;
    } else if (operator < 0 && newValue < 0) {
      newValue = 0;
    }
    return newValue;
  }

  modifyState = (operator, cb) => {
    this.setState({
      index: this.modifyIndex(this.state.index, operator)
    }, cb);
  }

  decrement = () => {
    this.modifyState(1, this.scroll);
  }

  increment = () => {
    this.modifyState(-1, this.scroll);
  }

  scroll = () => {
    const docHeight = this.$panels.scrollHeight;
    const panelHeight = docHeight / (this.maxIndex + 1);
    const height = this.state.index * panelHeight;
    scroll.top(this.$panels, height, { duration: 500 });
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
    // const scrollRate = Math.pow( ( e.pageY - windowHeight / 2 ) / 38, 3 ) / 100;
    const scrollRate = Math.atan( ( 2 * e.pageY / windowHeight -1 ) * Math.PI ) * 30;
    this.setState({
      cursorX: e.pageX,
      cursorY: e.pageY,
      scrollRate
    });
  }

  getBgColor = () => {
    return ([
      FGM_GRAY,
      RAD_BLUE,
      HAB_GREEN,
      SHERP_GRAY,
      'black',
      'black'
    ])[this.state.index]
  }

  getTextColor = () => {
    return ([
      'white',
      'white',
      'white',
      'white',
      'white',
      FGM_GRAY
    ])[this.state.index]
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
          transform: this.state.scrollRate > 0 ? '' : 'rotate(180deg)',
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
      </Style>
    );
  }
};

export default Panels;

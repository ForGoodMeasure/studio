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
    cursor: none;
  }
  .cursor {
    transition:
      top 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275),
      height 200ms ease-in,
      width 200ms ease-in,
      opacity 600ms ease-in;
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
    this.maxIndex = props.children.length - 1;
    this.state = {
      index: 0,
      cursorX: null,
      cursorY: null
    };
    this.childList = React.Children.toArray(props.children);
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
    const docHeight = document.getElementById('panels').scrollHeight;
    const panelHeight = docHeight / (this.maxIndex + 1);
    const height = this.state.index * panelHeight;
    scroll.top(document.getElementById('panels'), height, { duration: 500 });
  }

  onScroll = () => {
    const scrollTop = document.getElementById('panels').scrollTop + 600;
    const docHeight = document.getElementById('panels').scrollHeight;
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
    const scrollTop = document.getElementById('panels').scrollTop;
    let isScrolling = false;
    if (Math.abs(this.state.cursorY - e.clientY) > 600) {
      isScrolling = true;
    }
    this.setState({
      cursorX: e.pageX,
      cursorY: e.pageY,
      isScrolling
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

    let path = '';
    let cursorSize = '6em';
    const mousePosition = this.state.cursorY / window.innerHeight;
    const selectedChild = this.childList[ this.state.index ];

    if (mousePosition < 0.1) {
      path = dotty.get(selectedChild, 'props.topCursor') || "prev-proj-cursor.svg";
    } else if ( mousePosition < 0.8 ) {
      path = dotty.get(selectedChild, 'props.cursor');
      cursorSize = dotty.get(selectedChild, 'props.cursorSize');
    } else {
      path = dotty.get(selectedChild, 'props.bottomCursor') || "next-proj-cursor.svg";
    }

    return (
      <div
        className="cursor"
        style={{
          top: this.state.cursorY,
          left: this.state.cursorX,
          width: cursorSize,
          height: cursorSize
        }}
      >
        <SVG path={ path } />
      </div>
    );
  }

  render() {
    return (
      <Style
        onMouseMove={ this.onMouseMove }
        onScroll={ this.onScroll }
        onClick={ this.onClick }
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

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import scroll from 'scroll';

import Background from './background';
import { Px } from '../style/parallax';

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
      opacity 600ms ease-in;
    height: 6em;
    width: 6em;
    position: fixed;
    z-index: 10;
    background: url('${ p => p.cursorUrl }');
    background-size: cover;
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
      newValue = 0;
    } else if (operator < 0 && newValue < 0) {
      newValue = this.maxIndex
    }
    return newValue;
  }

  modifyState = operator => {
    this.setState({
      index: this.modifyIndex(this.state.index, operator)
    });
  }

  decrement = () => {
    this.modifyState(1);
    this.scroll();
  }

  increment = () => {
    this.modifyState(-1);
    this.scroll();
  }

  scrollToNextProject = () => {
    const docHeight = document.getElementById('panels').scrollHeight;
    const panelHeight = docHeight / (this.maxIndex + 1);
    const height = this.modifyIndex(this.state.index, 1) * panelHeight;
    scroll.top(document.getElementById('panels'), height, { duration: 500 });
  }

  getCurrentIndex() {
    const scrollTop = document.getElementById('panels').scrollTop + 600;
    const docHeight = document.getElementById('panels').scrollHeight;
    const currentIndex = Math.floor(scrollTop / docHeight * (this.maxIndex + 1));
    return currentIndex;
  }

  onScroll = () => {
    this.setState({
      index: this.getCurrentIndex()
    })
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

  render() {
    const childList = this.childList;
    const index = this.state.index;
    const prevIndex = this.modifyIndex(index, -1);
    const nextIndex = this.modifyIndex(index, 1);

    return (
      <Style
        onMouseMove={ this.onMouseMove }
        onScroll={ this.onScroll }
        cursorUrl={ this.props.cursorUrl }
      >
        { this.state.cursorX && <div className="cursor" style={{
          top: this.state.cursorY,
          left: this.state.cursorX
        }}/> }
        <Background
          bgColor={ this.getBgColor() }
          textColor={ this.getTextColor() }
        />
        <Px
          maxIndex={ this.maxIndex }
          onClick={ this.scrollToNextProject }
          id="panels"
        >
          {
            childList
          }
        </Px>
      </Style>
    );
  }
};

export default Panels;

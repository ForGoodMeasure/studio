import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import scroll from 'scroll';

import Controls from './controls';
import { Px } from '../style/parallax';

const Style = Px.extend`
  position: relative;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
  cursor: none;
  .cursor {
    transition:
      top 600ms cubic-bezier(0.175, 0.885, 0.32, 1.275),
      opacity 600ms ease-in;
    height: 6em;
    width: 6em;
    position: fixed;
    z-index: 10;
    background: url('${ p => p.cursorUrl }');
    background-size: cover;
    pointer-events:none;
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

  scroll = () => {
    const docHeight = document.body.scrollHeight;
    const height = this.state.index * docHeight;
    scroll.top(document.getElementById('panels'), height, { duration: 1000 });
  }

  onMouseMove = e => {
    const scrollTop = document.getElementById('panels').scrollTop;
    let isScrolling = false;
    if (Math.abs(this.state.cursorY - e.clientY) > 600) {
      isScrolling = true;
    }
    this.setState({
      cursorX: e.clientX,
      cursorY: scrollTop + e.clientY,
      isScrolling
    });
  }

  render() {
    const childList = React.Children.toArray(this.props.children);
    const index = this.state.index;
    const prevIndex = this.modifyIndex(index, -1);
    const nextIndex = this.modifyIndex(index, 1);

    return (
      <Style
        offset={ this.state.index }
        maxIndex={ this.maxIndex }
        onClick={ this.decrement }
        onMouseMove={ this.onMouseMove }
        cursorUrl={ this.props.cursorUrl }
        id="panels"
        ref="panels"
      >
        { this.state.cursorX && <div className="cursor" style={{
          top: this.state.cursorY,
          left: this.state.cursorX
        }}/> }
        {
          childList
        }
      </Style>
    );
  }
};

export default Panels;

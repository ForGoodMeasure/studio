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
  overflow: hidden;
`;

class Panels extends React.Component {

  constructor(props) {
    super(props);
    this.maxIndex = props.children.length - 1;
    this.state = {
      index: 0
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
    scroll.top(document.getElementById('panels'), height);
  }

  render() {
    const index = this.state.index;
    const prevIndex = this.modifyIndex(index, -1);
    const nextIndex = this.modifyIndex(index, 1);

    return (
      <Style
        offset={ this.state.index }
        maxIndex={ this.maxIndex }
        onClick={ this.decrement }
        id="panels"
      >
        { this.props.children }
      </Style>
    );
  }
};

export default Panels;

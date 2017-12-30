import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Controls from './controls';

const Style = styled.div`
  position: relative;
  left: -100vw;
  width: ${ p => p.maxIndex * 100}vw;
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
  }

  increment = () => {
    this.modifyState(-1);
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
      >
        <Controls
          onLeftClick={ this.decrement }
          onRightClick={ this.increment }
        >
          { childList[ prevIndex ] }
          { childList[ index ] }
          { childList[ nextIndex ] }
        </Controls>
      </Style>
    );
  }
};

export default Panels;

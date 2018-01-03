import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Style = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background: red;
  z-index: -13;
  overflow: hidden;
  .cursor {
    height: 6em;
    width: 6em;
    position: fixed;
    z-index: 10;
    background: url('${ p => p.cursorUrl }');
    background-size: cover;
  }
`

class Window extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      cursorX: null,
      cursorY: null
    }
  }

  onMouseMove = e => {
    this.setState({
      cursorX: e.pageX,
      cursorY: e.pageY
    });
  }

  render() {
    return (
      <Style
        onMouseMove={ this.onMouseMove }
        cursorUrl={ this.props.cursorUrl }
      >
        { this.state.cursorX && <div className="cursor" style={{
          top: this.state.cursorY,
          left: this.state.cursorX
        }}/> }
        { this.props.children }
      </Style>
    );
  }
};

export default Window;

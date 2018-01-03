import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Style = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: -10;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1.6em;
  .cursor {
    height: 6em;
    width: 6em;
    position: fixed;
    z-index: 10;
    background: url('${ p => p.cursorUrl }');
    background-size: cover;
  }
  p {
    box-sizing: border-box;
    padding: 0 8em;
  }
  h1 {
    margin-bottom: 0.5em;
  }
`


class Background extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cursorX: null,
      cursorY: null
    };
  }

  onMouseMove = e => {
    console.log('YO');
    this.setState({
      cursorX: e.clientX,
      cursorY: e.clientY
    });
  }

  render() {
    return (
      <Style
        cursorUrl={ this.props.cursorUrl }
      >
        { this.state.cursorX && <div className="cursor" style={{
          top: this.state.cursorY,
          left: this.state.cursorX
        }}/> }
        <h1>FOR GOOD MEASURE</h1>
        <p>
          is a creative studio in Brooklyn, New York building brands and fresh websites.
          <br/>
          <br/>
          Contact:
          <br/>
          hello@forgoodmeasure.us
        </p>
      </Style>
    );
  }

}

export default Background;

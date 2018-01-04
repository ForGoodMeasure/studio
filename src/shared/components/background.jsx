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
  background: ${ p => p.bgColor };
  color: ${ p => p.textColor };
  -webkit-text-stroke-color: ${ p => p.textColor };
  transition: background 1s, color 1s, -webkit-text-stroke-color 1s;
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

  render() {
    return (
      <Style
        cursorUrl={ this.props.cursorUrl }
        onMouseMove={ this.onMouseMove }
        textColor={ this.props.textColor }
        bgColor={ this.props.bgColor}
      >
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

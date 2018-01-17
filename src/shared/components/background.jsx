import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SVG from '../style/svg';

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
  transition: 1s background, 1s color;
  .type {
    width: 100%;
    text-align: center;
  }
  #hello {
    font-size: 300pt;
    font-weight: 500;
    letter-spacing: -20pt;
    margin-bottom: -.15em;
    margin-top: -.35em;
  }
  #statement {
    width: 85%;
    font-size: 40pt;
    font-weight: 500;
    margin: 0 auto;
    line-height: 40pt;
    margin-bottom: 20px;
    letter-spacing: -.1vw;
  }
  #contact {
    margin: 0 auto;
    height: 4em;
    margin-top: 1.5em;
    > div, svg {
      height: 100%;
      fill: ${ p => p.textColor };
      transition: 1s fill;
      g {
        fill: ${ p => p.textColor };
        transition: 1s fill;
      }
    }
  }
  @media (max-width: 1000px) {
    #hello {
      font-size: 200pt;
      font-weight: 500;
      margin-bottom: -.1em;
      margin-top: -.4em;
      letter-spacing: -15pt;
    }
    #statement {
      font-size: 30pt;
      line-height: 30pt;
    }
    #contact {
      margin-top: 1em;
    }
  }
  @media (max-width: 600px) {
    #hello {
      font-size: 40vw;
      margin-bottom: -50px;
      margin-top: -.5em;
      letter-spacing: -3vw;
    }
    #statement {
      font-size: 24pt;
      line-height: 24pt;
      margin-top: 50px;
    }

    #contact {
      font-size: 12pt;
      line-height: 18pt;
      letter-spacing: 0vw;
      margin-top: 2em;
    }
  }
  @media (min-width: 1400px) {
     #hello {
      font-size: 360pt;
      margin-bottom: -50px;
      margin-top: -.3em;
      letter-spacing: -30pt;
    }
    #statement {
      font-size: 50pt;
      line-height: 50pt;
      width: 80%;
    }
    #contact {
      height: 3em;
    }
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


      <div className="type">
        <div id="hello">
          Hello
        </div>
        <div id="statement">
          For Good Measure is a creative studio building brands
          &amp; websites for clients and nice people.
        </div>
        <div id="contact">
          <SVG path="maxcont.svg" />
        </div>
      </div>

      </Style>
    );
  }

}

export default Background;

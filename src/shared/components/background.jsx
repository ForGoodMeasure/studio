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
  transition: background 1s, color 1s, filter 1s, transform 1s;
  .type {
    width: 100%;
    text-align: center;
    font-weight: 500;
  }
  #hello {
    font-size: 300pt;
    letter-spacing: -20pt;
    margin-bottom: -.15em;
    margin-top: -.35em;
  }
  #statement {
    width: 85%;
    font-size: 40pt;
    margin: 0 auto;
    line-height: 40pt;
    margin-bottom: 20px;
    letter-spacing: -.1vw;
  }
  #contact {
    margin: 0 auto;
    height: 4em;
    margin-top: 1.5em;
    font-size: 24pt;
    letter-spacing: 0vw;
    ul {
      list-style: none;
      padding: 0;
    }
  }
  @media (max-width: 1000px) {
    #hello {
      font-size: 200pt;
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
      font-size: 16pt;
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
        id={ this.props.id }
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
            <ul>
              <li><u>Contact</u></li>
              <li>hello@forgoodmeasure.us</li>
              <li>917.882.0686</li>
            </ul>
          </div>
        </div>
      </Style>
    );
  }

}

export default Background;

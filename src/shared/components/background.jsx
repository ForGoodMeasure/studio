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
  -webkit-text-stroke-color: ${ p => p.textColor };
  transition: background 1s, co
  color: ${ p => p.textColor };lor 1s, -webkit-text-stroke-color 1s;
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

.type {
  width: 100%;
  text-align: center;
}

    #hello {
      font-size: 42vw;
      font-weight: bold;
      letter-spacing: -1.5vw;
      margin-bottom: -6%;
      margin-top: -3%;
    }

    #statement {
      width: 85%;
      font-size: 5vw;
      margin: 0 auto;
      line-height: 5vw;
      margin-bottom: 3%;
    }

    #contact {
      margin: 0 auto;
      font-size: 1.5vw;
      line-height: 2.1vw;
      letter-spacing: .1vw;
      margin-top: -1%;
    }

    ul{
      list-style: none;
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
          <ul>
            <li><u>New Business</u></li>
            <li>hello[at]forgoodmeasure.us</li>
            <li>917.882.0686</li>
          </ul>
        </div>
      </div>



      </Style>
    );
  }

}

export default Background;

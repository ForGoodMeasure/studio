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
  pointer-events: none;
  p {
    box-sizing: border-box;
    padding: 0 8em;
  }
  h1 {
    margin-bottom: 0.5em;
  }
`

export default props => (
  <Style>
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

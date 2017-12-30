import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Style = styled.div`
  height: 100vh;
  width: 100vw;
  background: ${ p => p.color };
  display: inline-block;
  background-image: url(${ p=> p.img });
  background-size: cover;
  background-position-x: center;
  background-position-y: center;
`;

export default props => (
  <Style { ...props } >

  </Style>
);

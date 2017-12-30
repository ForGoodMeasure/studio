import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Style = styled.div`
  .side {
    position: fixed;
    width: 50vw;
    height: 100vh;
    top: 0;
    cursor: w-resize;
    z-index: 100;
    &.right-side {
      right: 0;
      cursor: e-resize;
    }
    &.left-side {
      left: 0;
    }
  }
`;

export default props => (
  <Style>
    <div className="side left-side" onClick={ props.onLeftClick } />
    <div className="side right-side" onClick={ props.onRightClick } />
    <div className="container">
      { props.children }
    </div>
  </Style>
);

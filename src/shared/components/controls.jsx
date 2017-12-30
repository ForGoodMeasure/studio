import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Style = styled.div`
  .side {
    position: absolute;
    width: 50%;
    height: 100%;
    top: 0;
    cursor: w-resize;
    z-index: 100;
    &.right-side {
      right: 0;
      cursor: e-resize;
    }
  }
`;

export default props => (
  <Style>
    <div className="side left-side" onClick={ props.onLeftClick } />
    <div className="side right-side" onClick={ props.onRightClick } />
    { props.children }
  </Style>
);

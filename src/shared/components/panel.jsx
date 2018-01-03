import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Tilt from 'react-tilt';

import { PxSection, PxLayer } from '../style/parallax';

const Style = PxSection.extend`
  height: 100vh;
  width: 100vw;
  background: ${ p => p.color };
  display: block;
  .tilt-element {
    transform-style: preserve-3d;
  }
`;

const Block = styled.div`
  background: ${ p => p.color };
  height: ${ p => p.size };
  width: ${ p => p.size };
  position: relative;
  left: ${ p => p.left };
  top: ${ p => p.top };
`;

export default props => {
  if (props.empty) {
    return <Style />
  }
  return (
    <Style { ...props } >
      <Tilt
        className="tilt-element"
        options={{ max : 10, scale: 1, perspective: 10000, axis: 'Y' }}
        style={{ height: '100%', width: '100%' }}
      >
        <PxLayer depth={ -2 } >
          <Block color="red" left="20%" top="45%" size="20%"/>
        </PxLayer>
        <PxLayer depth={ 0 }>
          <Block color="blue" left="30%" top="30%" size="50%"/>
        </PxLayer>
        <PxLayer depth={ 2 }>
          <Block color="orange" left="25%" top="20%" size="30%"/>
        </PxLayer>
      </Tilt>
    </Style>
  )
};

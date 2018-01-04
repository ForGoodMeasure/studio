import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Tilt from 'react-tilt';

import { localContextType } from '../util';
import { PxSection, PxLayer } from '../style/parallax';

const Style = PxSection.extend`
  height: 100vh;
  width: 100vw;
  background: ${ p => p.color };
  display: block;
  margin-bottom: 30%;
  .tilt-element {
    transform-style: preserve-3d;
  }
`;

const Block = styled.img`
  width: ${ p => p.width };
  position: relative;
  left: ${ p => p.left };
  top: ${ p => p.top };
`;

const Panel = (props, { localContext }) => {
  if (props.empty) {
    return <Style />
  }
  return (
    <Style { ...props } className="panel">
      <Tilt
        className="tilt-element"
        options={{ max : 5, scale: 1, perspective: 100000, axis: 'Y' }}
        style={{ height: '100%', width: '100%' }}
      >
        {
          props.images.map( (img, i) => (
            <PxLayer depth={ 6 * Math.floor( i - props.images.length / 2) } key={ i } >
              <Block
                src={ localContext.assetUrl(`images${ img.url }`) }
                width={ img.width }
                left={ img.left }
                top={ img.top }
              />
            </PxLayer>
          ))
        }
      </Tilt>
    </Style>
  )
};

Panel.contextTypes = localContextType;

export default Panel;

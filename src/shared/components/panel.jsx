import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import Tilt from 'react-tilt';

import { localContextType } from '../util';
import { PxSection, PxLayer } from '../style/parallax';

const Tilt = styled.div`
  height: 100%;
  width: 100%;
`;
const Style = PxSection.extend`
  height: 100vh;
  width: 100vw;
  background: ${ p => p.color };
  display: block;
  margin-bottom: 30vh;
  .tilt-element {
    transform-style: preserve-3d;
  }
`;

const Block = styled.img`
  width: ${ p => p.width }vw;
  position: relative;
  left: ${ p => p.left }vw;
  top: ${ p => p.top }vw;
`;

const Panel = (props, { localContext }) => {
  if (props.empty) {
    return <Style />
  }
  const images = localContext.getContent('panels', props.projectId);
  return (
    <Style { ...props } className="panel" id={ props.isStartingPanel ? `starting-${ props.projectId }` : '' }>
      <Tilt
        className="tilt-element"
        style={{ height: '100%', width: '100%' }}
      >
        {
          images.map( (img, i) => (
            <PxLayer depth={ 6 * Math.floor( i - images.length / 2) } key={ i } >
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

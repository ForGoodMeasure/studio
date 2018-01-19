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
  height: 100vmin;
  width: 100vw;
  background: ${ p => p.color };
  display: block;
  margin-bottom: 10vmin;
  .tilt-element {
    transform-style: preserve-3d;
    height: 100%;
    width: 100%;
  }
`;

const BlockStyle = styled.div`
  img {
    width: ${ p => p.width }vw;
    position: relative;
    left: ${ p => p.left }vw;
    top: ${ p => p.top }vw;
    box-shadow: ${ p => {
      if (p.noShadow) return;
      const d = p.depth * 10 + 30;
      return `${ d }px ${ d }px ${ d/2 + 20 }px #0000002e`
    }};
  }
`;

const Block = props => (
  <BlockStyle {...props}>
    <PxLayer depth={ props.depth }>
      <img
        src={ props.src }
        width={ props.width }
        left={ props.left }
        top={ props.top }
      />
    </PxLayer>
  </BlockStyle>
);

const Panel = (props, { localContext }) => {
  if (props.empty) {
    return <Style />
  }
  const images = localContext.getContent('panels', props.projectId);
  return (
    <Style { ...props } className="panel" id={ props.isStartingPanel ? `starting-${ props.projectId }` : '' }>
      <Tilt
        className="tilt-element"
        style={{
          transform: `
            translateX(${ props.transformX * -10 }vw)
            rotate3d(0, 1, 0, ${ props.transformX * 10 }deg)
          `
        }}
      >
        {
          images.map( (img, i) => (
            <Block
              src={ localContext.assetUrl(`images${ img.url }`) }
              width={ img.width }
              left={ img.left }
              top={ img.top }
              noShadow={ img.noShadow }
              depth={ 2 * i }
              key={ i }
            />
          ))
        }
      </Tilt>
    </Style>
  )
};

Panel.contextTypes = localContextType;

export default Panel;

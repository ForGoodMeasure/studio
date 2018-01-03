import { Link } from 'found';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Panel from './panel';
import Panels from './panels';
import { localContextType } from '../util';
import { Px } from '../style/parallax';
import Background from './background';

const Style = styled.div`
  .heading {
    position: fixed;
    z-index: 1;
  }
`;
const Window = styled.div`
  width: 100vw;
  overflow: hidden;
`;

class App extends React.Component {

  render() {
    const imgUrl = url => this.context.localContext.assetUrl(`/images/${ url }`);
    return (
      <Style>
        <Background />
        <Window>
          <Panels>
            <Panel />
            <Panel />
            <Panel />
            <Panel empty />
          </Panels>
        </Window>
      </Style>
    );
  }
}

App.contextTypes = localContextType;

export default App;

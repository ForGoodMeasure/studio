import { Link } from 'found';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Panel from './panel';
import Panels from './panels';
import { localContextType } from '../util';

const Style = styled.div`
  .heading {
    position: fixed;
    z-index: 1;
  }
`;
const Window = styled.div`
  width: 100vw;
  height: 100vw;
  overflow: hidden;
`;

class App extends React.Component {

  render() {
    const localContext = this.context.localContext;
    return (
      <Style>
        <h1 className="heading">
          For Good Measure
        </h1>
        <Window
          onClick={ this.onClick }
        >
          <Panels>
            <Panel color="red" />
            <Panel color="yellow" />
            <Panel color="blue" />
            <Panel color="green" />
          </Panels>
        </Window>
      </Style>
    );
  }
}

App.contextTypes = localContextType;

export default App;

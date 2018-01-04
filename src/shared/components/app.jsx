import { Link } from 'found';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Panel from './panel';
import Panels from './panels';
import { localContextType } from '../util';
import { Px } from '../style/parallax';
import Background from './background';
import Window from './window';

const Style = styled.div`
  .heading {
    position: fixed;
    z-index: 1;
  }
`;

class App extends React.Component {
  render() {
    const localContext = this.context.localContext;
    const imgUrl = url => localContext.assetUrl(`/images/${ url }`);
    return (
      <Style>
        <Panels cursorUrl={ imgUrl('view-work-cursor.png') }>
          <Panel empty />
          <Panel images={ localContext.getContent('panels', 'rad') } />
          <Panel images={ localContext.getContent('panels', 'hab') } />
          <Panel images={ localContext.getContent('panels', 'sherpa') } />
          <Panel images={ localContext.getContent('panels', 'sex') } />
          <Panel empty />
        </Panels>
      </Style>
    );
  }
}

App.contextTypes = localContextType;

export default App;

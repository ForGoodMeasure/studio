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

class App extends React.Component {
  render() {
    return (
      <Style>
        <Panels>
          <Panel empty cursor="see-work-cursor.svg" topCursor="hi-cursor.svg" bottomCursor="see-work-cursor.svg"/>
          <Panel projectId="rad" topCursor="back-cursor.svg" cursor="rad-cursor.svg" cursorSize="12em"/>
          <Panel projectId="hab" cursor="hab-cursor.svg" cursorSize="10em" />
          <Panel projectId="sherpa" cursor="sherpa-cursor.svg" cursorSize="10em" />
          <Panel projectId="sex" cursor="sex-cursor.svg" cursorSize="12em" bottomCursor="sex-cursor.svg"/>
          <Panel empty cursor="hi-cursor.svg" bottomCursor="hi-cursor.svg" />
        </Panels>
      </Style>
    );
  }
}

App.contextTypes = localContextType;

export default App;

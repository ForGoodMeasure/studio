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

  constructor(props) {
    super(props);
    this.cursorX = null;
    this.cursorY = null;
    this.state = {
      cursorX: this.cursorX,
      cursorY: this.cursorY
    };
  }

  componentDidMount() {
    this.loop();
  }

  loop() {
    this.setState({
      cursorX: this.cursorX,
      cursorY: this.cursorY
    })
    window.requestAnimationFrame(this.loop.bind(this));
  }

  onMouseMove = e => {
    this.cursorX = e.pageX;
    this.cursorY = e.pageY;
  }

  renderPanel(props) {
    return (
      <Panel { ...props } />
    );
  }

  render() {
    return (
      <Style
        onMouseMove={ this.onMouseMove }
      >
        <Panels cursorX={ this.state.cursorX } cursorY={ this.state.cursorY }>
          <Panel empty {...this.state} />
          <Panel projectId="rad" {...this.state} />
          <Panel projectId="hab" {...this.state} />
          <Panel projectId="sherpa" {...this.state} />
          <Panel projectId="sex" {...this.state} />
          <Panel projectId="rad" {...this.state} />
          <Panel projectId="hab" {...this.state} />
          <Panel projectId="sherpa" {...this.state} />
          <Panel projectId="sex" {...this.state} />
          <Panel projectId="rad" {...this.state} />
          <Panel projectId="hab" {...this.state} />
          <Panel projectId="sherpa" {...this.state} />
          <Panel projectId="sex" {...this.state} />
          <Panel isStartingPanel projectId="rad" {...this.state} />
          <Panel isStartingPanel projectId="hab" {...this.state} />
          <Panel isStartingPanel projectId="sherpa" {...this.state} />
          <Panel isStartingPanel projectId="sex" {...this.state} />
          <Panel projectId="rad" {...this.state} />
          <Panel projectId="hab" {...this.state} />
          <Panel projectId="sherpa" {...this.state} />
          <Panel projectId="sex" {...this.state} />
          <Panel projectId="rad" {...this.state} />
          <Panel projectId="hab" {...this.state} />
          <Panel projectId="sherpa" {...this.state} />
          <Panel projectId="sex" {...this.state} />
          <Panel projectId="rad" {...this.state} />
          <Panel projectId="hab" {...this.state} />
          <Panel projectId="sherpa" {...this.state} />
          <Panel projectId="sex" {...this.state} />
          <Panel empty {...this.state} />
        </Panels>
      </Style>
    );
  }
}

App.contextTypes = localContextType;

export default App;

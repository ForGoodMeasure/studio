import { Link } from 'found';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Panel from './panel';
import Panels from './panels';
import { localContextType } from '../util';
import { Px } from '../style/parallax';
import Background from './background';
import LoadingScreen from './loading-screen';

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
        <Panels
          cursorX={ this.state.cursorX }
          cursorY={ this.state.cursorY }
        >
          <Panel empty />
          <Panel projectId="rad" />
          <Panel projectId="hab" />
          <Panel projectId="sherpa" />
          <Panel projectId="sex" />
          <Panel projectId="rad" />
          <Panel projectId="hab" />
          <Panel projectId="sherpa" />
          <Panel projectId="sex" />
          <Panel projectId="rad" />
          <Panel projectId="hab" />
          <Panel projectId="sherpa" />
          <Panel projectId="sex" />
          <Panel isStartingPanel projectId="rad" />
          <Panel isStartingPanel projectId="hab" />
          <Panel isStartingPanel projectId="sherpa" />
          <Panel isStartingPanel projectId="sex" />
          <Panel projectId="rad" />
          <Panel projectId="hab" />
          <Panel projectId="sherpa" />
          <Panel projectId="sex" />
          <Panel projectId="rad" />
          <Panel projectId="hab" />
          <Panel projectId="sherpa" />
          <Panel projectId="sex" />
          <Panel projectId="rad" />
          <Panel projectId="hab" />
          <Panel projectId="sherpa" />
          <Panel projectId="sex" />
          <Panel empty {...this.state} />
        </Panels>
      </Style>
    );
  }
}

App.contextTypes = localContextType;

export default App;

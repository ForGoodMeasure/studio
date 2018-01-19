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
    window.addEventListener('deviceorientation', this.handleOrientation.bind(this) );
  }

  handleOrientation({ beta, gamma }) {
    const pageWidth = window.innerWidth;
    const pageHeight = window.innerHeight;
    let x = gamma;   // [-180, 180]
    let y = beta;  // [-90, 90]

    // Because we don't want to have the device upside down
    // We constrain the x value to the range [-90,90]
    if (x >  90) { x =  90 };
    if (x < -90) { x = -90 };

    // Shift the range to [0,1]
    x = (x + 90) / 180;
    y = (y + 90) / 180;

    this.cursorX = pageWidth * x;
    this.cursorY = pageHeight * ( 1 - y );
  }

  loop() {
    this.setState({
      cursorX: this.cursorX,
      cursorY: this.cursorY,
      showCursor: false
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
          startingProjectId={ this.props.data.projectId }
          showCursor={ this.state.showCursor }
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

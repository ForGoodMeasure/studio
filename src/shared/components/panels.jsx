import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import scroll from 'scroll';
import dotty from 'dotty';

import Background from './background';
import { Px } from '../style/parallax';
import SVG from '../style/svg';
import Hideable from '../style/hideable';

const FGM_GRAY = "#383838";
const RAD_BLUE = "#38404b";
const HAB_GREEN = "#043e2f";
const SHERP_GRAY = '#333334';

const Style = styled.div`
  #panels {
    position: relative;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: hidden;
  }
  .cursor {
    height: 6em;
    width: 6em;
    position: fixed;
    z-index: 10;
    pointer-events:none;
    transition: 500ms transform;
  }
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;
  }
`;

class Panels extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      scrollTop: 0
    };
    this.childList = React.Children.toArray(props.children);
  }

  componentDidMount() {
    this.$panels = document.getElementById('panels');

    const startingPanels = this.childList.filter( child => child.props.isStartingPanel );
    const randomPanel = startingPanels[ Math.floor( Math.random() * startingPanels.length )];
    const randomId = `starting-${ randomPanel.props.projectId }`;
    this.startingScrollTop = document.getElementById(randomId).offsetTop;
  }

  componentWillReceiveProps(nextProps) {
    const scrollTop = this.state.scrollTop
      ? this.state.scrollTop + this.getScrollRate()
      : this.startingScrollTop;
    this.setState({ scrollTop });
  }

  componentDidUpdate() {
    this.$panels.scrollTop = this.state.scrollTop;
  }

  getScrollRate() {
    const windowHeight = window.innerHeight;
    const baseRate = Math.atan( (2 * this.props.cursorY) / windowHeight - 1 ) * 4 / Math.PI;
    return 35 * baseRate;
  }

  getBgColor = () => {
    return 'white';
  }

  getTextColor = () => {
    return 'red';
  }

  render() {
    return (
      <Style>
        <Hideable hideInitially visible>
          <div
            className="cursor"
            style={{
              top: this.props.cursorY,
              left: this.props.cursorX,
              transform: this.state.scrollRate > 0 ? 'rotate(180deg)' : '',
              width: '5em',
              height: '5em'
            }}
          >
            <SVG path="back-forward-cursor.svg" />
          </div>
          <Background
            bgColor={ this.getBgColor() }
            textColor={ this.getTextColor() }
          />
            <Px id="panels">
              {
                this.childList
              }
            </Px>
        </Hideable>
      </Style>
    );
  }
};

export default Panels;

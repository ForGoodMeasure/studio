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

const arctan = (x, scale) => Math.atan( (2 * x) / scale - 1 ) * 4 / Math.PI;

const Style = styled.div`
  #panels {
    position: relative;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: hidden;
    .tilt-element {
      transform:
        translateX(${ p => p.transformX * -10 }vw)
        rotate3d(0, 1, 0, ${ p => p.transformX * 10 }deg);
    }
  }
  .cursor {
    height: 6em;
    width: 6em;
    position: fixed;
    z-index: 10;
    pointer-events:none;
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
      projectId: '',
      scrollTop: 0,
      transformX: 0
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
    const scrollTop = this.getScrollTop();
    const transformX = this.getTransformX();
    const projectId = this.getProjectId();

    this.setState({
      scrollTop,
      transformX,
      projectId
    });
  }

  componentDidUpdate() {
    this.$panels.scrollTop = this.state.scrollTop;
  }

  getScrollTop() {
    const windowHeight = window.innerHeight;
    const baseRate = arctan(this.props.cursorY, windowHeight);
    const scrollRate =  35 * baseRate;
    const scrollTop = this.state.scrollTop ? this.state.scrollTop + scrollRate : this.startingScrollTop;
    return scrollTop;
  }

  getTransformX() {
    const windowWidth = window.innerWidth;
    const baseTrans = arctan(this.props.cursorX, windowWidth);
    return baseTrans;
  }

  getProjectId() {
    const scrollTop = this.$panels.scrollTop;
    const docHeight = this.$panels.scrollHeight;
    const currentIndex = Math.floor(scrollTop / docHeight * (this.childList.length) + 0.5);
    return dotty.get(this.childList, `${ currentIndex }.props.projectId`);
  }

  getBgColor = () => {
    return ({
      rad: '#7F8893',
      sex: '#F9C9B6',
      hab: '#B7B2AC',
      sherpa: '#350700'
    })[this.state.projectId] || '#FFFFFF';
  }

  getTextColor = () => {
    return ({
      rad: '#313435',
      sex: '#000000',
      hab: '#F5F3F4',
      sherpa: '#C0BBB9'
    })[this.state.projectId] || '#000000';
  }

  render() {
    return (
      <Style transformX={ this.state.transformX }>
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

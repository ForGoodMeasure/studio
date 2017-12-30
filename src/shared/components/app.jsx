import { Link } from 'found';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Panel from './panel';
import Panels from './panels';
import { localContextType } from '../util';

const Style = styled.div`
  overflow: hidden;
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
        <h1 className="heading">
          For Good Measure
        </h1>
        <Window
          onClick={ this.onClick }
        >
          <Panels>
            <Panel color="red"    img={ imgUrl('better-angels-1.jpg') } />
            <Panel color="yellow" img={ imgUrl('better-angels-2.jpg') } />
            <Panel color="blue"   img={ imgUrl('better-angels-3.jpg') } />
            <Panel color="purple" img={ imgUrl('fleurisse-1.jpg') } />
            <Panel color="orange" img={ imgUrl('fleurisse-2.jpg') } />
            <Panel color="red"    img={ imgUrl('fleurisse-3.jpg') } />
            <Panel color="green" img={ imgUrl('habitas-1.jpg') } />
            <Panel color="brown" img={ imgUrl('habitas-2.jpg') } />
            <Panel color="white" img={ imgUrl('habitas-3.jpg') } />
            <Panel color="green" img={ imgUrl('pasta-boat-1.jpg') } />
            <Panel color="green" img={ imgUrl('pasta-boat-2.jpg') } />
            <Panel color="black" img={ imgUrl('pasta-boat-3.jpg') } />
            <Panel color="green" img={ imgUrl('rad-1.jpg') } />
            <Panel color="green" img={ imgUrl('rad-2.jpg') } />
            <Panel color="green" img={ imgUrl('rad-3.jpg') } />
            <Panel color="green" img={ imgUrl('rad-4.jpg') } />
            <Panel color="green" img={ imgUrl('rad-5.jpg') } />
            <Panel color="green" img={ imgUrl('sex-1.jpg') } />
          </Panels>
        </Window>
      </Style>
    );
  }
}

App.contextTypes = localContextType;

export default App;

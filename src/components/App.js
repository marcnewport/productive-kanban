import React, { Component } from 'react';
// import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';

import styled from 'styled-components';
import '@atlaskit/css-reset';

import {data, getData} from '../data';

const Container = styled.div`
  display: flex;
  width: 100%:
`;

class App extends Component {
  state = data;

  async componentDidMount() {
    this.setState(await getData());
  }

  render() {
    return (
      <Container>
        {this.state.columns.map(column => <Column key={column.id} column={column} />)}
      </Container>
    );
  }
}

export default App;

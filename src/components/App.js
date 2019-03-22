import React, { Component } from 'react';
// import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';

import styled from 'styled-components';
import '@atlaskit/css-reset';

import {getData} from '../data';

const Container = styled.div`
  display: flex;
  background: #dfe1e6;
  overflow: scroll;
`;

class App extends Component {
  state = {
    columns: [],
  }

  async componentDidMount() {
    this.setState({
      columns: await getData(),
    });
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

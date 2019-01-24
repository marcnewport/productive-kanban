import React, { Component } from 'react';
// import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';

import styled from 'styled-components';
import '@atlaskit/css-reset';

import {data, mapData} from '../data';

import qs from 'qs';

const url = 'https://api.productive.io/api/v2/tasks';
const now = Date.now();
// const after = now - (1.21e+9);
const before = now;
const status = 1;
const page = {
  size: 200,
};

const query = qs.stringify({
  // after,
  before,
  status,
  page,
});

const headers = {
  'X-Auth-Token': '3a403a0e-f76e-4204-b26e-e3a014455e0d',
  'X-Organization-Id': '2555',
  'Content-Type': 'application/vnd.api+json; charset=utf-8',
};

const Container = styled.div`
  display: flex;
  width: 100%:
`;

class App extends Component {
  state = data;

  componentDidMount() {
    fetch(url + '?' + query, {headers})
      .then(response => response.json())
      .then(response => this.setState(mapData(response)))
      .catch(error => console.error(error));
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

import React, { Component } from 'react';
import Task from './Task';

import styled from 'styled-components';



const Points = styled.div`
  position: absolute;
  right: 8px;
  top: 10px;
`;

const Title = styled.h4`
  padding: 8px;
  text-transform: capitalize;
`;

const TaskList = styled.div`
  padding: 8px;
  min-width: 300px;
`;

class Column extends Component {

  render() {
    const Container = styled.div`
      flex: 1;
      margin: 8px;
      border: 1px solid lightgrey;
      border-radius: 2px;
      position: relative;
      background: ${this.props.column.color}
    `;

    let points = 0;
    this.props.column.tasks.forEach(task => {
      if (task.points) points += task.points;
    });

    // TODO : pass points up to calculate sprint points

    return (
      <Container>
        <Title>{this.props.column.title}</Title>
        <Points>{points}</Points>
        <TaskList>
          {this.props.column.tasks.map(task => <Task key={task.id} task={task} />)}
        </TaskList>
      </Container>
    );
  }
}

export default Column;

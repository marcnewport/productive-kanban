import React, { Component } from 'react';

import styled from 'styled-components';

const Container = styled.div`
  padding: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  margin-bottom: 8px;
  background: white;
`;

const Title = styled.div`

`;

const Assignee = styled.div`

`;

const Points = styled.div`

`;

class Column extends Component {

  constructor(props) {
    props.task.href = 'https://app.productive.io/2555/m/task/' + props.task.id;
    super(props);
  }

  render() {
    return (
      <Container>
        <Title>
          <a href={this.props.task.href} target="_blank" rel="noreferrer noopener">
            {this.props.task.attributes.title}
          </a>
        </Title>
        <Assignee></Assignee>
        <Points>{this.props.task.points}</Points>
      </Container>
    );
  }
}

export default Column;

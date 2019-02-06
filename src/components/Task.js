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

const Points = styled.div`
  line-height: 30px;
  height: 30px;
  display: inline-block;
`;

const Assignee = styled.div`
  width: 30px;
  height: 30px;
  display: inline-block;
  border-radius: 50%;
  overflow: hidden;
  float: right;
  background: #dfe1e6;
  text-align: center;
  line-height: 30px;
  color: #fff;

`;

class Column extends Component {

  constructor(props) {
    props.task.href = 'https://app.productive.io/2555/m/task/' + props.task.id;
    super(props);
  }

  render() {

    let assignee;

    if (this.props.task.assignee) {
      if (this.props.task.assignee.avatar_url !== '') {
        assignee = <img src={this.props.task.assignee.attributes.avatar_url} alt={this.props.task.assignee.attributes.first_name + ' ' + this.props.task.assignee.attributes.last_name} width="100%" />;
      } else {
        assignee = this.props.task.assignee.attributes.first_name[0].toUpperCase();
      }
    }

    return (
      <Container>

        <Title>
          <a href={this.props.task.href} target="_blank" rel="noreferrer noopener">
            {this.props.task.attributes.title}
          </a>
        </Title>

        <Points>{this.props.task.points}</Points>

        <Assignee>
          {assignee}
        </Assignee>

      </Container>
    );
  }
}

export default Column;

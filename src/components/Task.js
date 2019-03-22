import React, { Component } from 'react';
import ColorHash from 'color-hash';
import textContrastColor from 'hex-contrast-color';

import styled from 'styled-components';

const Container = styled.a`
  padding: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  margin-bottom: 8px;
  background: white;
  display: block;
  position: relative;
`;

const Title = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
  padding-right: 30px;
`;

const Points = styled.div`
  /* font-size: 0.8em; */
  line-height: 30px;
  height: 30px;
  width: 30px;
  display: inline-block;
  position: absolute;
  top: 8px;
  right: 8px;
  text-align: center;
  /* border-radius: 50%;
  border: 1px solid #333; */
  color: #333;
`;

const TaskFooter = styled.div`
  overflow: hidden;
`;

const Assignee = styled.div`
  width: 30px;
  height: 30px;
  display: inline-block;
  border-radius: 50%;
  overflow: hidden;
  float: right;
  text-align: center;
  line-height: 30px;
`;

const EmptyAssignee = styled(Assignee)`
  background: #dfe1e6;
  color: #fff;
`;

class Column extends Component {

  constructor(props) {
    props.task.href = 'https://app.productive.io/2555/m/task/' + props.task.id;
    super(props);
  }

  render() {

    if (this.props.task.project.attributes.due_date) console.log(this.props.task.project.attributes.due_date);

    let points;

    if (this.props.task.points) {
      points = <Points>
        {this.props.task.points}
      </Points>
    }

    let assignee = <Assignee></Assignee>;

    if (this.props.task.assignee) {
      if (this.props.task.assignee.attributes.avatar_url) {
        assignee = <Assignee>
          <img src={this.props.task.assignee.attributes.avatar_url} alt={this.props.task.assignee.attributes.first_name + ' ' + this.props.task.assignee.attributes.last_name} width="100%" />
        </Assignee>;
      } else {
        assignee = <EmptyAssignee>
          {this.props.task.assignee.attributes.first_name[0].toUpperCase()}
        </EmptyAssignee>;
      }
    }

    const colorHash = new ColorHash();
    const bgColor = colorHash.hex(this.props.task.project.attributes.name.substring(0, 20));
    // const fgColor = textContrastColor(bgColor);

    const Project = styled.div`
      padding: 4px 8px;
      border-radius: 3px;
      font-size: 0.8em;
      display: inline-block;
      color: ${bgColor};
      border: 1px solid ${bgColor};
    `;

    return (
      <Container href={this.props.task.href} target="_blank" rel="noreferrer noopener">

        {points}

        <Title>
          {this.props.task.attributes.title}
        </Title>

        <TaskFooter>
          <Project>
            {this.props.task.project.attributes.name}
          </Project>

          <div>
            {this.props.task.project.attributes.due_date}
          </div>

          {assignee}
        </TaskFooter>

      </Container>
    );
  }
}

export default Column;

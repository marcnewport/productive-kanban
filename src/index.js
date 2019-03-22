import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

ReactDOM.render(<App />, document.getElementById('root'));

// break out sprints into array
const firstSprint = new Date('01/30/2019').getTime();
const sprintDuration = 1000 * 60 * 60 * 24 * 7 * 2;

let lastSprint = firstSprint;
let sprints = [];

const now = new Date().getTime();

while (lastSprint < now) {
  sprints.push(lastSprint);
  lastSprint += sprintDuration;
}

console.log(new Date(sprints.pop()));

// figure out which sprint we're in

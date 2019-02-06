import qs from 'qs';

const url = 'https://api.productive.io/api/v2/';

// TODO get this from .env file
const headers = {
  'X-Auth-Token': '3a403a0e-f76e-4204-b26e-e3a014455e0d',
  'X-Organization-Id': '2555',
  'Content-Type': 'application/vnd.api+json; charset=utf-8',
};


/**
 * [getBoards description]
 * @return {[type]} [description]
 */
async function getDevelopmentBoards() {

  const boards = await fetch(url + 'boards', {headers})
    .then(response => response.json())
    .then(response => response.data.filter(board => board.attributes.name === 'Development'))
    .catch(error => console.error(error));

  return boards.map(board => board.id);
}


/**
 * [getTasks description]
 * @return {[type]} [description]
 */
async function getTaskData() {

  const filter = {
    status: 1,
  };

  const page = {
    size: 200,
  };

  const query = qs.stringify({
    filter,
    page,
  });

  return await fetch(url + 'tasks?' + query, {headers})
    .then(response => response.json())
    .then(response => response)
    .catch(error => console.error(error));
}


/**
 * [mapData description]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
export async function getData() {

  const developmentBoards = await getDevelopmentBoards();

  const taskData = await getTaskData();

  const people = await fetch(url + 'people', {headers})
    .then(response => response.json())
    .then(response => response)
    .catch(error => console.error(error));

    console.log('people', people);

  // The allowed columns for this sprint
  const allowed = [
    'backlog',
    'to do',
    'in progress',
    'blocked',
    'with client',
    'ready to deploy',
    'completed',
  ];

  const backgrounds = [
    // '#dfe1e6',
    // '#97c1f9',
    // '#ff9696',
    // '#fdffd1',
    // '#8edea1',
    // '#ffffff'
    '#fff',
    '#fff',
    '#fff',
    '#fff',
    '#fff',
    '#fff'
  ];

  // Map the allowed columns into a more usable structure
  let columns = allowed.map((title, id) => {
    return {
      id,
      title,
      tasks: [],
      color: backgrounds[id],
    };
  });

  // Look over each task and push it to the appropriate column
  taskData.data.forEach((task, index) => {
    // Map the task list to the task
    let taskList = taskData.included.find(item => item.id === task.relationships.task_list.data.id);

    // console.log(developmentBoards.indexOf(taskList.relationships.board.data.id));

    // // Does this tasklist belong to a development board?
    // if (developmentBoards.indexOf(taskList.relationships.board.data.id) === -1) {
    //   return;
    // }

    // Check if the task list name is in the allowed columns
    let column = columns.find(column => column.title === taskList.attributes.name.toLowerCase());

    // Push the task into the column
    if (column) {
      task.attributes.tag_list.forEach(tag => {
        if (!isNaN(tag)) task.points = Number(tag);
      });

      if (task.relationships.assignee.data) {
        const assignee = people.data.find(person => person.id === task.relationships.assignee.data.id);
        task.assignee = assignee;
      }

      column.tasks.push(task);
    }
  });

  return {
    columns,
  }
}


// Dummy data
export const data = {
  tasks: {
    t1: {
      id: 't1',
      content: 'test',
    },
    t2: {
      id: 't2',
      content: 'test',
    }
  },
  columns: [
    {
      id: 'c1',
      title: 'Todo',
      tasks: [
        {
          id: 't1',
          attributes: {
            title: 'Test',
          },
        },
        {
          id: 't2',
          attributes: {
            title: 'Test',
          },
        }
      ],
    },
    {
      id: 'c2',
      title: 'In progress',
      tasks: [
        {
          id: 't3',
          attributes: {
            title: 'Test',
          },
        },
        {
          id: 't4',
          attributes: {
            title: 'Test',
          },
        }
      ],
    }
  ],
};

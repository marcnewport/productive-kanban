import qs from 'qs';

const url = 'https://api.productive.io/api/v2/';

// TODO get this from .env file
const headers = {
  'X-Auth-Token': '3a403a0e-f76e-4204-b26e-e3a014455e0d',
  'X-Organization-Id': '2555',
  'Content-Type': 'application/vnd.api+json; charset=utf-8',
};


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

  const taskData = await getTaskData();
  console.log(taskData);

  // // The unique data types
  // const uniqueTypes = [...new Set(taskData.included.map(x => x.type))];
  // console.log(uniqueTypes);

  // The allowed boards
  const allowedBoards = [
    'development',
    // 'design',
    'board',
  ];

  const boards = taskData.included.filter(item => item.type === 'boards' && allowedBoards.includes(item.attributes.name.toLowerCase()));

  // taskData.included.map(x => {
  //   // console.log(x);
  //   if (x.type === 'people') console.log(x);
  // });

  // The allowed columns for this sprint
  const allowedColumns = [
    // 'backlog',
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
    '#fff',
    '#fff'
  ];

  // Map the allowed columns into a more usable structure
  let columns = allowedColumns.map((title, id) => {
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

    // Does this tasklist belong to allowed boards?
    const board = boards.find(item => item.id === taskList.relationships.board.data.id);
    if (!board) { return; }

    // Check if the task list name is in the allowed columns
    let column = columns.find(column => taskList.attributes.name.toLowerCase().includes(column.title));

    // Push the task into the column
    if (column) {
      task.attributes.tag_list.forEach(tag => {
        if (!isNaN(tag)) task.points = Number(tag);
      });

      // Attach project to task
      if (task.relationships.project.data) {
        const project = taskData.included.find(item => item.id === task.relationships.project.data.id);
        task.project = project;
      }

      // Attach assignee to task
      if (task.relationships.assignee.data) {
        const assignee = taskData.included.find(item => item.id === task.relationships.assignee.data.id);
        task.assignee = assignee;
      }

      column.tasks.push(task);
    }
  });

  return columns;
}


// Dummy data
export const data = [
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
];

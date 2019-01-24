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

export function mapData(response) {

  console.log(response);

  // The allowed columns for this sprint
  const allowed = [
    'to do',
    'not started',
    'in progress',
    'blocked',
    'testing',
    'with client',
    'completed',
  ];

  const backgrounds = [
    'white',
    '#fafafa',
    '#fafaff',
    '#fffafa',
    'white',
    'white',
    '#fafffa'
  ];

  // Map the allowed columns into a more usable structure
  let columns = allowed.map((title, id) => {
    return {
      id,
      title,
      tasks:[],
      color: backgrounds[id],
    };
  });

  // Look over each task and push it to the appropriate column
  response.data.forEach((task, index) => {
    // Map the task list to the task
    let taskList = response.included.find(item => item.id === task.relationships.task_list.data.id);

    // Check if the task list name is in the allowed columns
    let column = columns.find(column => column.title === taskList.attributes.name.toLowerCase());
    // Push the task into the column
    if (column) {
      task.attributes.tag_list.forEach(tag => {
        if (!isNaN(tag)) task.points = Number(tag);
      });
      column.tasks.push(task);
    }
  });

  console.log({columns});

  return {
    columns,
  }
}

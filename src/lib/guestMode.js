import moment from 'moment';

export default function setupGuestMode(mock) {
  // const setLocalItem = (key, value) => {
  //   localStorage.setItem(key, JSON.stringify(value));
  // }

  // const getLocalItem = (key) => {
  //   JSON.parse(localStorage.getItem(key));
  // }

  const todo1 = {
    id: 1,
    project: {
      id: 1,
      name: "Goal 1",
      targetDate: moment().format("YYYY-MM-DD")
    },
    projectId: 1,
    name: "Todo 1",
    description: "",
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
    repeat: false,
    repeatPeriod: "week",
    repeatTimes: "1",
    instanceTimeSpan: "1",
    todo_dependencies: [],
    dependencies: [],
  };

  const todo2 = {
    id: 2,
    project: {
      id: 1,
      name: "Goal 1",
      targetDate: moment().format("YYYY-MM-DD")
    },
    projectId: 1,
    name: "Todo 2",
    description: "",
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
    repeat: false,
    repeatPeriod: "week",
    repeatTimes: "1",
    instanceTimeSpan: "1",
    todo_dependencies: [],
    dependencies: [],
  };

  const todo3 = {
    id: 3,
    project: {
      id: 2,
      name: "Goal 2",
      targetDate: moment().format("YYYY-MM-DD")
    },
    projectId: 2,
    name: "Todo 3",
    description: "",
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
    repeat: false,
    repeatPeriod: "week",
    repeatTimes: "1",
    instanceTimeSpan: "1",
    todo_dependencies: [],
    dependencies: [],
  };

  const project1 = {
    id: 1,
    name: "Goal 1",
    targetDate: moment().format("YYYY-MM-DD"),
  };

  const project2 = {
    id: 2,
    name: "Goal 2",
    targetDate: moment().format("YYYY-MM-DD"),
  };

  const todos = [todo1, todo2, todo3];
  const projects = [project1, project2];

  const staticRequests = [
    {
      key: "/me.json",
      data: {
        id: 1,
        email: "guest@local",
        name: "Guest",
        image_url: "",
      },
    },
    {
      key: "/todos.json",
      data: todos,
    },
    {
      key: "/projects.json",
      data: projects,
    }
  ];

  staticRequests.forEach((request) => {
    localStorage.setItem(request.key, JSON.stringify(request.data));

    mock.onGet(request.key).reply((_config) => {
      const response = JSON.parse(localStorage.getItem(request.key));
      return [200, response];
    });
  });

  const idRequests = [
    {
      urlRegex: /\/todos\/\d+\.json/,
      key: "/todos.json",
    },
    {
      urlRegex: /\/projects\/\d+\.json/,
      key: "/projects.json",
    }
  ];

  idRequests.forEach((request) => {
    mock.onGet(request.urlRegex).reply((config) => {
      const dataset = JSON.parse(localStorage.getItem(request.key));
      const record = dataset.find((datum) => {
        const recordId = config.url.match(/(\d+)/g)[0];
        return datum.id === parseInt(recordId);
      });
      return [200, record];
    });
  });

  const queryRequests = [
    {
      urlRegex: /\/todos\.json\?project_id=\d+/,
      key: "/todos.json",
      filter: (todo, config) => {
        const recordId = config.url.match(/(\d+)/g)[0];
        return todo.id === parseInt(recordId);
      }
    },
    {
      urlRegex: /\/todos\.json\?name=\w+/,
      key: "/todos.json",
      filter: (todo, config) => {
        const name = config.url.split("=")[1];
        return todo.name.contains(name);
      }
    },
    {
      urlRegex: /\/projects\.json\?name=\w+/,
      key: "/projects.json",
      filter: (project, config) => {
        const name = config.url.split("=")[1];
        return project.project.name.contains(name);
      }
    }
  ];

  queryRequests.forEach((request) => {
    mock.onGet(request.urlRegex).reply((config) => {
      const dataset = JSON.parse(localStorage.getItem(request.key));
      const records = dataset.filter(request.filter);
      return [200, records];
    });
  });
};
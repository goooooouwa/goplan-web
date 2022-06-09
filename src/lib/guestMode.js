import moment from 'moment';
import MockAdapter from "axios-mock-adapter";
import { camelCase, mapKeys, some } from 'lodash';

const user = {
  id: 1,
  email: "guest@local",
  name: "Guest",
  image_url: "",
};

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
  status: false,
  repeatPeriod: "week",
  repeatTimes: "1",
  instanceTimeSpan: "1",
  dependencies: [],
  dependents: [],
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
  status: false,
  repeatPeriod: "week",
  repeatTimes: "1",
  instanceTimeSpan: "1",
  dependencies: [],
  dependents: [],
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
  status: false,
  repeatPeriod: "week",
  repeatTimes: "1",
  instanceTimeSpan: "1",
  dependencies: [],
  dependents: [],
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

function seedData() {
  const requests = [
    {
      key: "access_token",
      data: "fake-access-token",
    },
    {
      key: "/me.json",
      data: user,
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

  requests.forEach((request) => {
    if (localStorage.getItem(request.key) === null) {
      localStorage.setItem(request.key, JSON.stringify(request.data));
    }
  });
}

function setupStaticRequests(mock) {
  const staticRequests = [
    {
      key: "/me.json",
    },
    {
      key: "/todos.json",
    },
    {
      key: "/projects.json",
    }
  ];

  staticRequests.forEach((request) => {
    mock.onGet(request.key).reply((_config) => {
      const response = JSON.parse(localStorage.getItem(request.key));
      return [200, response];
    });
  });

  mock.onPut("/me.json").reply((_config) => {
    const response = JSON.parse(localStorage.getItem("/me.json"));
    return [200, response];
  });

  mock.onPut(/\/todos\/\d+\/dependencies.json/).reply((_config) => {
    return [200, {}];
  });
}

function setupIdRequests(mock) {
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
      const record = dataset.find((item) => {
        const recordId = config.url.match(/(\d+)/g)[0];
        return item.id === parseInt(recordId);
      });
      return [200, record];
    });
  });
}

function setupQueryRequests(mock) {
  const queryRequests = [
    {
      urlRegex: /^\/todos\.json\?project_id=\d+$/,
      key: "/todos.json",
      filter: (todo, config) => {
        const project_id = config.url.match(/(\d+)/g)[0];
        return todo.projectId === parseInt(project_id);
      }
    },
    {
      urlRegex: /\/todos\.json\?name=\w+/,
      key: "/todos.json",
      filter: (todo, config) => {
        const name = config.url.split("=")[1];
        return todo.name.toLowerCase().includes(name.toLowerCase());
      }
    },
    {
      urlRegex: /\/todos\.json\?project_id=\d+&name=\w+/,
      key: "/todos.json",
      filter: (todo, config) => {
        const params = config.url.split("&");
        const project_id = params[0].split("=")[1];
        const name = params[1].split("=")[1];
        return todo.projectId === parseInt(project_id) && todo.name.toLowerCase().includes(name.toLowerCase());
      }
    },
    {
      urlRegex: /\/projects\.json\?name=\w+/,
      key: "/projects.json",
      filter: (project, config) => {
        const name = config.url.split("=")[1];
        return project.name.toLowerCase().includes(name.toLowerCase());
      }
    }
  ];

  queryRequests.forEach((request) => {
    mock.onGet(request.urlRegex).reply((config) => {
      const dataset = JSON.parse(localStorage.getItem(request.key));
      const records = dataset.filter((item) => {
        return request.filter(item, config);
      });
      return [200, records];
    });
  });
}

function setupPostRequests(mock) {
  const postRequests = [
    {
      key: "/projects.json",
      transform: (projectData, id) => {
        return {
          id: id,
          name: projectData.name,
          targetDate: projectData.target_date
        };
      }
    },
    {
      key: "/todos.json",
      transform: (todoData, id) => {
        const projects = JSON.parse(localStorage.getItem("/projects.json"));
        const project = projects.find((item) => {
          return item.id === parseInt(todoData.project_id);
        });

        const todos = JSON.parse(localStorage.getItem("/todos.json"));
        const dependencies = todos.filter((item) => {
          return some(todoData.todo_dependencies_attributes, { 'todo_id': item.id });
        });

        return {
          id: id,
          projectId: parseInt(todoData.project_id),
          project: project,
          name: todoData.name,
          description: todoData.description,
          startDate: todoData.start_date,
          endDate: todoData.end_date,
          repeat: todoData.repeat,
          status: false,
          repeatPeriod: todoData.repeat_period,
          repeatTimes: todoData.repeat_times,
          instanceTimeSpan: todoData.instance_time_span,
          dependencies: dependencies,
          dependents: [],
        };
      }
    },
  ];

  postRequests.forEach((request) => {
    mock.onPost(request.key).reply((config) => {
      const dataset = JSON.parse(localStorage.getItem(request.key));
      const formData = JSON.parse(config.data);
      const item = request.transform(formData, dataset.length + 1);
      dataset.push(item);
      localStorage.setItem(request.key, JSON.stringify(dataset));
      return [200, item];
    });
  });
}

function setupPutRequests(mock) {
  const putRequests = [
    {
      urlRegex: /\/projects\/\d+\.json/,
      key: "/projects.json",
      transform: (projectData, project) => {
        const projectUpdate = mapKeys(projectData, function (value, key) {
          return camelCase(key);
        });

        return { ...project, ...projectUpdate };
      }
    },
    {
      urlRegex: /\/todos\/\d+\.json/,
      key: "/todos.json",
      transform: (todoData, todo) => {
        const todoUpdate = mapKeys(todoData, function (value, key) {
          return camelCase(key);
        });

        let updatedTodo = { ...todo, ...todoUpdate };

        const projects = JSON.parse(localStorage.getItem("/projects.json"));
        const project = projects.find((item) => {
          return item.id === parseInt(updatedTodo.project_id);
        });

        const todos = JSON.parse(localStorage.getItem("/todos.json"));
        const dependencies = todos.filter((item) => {
          return some(todoUpdate.dependencies, { 'id': item.id });
        });

        updatedTodo = {
          ...updatedTodo,
          ...{
            project: project,
            dependencies: dependencies
          }
        };

        return updatedTodo;
      }
    },
  ];

  putRequests.forEach((request) => {
    mock.onPut(request.urlRegex).reply((config) => {
      let dataset = JSON.parse(localStorage.getItem(request.key));
      const id = config.url.match(/(\d+)/g)[0];
      const record = dataset.find((item) => {
        return item.id === parseInt(id);
      });
      const formData = JSON.parse(config.data);
      const updatedItem = request.transform(formData, record);
      dataset = dataset.filter(function( obj ) {
        return obj.id !== updatedItem.id;
      });
      dataset.push(updatedItem);
      localStorage.setItem(request.key, JSON.stringify(dataset));
      return [200, updatedItem];
    });
  });
}

export default function setupGuestMode(axios) {
  const mock = new MockAdapter(axios);

  // const setLocalItem = (key, value) => {
  //   localStorage.setItem(key, JSON.stringify(value));
  // }

  // const getLocalItem = (key) => {
  //   JSON.parse(localStorage.getItem(key));
  // }

  seedData();
  setupStaticRequests(mock);
  setupIdRequests(mock);
  setupQueryRequests(mock);
  setupPostRequests(mock);
  setupPutRequests(mock);
};

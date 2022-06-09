import moment from 'moment';
import MockAdapter from "axios-mock-adapter";
import { some } from 'lodash';

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
      key: "/me.json",
      data: user,
    },
  ];

  requests.forEach((request) => {
    localStorage.setItem(request.key, JSON.stringify(request.data));
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
        const recordId = config.url.match(/(\d+)/g)[0];
        return todo.projectId === parseInt(recordId);
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
    {
      key: "/projects.json",
      transform: (projectData, id) => {
        return {
          id: id,
          name: projectData.name,
          targetDate: projectData.target_date
        };
      }
    }
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
};
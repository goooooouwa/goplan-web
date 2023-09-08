## Timeline Update Logic

**Summary**

When user changes a task (in the task edit page, task list or timeline page, etc):

- The frontend only needs to send 1 normal API request to update the task itself,
- Then in the backend, all the write operations (for the task and its children & dependents) will be done in the same request.
- The frontend only needs to pull the latest todos to keep the UI up-to-date.

**Frontend Logic**

When a user moves either the start date or the end date of a task, the following will happen in the frontend:

1. Update the task's start date or end date, e.g. `PUT /todos/28.json`
2. Reload the tasks for the selected date range, e.g. `GET /todos.json?root=true&project_id=3&year=2023-01-01`
3. Load children of each expanded task, e.g. `GET /todos/28/children.json`

**Backend Logic**

When an API request to update a task's start date or end date is recevied, the following will happen in the backend:

1. `before_update :shift_end_date, if: lambda {
                                       will_save_change_to_start_date? && (!will_save_change_to_end_date? || (end_date - end_date_was).abs / 1.days < 1)
                                     }`
2. Update the task's start end and / or end date
2. `after_update :update_children_timeline, if: -> { saved_change_to_start_date? && saved_change_to_end_date? }`
3. `after_update :update_dependents_timeline, :update_parents_end_date, if: -> { saved_change_to_end_date? }`

### Detailed Frontend Logic

`updateTodoStartEndDate` logic

1. Send API request to update the todo (and its children & dependents)
1. Apply changes to all occurrences of the updated todo in the todos tree  
    ```javascript
    httpService.put(`/todos/${todo.id}.json`, todoData)
      .then((response) => {
        setTodos((todos) => {
          return todoTraversal.changeAllOccurrencesOfTodoInTree(todos, response.data);
        });
      })
    ```
1. Reload todos with `reloadTodos(todosUrl)`

`loadChildren` logic

1. Get a todo's children  
    ```javascript
    httpService.get(`/todos/${todo.id}/children.json`)
      .then((response) => {
        const updatedTodo = {
          ...todo,
          children: response.data,
        }
        setTodos((todos) => {
          return todoTraversal.changeAllOccurrencesOfTodoInTree(todos, updatedTodo);
        });
      })
    ```

`reloadTodos` logic

1. Get all todos for the selected date range  
    ```javascript
    httpService.get(todosUrl)
      .then((response) => {
        setTodos(response.data);
      })
    ```

### Detailed Backend Logic

There're many validations in the `models/todo.rb` (in [GoPlan API](https://github.com/goooooouwa/goplan-api) repo), below is a snapshot:

```ruby
  validates_length_of :parents, maximum: 1
  validate :start_date_cannot_earlier_than_dependencies_end_date
  validate :start_date_cannot_earlier_than_parents_start_date
  validate :start_date_cannot_later_than_children_start_date, on: :create
  validate :end_date_cannot_earlier_than_start_date
  validate :end_date_cannot_later_than_dependents_start_date, on: :create
  validate :end_date_cannot_later_than_parents_end_date, on: :create
  validate :end_date_cannot_earlier_than_children_end_date
  validate :todo_dependencies_cannot_include_self
  validate :todo_dependencies_cannot_include_dependents
  validate :todo_dependencies_cannot_include_deps_dependencies
  validate :todo_dependents_cannot_include_self
  validate :todo_dependents_cannot_include_dependencies
  validate :todo_dependents_cannot_include_depts_dependents
  validate :todo_children_cannot_include_self
  validate :todo_parents_cannot_include_self
  validate :cannot_mark_as_done_if_dependencies_not_done, if: -> { will_save_change_to_attribute?(:status, to: true) }
```

These rules are to avoid infinite loop when updating a todo, e.g. a todo can not be it's own child. There will still be other cases that can cause infinite loop, such as [this one](https://docs.google.com/presentation/d/17pijEV5v6iqGyBk2VPzo3S_6IV10wm8wm_A754qqC6k/edit#slide=id.g2428da49b89_0_8), which should be invalidated if possible.
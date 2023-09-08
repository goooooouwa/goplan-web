## Timeline Update Logic

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
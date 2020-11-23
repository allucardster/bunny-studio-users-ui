export const userTaskListAction = (userId) => ({
  method: 'GET',
  endpoint: `/api/user/${userId}/user-task/list`
});

export const createUserTaskAction = (userId, task) => ({
  method: 'POST',
  endpoint: `/api/user/${userId}/user-task`,
  body: task
});

export const readUserTaskAction = (userId, id) => ({
  method: 'GET',
  endpoint: `/api/user/${userId}/user-task/${id}`
});

export const updateUserTaskAction = (userId, id, body) => ({
  method: 'PATCH',
  endpoint: `/api/user/${userId}/user-task/${id}`,
  body
});

export const deleteUserTaskAction = (userId, id) => ({
  method: 'DELETE',
  endpoint: `/api/user/${userId}/user-task/${id}`
});
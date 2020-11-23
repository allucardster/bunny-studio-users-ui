export const userTaskListAction = (userId) => ({
  method: 'GET',
  endpoint: `/api/user/${userId}/user-task/list`
});
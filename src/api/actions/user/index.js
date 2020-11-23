export const userListAction = () => ({
  method: 'GET',
  endpoint: '/api/user/list'
});

export const createUserAction = (user) => ({
  method: 'POST',
  endpoint: '/api/user',
  body: user
});
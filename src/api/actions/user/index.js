export const userListAction = () => ({
  method: 'GET',
  endpoint: '/api/user/list'
});

export const createUserAction = (user) => ({
  method: 'POST',
  endpoint: '/api/user',
  body: user
});

export const readUserAction = (id) => ({
  method: 'GET',
  endpoint: `/api/user/${id}`
});

export const updateUserAction = (id, body) => ({
  method: 'PATCH',
  endpoint: `/api/user/${id}`,
  body
});
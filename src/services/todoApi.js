import API from "../lib/api";

export const createTodo = async (data) => {
  const res = await API.post("todo", data);
  return res.data;
};
export const updateTodo = async ({ id, tasks }) => {
  const res = await API.patch(`todo/${id}`, { tasks });
  return res.data;
};
export const deleteTodo = async ({ id }) => {
  const res = await API.delete(`todo/${id}`);
  return res.data;
};

export const getTodo = async () => {
  const res = await API.get("todo");
  return res.data;
};
export const getTodoById = async ({ id }) => {
  const res = await API.get(`todo?id=${id}`);
  return res.data[0];
};

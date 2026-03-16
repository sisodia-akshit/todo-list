export const getPendingTask = (data) => {
  return data.filter((curr) => curr.isCompleted === false);
};

export const getDeadline = (data) => {
  const date = new Date(data);
  return new Date(
    `${date.getMonth() + 1} ${date.getDate() + 1} ${date.getFullYear()}`,
  );
};

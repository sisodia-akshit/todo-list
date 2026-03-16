export const getLimitedString = (string, length) => {
  return string
    ?.split("")
    .filter((curr, i) => i < length)
    .join("");
};

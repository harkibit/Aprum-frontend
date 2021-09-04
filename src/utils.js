export const NullOrEmpty = (value) => {
  return value === "" || value === null;
};

export const boolToInt = (value) => (value ? 1 : 0);

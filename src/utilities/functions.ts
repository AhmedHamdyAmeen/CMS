export const checkDuplicated = (value: any) => {
  const duplicated = value.filter(
    (item: any, index: any) => value.indexOf(item) !== index
  );
  return !Boolean(duplicated.length);
};

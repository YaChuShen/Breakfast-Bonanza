const splitCategories = (s:string) => {
  return s?.split('&') ?? [];
};

export default splitCategories;

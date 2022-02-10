export const debounce = (func: any, delay: number) => {
  let debounceTimer: ReturnType<typeof setTimeout>;

  return (...args: any) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

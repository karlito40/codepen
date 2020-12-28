export const remove = (arr, atIndex) =>  {
  return arr[atIndex] !== undefined
    ? [...arr.slice(0, atIndex), ...arr.slice(atIndex + 1)]
    : arr;
}

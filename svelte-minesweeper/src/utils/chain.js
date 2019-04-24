// chain tree shaking
import shuffle from 'lodash/shuffle';
import chunk from 'lodash/chunk';
import map from 'lodash/map';

const chainableFunctions = {
  shuffle,
  chunk,
  map
};

export default function chain (input) {
  let value = input;

  const bindFunctions = Object.entries(chainableFunctions).reduce((acc, [key, f]) => {
    acc[key] = (...args) => {
      value = f(value, ...args);
      return wrapper;
    };

    return acc;
  }, {});

  const wrapper = {
    ...bindFunctions,
    value: () => value,
  };
  return wrapper;
};
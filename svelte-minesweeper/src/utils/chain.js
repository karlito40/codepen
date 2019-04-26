// chain tree shaking
import shuffle from 'lodash/shuffle';
import chunk from 'lodash/chunk';
import map from 'lodash/map';
import tap from 'lodash/tap';

const chainableFunctions = {
  shuffle,
  chunk,
  map,
  tap
};

export default function chain (input) {
  let value = input;

  const wrapper = {
    ...Object.entries(chainableFunctions).reduce((acc, [key, f]) => {
      acc[key] = (...args) => {
        value = f(value, ...args);
        return wrapper;
      };
  
      return acc;
    }, {}),
    value: () => value,
  };

  return wrapper;
};
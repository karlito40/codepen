import Draggable from './Draggable';
import Resizable from './Resizable';

export function draggable(target, options = {}) {
  return new Draggable(target, options);
}

export function resizable(target, options = {}) {
  return new Resizable(target, options);
}
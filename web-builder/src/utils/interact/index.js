import Draggable from './Draggable';
import Resizable from './Resizable';
import Drawable from './Drawable';

export function draggable(target, options = {}) {
  return new Draggable(target, options);
}

export function resizable(target, options = {}) {
  return new Resizable(target, options);
}

export function drawable(target, options = {}) {
  return new Drawable(target, options);
}
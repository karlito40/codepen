import { EventEmitter } from 'events';

let nbInstance = 0;

const signal = new EventEmitter();
const interactables = new Map();

export default class Interactable {
  constructor(target, options = {}) {
    this.id = ++nbInstance;
    this.target = target;
    this.listeners = [];
    this.shareSignal = signal;

    if(!interactables.has(this.target)) {
      interactables.set(this.target, {});
    }
    
    if(interactables.get(this.target)[this.constructor.name]) {
      interactables.get(this.target)[this.constructor.name].unset();
    }

    interactables.get(this.target)[this.constructor.name] = this;

    this.$body = this.target.closest('body');

    if(typeof options.globalGesture === 'undefined' || options.globalGesture) {
      this.$body.addEventListener('mousemove', this.mousemove);
      this.$body.addEventListener('mousedown', this.mousedown);
      this.$body.addEventListener('mouseup', this.mouseup);
    }
    
  }

  mousemove = (e) => {
    this.onMouseMove(e);
  }

  mousedown = (e) => {
    this.onMouseDown(e);
  }

  mouseup = (e) => {
    this.onMouseUp(e);
  }

  on(channel, callback) {
    this.listeners.push({channel, callback});
    this.target.addEventListener(channel, callback);
    return this;
  }

  off(channel, callback) {
    this.listeners = this.listeners.filter(v => (v.channel !== channel && v.callback !== callback));
    this.target.removeEventListener(channel, callback);
    return this;
  }

  unset() {
    this.listeners.forEach(listener => {
      this.off(listener.channel, listener.callback);
    });

    this.$body.removeEventListener('mousemove', this.mousemove);
    this.$body.removeEventListener('mousedown', this.mousedown);
    this.$body.removeEventListener('mouseup', this.mouseup);
  }
}
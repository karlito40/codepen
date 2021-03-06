import { EventEmitter } from 'events';

let nbInstance = 0;

const signal = new EventEmitter();
const interactables = new Map();

export default class Interactable {
  constructor(target, options = {}) {
    this.options = options;

    this.id = ++nbInstance;
    this.target = target;
    this.listeners = [];
    this.shareSignal = signal;

    if(!interactables.has(this.target)) {
      interactables.set(this.target, {});
    }
    
    if(interactables.get(this.target)[this.getNameRef()]) {
      interactables.get(this.target)[this.getNameRef()].unset();
    }

    interactables.get(this.target)[this.getNameRef()] = this;

    this.$body = this.target.closest('body');
    if(this.$body && (typeof options.globalGesture === 'undefined' || options.globalGesture)) {
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
    this.userSelect(true);

    delete interactables.get(this.target)[this.getNameRef()];

    this.listeners.forEach(listener => {
      this.off(listener.channel, listener.callback);
    });

    if(this.$body) {
      this.$body.removeEventListener('mousemove', this.mousemove);
      this.$body.removeEventListener('mousedown', this.mousedown);
      this.$body.removeEventListener('mouseup', this.mouseup);
    }
  }

  userSelect(bool) {
    this.userSelectStatus = bool;
    if(!bool) {
      if(this.$body) {
        this.$body.classList.add('user-select-off')
      }
      return;
    }
    
    // On permet la selection des éléments si seulement
    // un autre interactable n'a pas supprimé ce choix
    for(let [target, interactablesInUse] of interactables) { // eslint-disable-line
      for(let interactable of Object.values(interactablesInUse)) {
        if(typeof interactable.userSelectStatus !== "undefined" && !interactable.userSelectStatus) {
          return;
        }
      }
    }

    if(this.$body) {
      this.$body.classList.remove('user-select-off');
    }
    
  }
}
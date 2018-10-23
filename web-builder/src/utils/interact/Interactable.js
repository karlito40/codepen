export default class Interactable {
  constructor(target, options = {}) {
    this.target = target;
    this.listeners = [];

    if(!this.target.interactable) {
      this.target.interactable = {};
    }

    if(this.target.interactable[this.constructor.name]) {
      this.target.interactable[this.constructor.name].unset();
    }

    this.target.interactable[this.constructor.name] = this;

    this.$body = this.target.closest('body');

    this.$body.addEventListener('mousemove', this.mousemove);
    this.$body.addEventListener('mousedown', this.mousedown);
    this.$body.addEventListener('mouseup', this.mouseup);
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
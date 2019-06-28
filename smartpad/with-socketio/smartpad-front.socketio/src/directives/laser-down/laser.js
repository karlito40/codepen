import Snake from './snake';

/* Based on https://codepen.io/rayfranco/pen/rrbKoX */
export default class Laser {
  constructor($el, options = {}) {
    this.$el = $el;
    this.snake = new Snake();
    this.$canvas = undefined;
    this.ctx = undefined;
    this.pointer = undefined;
    this.isRunning = false;

    this.tick = this.tick.bind(this);
    this.setPointer = this.setPointer.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);

    this.update(options);
  }

  update(options = {}) {
    this.snake.setProps(options);

    const prevOptions = { ...this.options };

    this.options = {
      debug: false,
      active: false,
      onTick() { },
      ...this.options,
      ...options
    };

    if (this.options.active !== prevOptions.active) {
      if (this.options.active) {
        this.enable();
      } else {
        this.disable();
      }
    }
  }

  setPointer(e) {
    this.pointer = e.touches ? e.touches[0] : e;
  }

  enable() {
    this.$el.style.touchAction = 'none';
    this.$el.addEventListener('pointerdown', this.start);
  }

  disable() {
    this.stop();
    this.$el.style.touchAction = 'auto';
    this.$el.removeEventListener('pointerdown', this.start);
  }

  start(e) {
    if (this.isRunning) {
      return;
    }

    this.isRunning = true;
    this.$canvas = createCanvas();
    this.ctx = this.$canvas.getContext('2d');
    this.snake.ctx = this.ctx;

    document.body.style.cursor = 'none';
    document.body.appendChild(this.$canvas);

    this.setPointer(e);
    this.$el.addEventListener('pointermove', this.setPointer);
    this.$el.addEventListener('pointerup', this.stop);

    requestAnimationFrame(this.tick);
  }

  stop() {
    document.body.style.cursor = '';
    
    this.isRunning = false;
    this.pointer = undefined;
    this.snake.reset();
    if (this.$canvas) {
      document.body.removeChild(this.$canvas);
      this.$canvas = undefined;
    }

    this.$el.removeEventListener('pointermove', this.setPointer);
    this.$el.removeEventListener('pointerup', this.stop);
  }

  tick() {
    // clear canvas
    if(!this.isRunning) {
      return;
    }

    this.$canvas.width = this.$canvas.width;
    if (this.pointer) {
      this.snake.eat({
        x: this.pointer.clientX,
        y: this.pointer.clientY
      });

      this.snake.tick();
      this.options.onTick(this);
    }

    requestAnimationFrame(this.tick);
  }
}

function createCanvas() {
  const canvas = document.createElement('canvas');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.width = window.innerWidth + 'px';
  canvas.style.height = window.innerHeight + 'px';
  canvas.style.position = 'fixed';
  canvas.style.zIndex = '99999';
  canvas.style.top = '0';
  canvas.style.right = '0';
  canvas.style.bottom = '0';
  canvas.style.left = '0';
  canvas.style.background = 'transparent';
  canvas.style.pointerEvents = 'none';

  return canvas;
}

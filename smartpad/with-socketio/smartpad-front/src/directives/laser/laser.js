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
    this.release = this.release.bind(this);

    this.update(options);
  }

  update(options = {}) {
    this.snake.setProps(options);

    const prevOptions = { ...this.options };

    this.options = {
      debug: false,
      visible: false,
      onTick() { },
      onMove() { },
      onRelease() { },
      ...this.options,
      ...options
    };

    if (this.options.visible !== prevOptions.visible) {
      if (this.options.visible) {
        this.start();
      } else {
        this.stop();
      }
    }
  }

  setPointer(e) {
    this.pointer = e.touches ? e.touches[0] : e;
    this.options.onMove(this);
  }

  release() {
    this.pointer = undefined;
    this.snake.reset();
    this.options.onRelease();
  }

  start() {
    this.$canvas = createCanvas();
    document.body.appendChild(this.$canvas);

    this.ctx = this.$canvas.getContext('2d');
    this.snake.ctx = this.ctx;
    this.isRunning = true;

    this.$el.style.touchAction = 'none';
    document.body.style.cursor = 'none';

    this.$el.addEventListener('pointermove', this.setPointer);
    this.$el.addEventListener('pointerleave', this.release);

    requestAnimationFrame(this.tick);
  }

  stop() {
    this.isRunning = false;

    document.body.style.cursor = '';
    this.$el.style.touchAction = 'auto';

    this.$el.removeEventListener('pointermove', this.setPointer);
    this.$el.removeEventListener('pointerleave', this.release);

    if (this.$canvas) {
      document.body.removeChild(this.$canvas);
      this.$canvas = undefined;
    }
  }

  tick() {
    if (!this.isRunning) {
      return;
    }

    this.$canvas.width = this.$canvas.width;
    if (this.isRunning) {
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

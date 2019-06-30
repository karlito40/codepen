import Laser from './laser';

export default {
  bind($el, binding) {
    $el.bkLaser = new Laser($el, binding.value);
  },

  update($el, binding) {
    if ($el.bkLaser) {
      $el.bkLaser.update(binding.value);
    }
  },

  unbind($el) {
    if ($el.bkLaser) {
      $el.bkLaser.disable();
    }
  }
};

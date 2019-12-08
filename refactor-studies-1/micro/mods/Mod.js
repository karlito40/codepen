module.exports = class Mod {
  constructor (key) {
    this.key = key;
    this.micro = null;
  }

  boot (micro) {
    this.micro = micro;
    this.onBoot();
  }

  start () {
    throw new Error ('start must be override');
  }
  
  stop () {
    throw new Error ('stop must be override');
  }

  onBoot () {}
  withProxy (prop) {}
}
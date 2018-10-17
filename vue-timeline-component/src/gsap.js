export default {
  // This function as nothing to do.
  // It's just here to preserve plugins on tree shaking
  // Otherwise, they are removed in production build
  load(Plugins) {
    return Plugins;
  }
}
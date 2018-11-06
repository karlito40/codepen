const libraries = importAll(require.context('./', true, /index.js$/));

const LibraryPlugin = {
  install(Vue) {
    for(let library of libraries) {
      for(let [name, component] of Object.entries(library.store)) {
        let tag = getTag(library.namespace, name);
        console.log('load component', tag)
        Vue.component(tag, {...component, name: tag});
      }
    }
  }
}

export default LibraryPlugin;

export { libraries };

function importAll (r) {
  const res = [];
  r.keys().forEach(fileName => {
    // Load only the main file from a library
    if(fileName.split('/').length !== 3) {
      return;
    }

    const library = r(fileName).default;
    // if(library && library.namespace) {
    if(library) {
      res.push(library);
    }
  });

  return res;
}

export function getTag(namespace = '', componentName) {
  return componentName + namespace; 
}

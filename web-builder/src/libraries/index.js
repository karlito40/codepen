const libraries = importAll(require.context('./', true, /index.js$/));

const LibraryPlugin = {
  install(Vue) {
    for(let library of libraries) {
      for(let [name, component] of Object.entries(library.store)) {
        let uniqName = name + library.namespace; 
        console.log('load component', uniqName)
        Vue.component(uniqName, {...component, name: uniqName});
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
    if(library && library.namespace) {
      res.push(library);
    }
  });

  return res;
}

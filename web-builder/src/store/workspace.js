import Vue from 'vue';
import uniqid from 'uniqid';

const headerId = uniqid();
const testTree = [
  {
    id: uniqid(),
    name: 'Root',
    component: 'Layer',
    options: {
      class: 'root',
      style: { height: '370px', width: '50%', top: '40px', left: '10%' }
    },
    children: [
      // 'Child text',
      {
        id: headerId,
        name: 'Header',
        component: 'Layer',
        options: {
          class: 'header',
          style: { height: '170px', width: '70%', top: '40px', left: '10%' },
        },
        children: [
          {
            id: uniqid(),
            name: 'SA',
            component: 'Layer',
            options: {
              class: 'sa',
              style: { height: '60px', width: '50%', top: '40px', left: '40%' },
            },
          }
        ]
      },
      // {
      //   id: uniqid(),
      //   name: 'Content',
      //   component: 'Layer',
      //   options: {
      //     props: { 
      //       follow: headerId
      //     }
      //   }
      // },
      // {
      //   id: uniqid(),
      //   name: 'Footer',
      //   component: 'Layer',
      //   follow: headerId
      // }
    ]
  },
];

const homeTree = [
  {
    id: uniqid(),
    name: 'Root',
    component: 'Layer',
    options: {
      style: { height: '400px', width: '500px' }
    },
  //   children: [
  //     'Child text',
  //     {
  //       id: headerId,
  //       name: 'Header',
  //       component: 'Layer',
  //       notify: [
          
  //       ]
  //     },
  //     {
  //       id: uniqid(),
  //       name: 'Content',
  //       component: 'Layer',
  //       options: {
  //         props: { 
  //           follow: headerId
  //         }
  //       }
  //     },
  //     {
  //       id: uniqid(),
  //       name: 'Footer',
  //       component: 'Layer',
  //       follow: headerId
  //     }
  //   ]
  },
];

const homeId = uniqid();
const state = {
  currentPageId: homeId,
  pages: [{
    id: homeId,
    name: 'Home',
    tree: testTree 
  },
  {
    id: uniqid(),
    name: 'Contact',
    tree: [createRootNode()]
  }]
};

const getters = {
  currentPage: getCurrentPage,
  currentTree(state, getters) {
    return getters.currentPage.tree;
  },
  rootNode(state, getters) {
    return getters.currentTree[0];
  }
}

const actions = {
  gotoPage({ commit }, pageId) {
    commit('gotoPage', pageId);
  },
  addPage({ commit }, name) {
    commit('addPage', name);
  },
  addNode({ commit }, params) {
    commit('addNode', params);
  },
  updateNode({ commit }, params) {
    if(!params.id) {
      throw new Error('An ID must be provide to updateNode');
    }
    commit('updateNode', params);
  },
  toggleDirectives({ dispatch, getters }, { nodeId, directives, reset }) {
    const tree = getters.currentTree;
    const node = findNode(tree, nodeId);

    dispatch('resetDirectives', {
      directives: reset, 
      ignoreNode: node
    });

    if(!node) {
      throw new Error('Cannot find node ' + nodeId);
    }

    const resetDirectives = getResetDirectives(reset);
    
    const changeDirectives = directives.reduce((acc, toolable) => {
      const toolableFormat = (typeof toolable === 'string')
        ? { name: toolable, binding: null }
        : toolable;
        
      const currentStatus = (
        node.options 
        && node.options.directives 
        && node.options.directives[toolableFormat.name] 
        && node.options.directives[toolableFormat.name].active
      );

      acc[toolableFormat.name] = {active: !currentStatus, ...toolable.binding};
      return acc;
    }, {});

    dispatch('updateNode', {
      id: nodeId,
      set: {
        options: {
          directives: {
            ...resetDirectives,
            ...changeDirectives
          }
        }
      }
    });
  },
  resetDirectives({ dispatch, getters }, { directives, ignoreNode }) {
    const tree = getters.currentTree;

    eachNode(tree, node => {
      if(node === ignoreNode) {
        return;
      }
  
      if(hasToolActive(node)) {
        const resetDirectives = getResetDirectives(directives);
  
        dispatch('updateNode', {
          id: node.id,
          set: {
            options: { directives: resetDirectives }
          }
        });
      }
    })
  }
}

const mutations = {
  gotoPage(state, pageId) {
    state.currentPageId = pageId;
  },
  addNode(state, params) {
    const node = {
      id: uniqid(),
      name: 'New ' + params.build.component,
      ...params.build
    };

    const currentTree = getCurrentPage(state).tree;
    const parentNode = findNode(currentTree, params.parentId);

    if(!parentNode) {
      node.name += ' ' + currentTree.length;
      return currentTree.push(node);
    }

    if(!parentNode.children) {
      Vue.set(parentNode, 'children', []);
    }

    node.name += ' ' + parentNode.children.length;
    parentNode.children.push(node);
  },
  updateNode(state, { id, set }) {
    const currentTree = getCurrentPage(state).tree;
    const node = findNode(currentTree, id);
    mutate(node, set);
  },
  addPage(state, name) {
    const pageId = uniqid();
    state.pages.push({
      id: pageId,
      name: name,
      tree: [createRootNode()] 
    })

    state.currentPageId = pageId;
  }
}

export default {
  // namespaced: true,
  state,
  getters,
  actions,
  mutations
}

function findNode(tree, withId) {
  if(!tree || !withId) {
    return null;
  }

  for(let node of tree) {
    if(node.id === withId) {
      return node;
    }

    if(node.children) {
      node = findNode(node.children, withId);
      if(node) {
        return node;
      }
    }
  }

  return null;
}

function eachNode(tree = [], callback) {
  for(let node of tree) {
    callback(node);

    if(node.children) {
      eachNode(node.children, callback);
    }
  }
}

function getCurrentPage(state) {
  return state.pages.find(page => page.id === state.currentPageId);
}

function createRootNode() {
  return {
    id: uniqid(),
    name: 'Root',
    component: 'Layer',
    options: {
      class: 'root',
      style: { height: '100%', width: '100%', top: '0', left: '0' }
    },
  }
}


function mutate(source, change) {
  for(let [key, value] of Object.entries(change)) {
    // L'objet à modifier n'existe pas dans la source
    if(typeof source[key] === 'undefined') {
      Vue.set(source, key, value);
    } else if(typeof value === 'object') {
      mutate(source[key], value);
    } else {
      source[key] = value;
    }
  }
}

function hasToolActive(node) {
  if(node.options && node.options.directives) {
    return Object.entries(node.options.directives).some(([name, binding]) => {
      return (toolableActions.indexOf(name) !== -1 && binding.active);
    });
  }

  return false;
}


function getResetDirectives(directives) {
  return directives.reduce((acc, label) => {
    acc[label] = { active: false };
    return acc;
  }, {});
}
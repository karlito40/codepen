import Vue from 'vue';
import uniqid from 'uniqid';

const headerId = uniqid();
// const testTree = [
//   {
//     id: uniqid(),
//     name: 'Root',
//     component: 'Layer',
//     options: {
//       class: 'root',
//       style: { height: '370px', width: '50%', top: '40px', left: '10%' }
//     },
//     children: [
//       {
//         id: headerId,
//         name: 'Header',
//         component: 'Layer',
//         options: {
//           class: 'header',
//           style: { height: '170px', width: '70%', top: '40px', left: '10%' },
//         },
//         children: [
//           {
//             id: uniqid(),
//             name: 'SA',
//             component: 'Layer',
//             options: {
//               class: 'sa',
//               style: { height: '60px', width: '50%', top: '40px', left: '40%' },
//             },
//           }
//         ]
//       },
//     ]
//   },
// ];
const testTree = [
  {
    id: uniqid(),
    title: 'Root',
    component: {
      name: 'Layer',
      options: {
        class: 'root',
        style: { height: '370px', width: '50%', top: '40px', left: '10%' }
      },
    },
    children: [
      {
        id: headerId,
        title: 'Header',
        component: {
          name: 'Layer',
          options: {
            class: 'header',
            style: { height: '170px', width: '70%', top: '40px', left: '10%' },
          },
        },
        children: [
          {
            id: uniqid(),
            title: 'SA',
            component: {
              name: 'Layer',
              options: {
                class: 'sa',
                style: { height: '60px', width: '50%', top: '40px', left: '40%' },
              },
            }
          }
        ]
      },
      {
        id: uniqid(),
        title: 'Test 2',
        component: {
          name: 'Layer',
          options: {
            class: 'header',
            style: { height: '30px', width: '70%', top: '340px', left: '10%' },
          },
        },
      },
      {
        id: uniqid(),
        title: 'Test 3',
        component: {
          name: 'Layer',
          options: {
            class: 'header',
            style: { height: '200px', width: '50%', top: '040px', left: '50%' },
          },
        },
      },
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

state.pages.forEach(p => {
  if(p.tree.length) {
    p.tree[0].isExpanded = true;
  }

  eachNode(p.tree, node => {
    // node.isLeaf = !node.children || !node.children.length;
    node.isLeaf = false;
    node.isSelected = false;
    node.isExpanded = typeof node.isExpanded !== 'undefined' ? node.isExpanded : false;
    node.data = node.data || {};
  })
})

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
  setTree({ commit }, tree) {
    commit('setTree', tree);
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
  toggleHighlightNode({ dispatch, commit, getters }, nodeId) {
    const tree = getters.currentTree;
    const [node] = findNode(tree, nodeId);
    const newHighlight = !(node.component.data && node.component.data.highlight);

    dispatch('updateNode', {
      id: nodeId,
      set: {
        component: {
          data: { highlight: newHighlight }
        }
      }
    });
  },
  toggleDirectives({ dispatch, getters }, { nodeId, directives, reset }) {
    const tree = getters.currentTree;
    const [node] = findNode(tree, nodeId);

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
      const { options } = node.component;
      const currentStatus = (
        options 
        && options.directives 
        && options.directives[toolableFormat.name] 
        && options.directives[toolableFormat.name].active
      );

      acc[toolableFormat.name] = {active: !currentStatus, ...toolable.binding};
      return acc;
    }, {});

    dispatch('updateNode', {
      id: nodeId,
      set: {
        component: {
          options: {
            directives: {
              ...resetDirectives,
              ...changeDirectives
            }
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
  
      if(hasDirectiveActive(node, directives)) {
        const resetDirectives = getResetDirectives(directives);
  
        dispatch('updateNode', {
          id: node.id,
          set: {
            component: {
              options: { directives: resetDirectives }
            }
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
  setTree(state, tree) {
    const page = getCurrentPage(state);
    page.tree = tree;
  },
  addNode(state, params) {
    const node = {
      id: uniqid(),
      title: 'New ' + params.build.component.name,
      isLeaf: false,
      data: {},
      ...params.build
    };

    const currentTree = getCurrentPage(state).tree;
    const [parentNode] = findNode(currentTree, params.parentId);

    if(!parentNode) {
      node.title += ' ' + currentTree.length;
      return currentTree.push(node);
    }

    if(!parentNode.children) {
      Vue.set(parentNode, 'children', []);
    }

    // parentNode.isLeaf = false;
    // TODO: recursive parent expansion
    parentNode.isExpanded = true; 

    node.title += ' ' + parentNode.children.length;
    parentNode.children.push(node);
  },
  updateNode(state, { id, set }) {
    const currentTree = getCurrentPage(state).tree;
    const [node, path] = findNode(currentTree, id);

    mutateNode(currentTree, path, node, set);
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

function findNode(tree, withId, basePath = []) {
  if(!tree || !withId) {
    return [];
  }

  // for(let node of tree) {
  for(let index in tree) {
    const node = tree[index];
    const path = [...basePath, index];

    if(node.id === withId) {
      return [node, path];
    }

    if(node.children) {
      const child = findNode(node.children, withId, path);
      if(child.length) {
        return child;
      }
    }
  }

  return [];
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
    title: 'Root',
    component: {
      name: 'Layer',
      options: {
        class: 'root',
        style: { height: '100%', width: '100%', top: '0', left: '0' }
      },
    }
  }
}

function mutateNode(tree, path, node, set) {
  mutate(node, set);

  const sourcePath = [...path];
  const nodePosition = sourcePath.pop();
  
  let source = tree;
  for(let nodeIndex of sourcePath) {
    source = source[nodeIndex].children || [];
  }

  Vue.set(source, nodePosition, node)
}

function mutate(source, change) {
  for(let [key, value] of Object.entries(change)) {
    // L'objet à modifier n'existe pas dans la source
    if(typeof source[key] === 'undefined') {
      Vue.set(source, key, value);
    } else 
    if(typeof value === 'object') {
      mutate(source[key], value);
    } else {
      source[key] = value;
    }
  }
}

function hasDirectiveActive(node, targetDirectives = []) {
  const { options } = node.component;
  if(options && options.directives) {
    return targetDirectives.some((name) => {
      return (options.directives[name] && options.directives[name].active);
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
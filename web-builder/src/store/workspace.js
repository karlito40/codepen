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
  }
}

const actions = {
  gotoPage({commit}, pageId) {
    commit('gotoPage', pageId);
  },
  addNode({ commit }, params) {
    commit('addNode', params);
  },
  addPage({ commit }, name) {
    commit('addPage', name);
  },
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
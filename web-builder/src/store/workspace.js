import uniqid from 'uniqid';

const headerId = uniqid();

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

const state = {
  currentPage: 'Home',
  pages: [{
    id: uniqid(),
    name: 'Home',
    tree: homeTree 
  },
  {
    id: uniqid(),
    name: 'Contact',
    tree: [
      {
        name: '_Root',
        component: 'Layer'
      },
    ]
  }]
};

const getters = {}

const actions = {
  addPage({ commit }, name) {
    commit('addPage', name)
  },
}

const mutations = {
  addPage(state, name) {
    console.log('addPage from workspace module')
    state.pages.push({
      id: uniqid(),
      name,
      tree: [
        {
          name: '_Root',
          component: 'Layer'
        },
      ] 
    })
  }
}

export default {
  // namespaced: true,
  state,
  getters,
  actions,
  mutations
}
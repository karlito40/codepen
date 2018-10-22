import uniqid from 'uniqid';

const headerId = uniqid();

const homeTree = [
  {
    id: uniqid(),
    name: 'Root',
    component: 'LayerMain',
    options: {
      style: { height: '1000px', width: '500px' }
    },
  //   children: [
  //     'Child text',
  //     {
  //       id: headerId,
  //       name: 'Header',
  //       component: 'LayerMain',
  //       notify: [
          
  //       ]
  //     },
  //     {
  //       id: uniqid(),
  //       name: 'Content',
  //       component: 'LayerMain',
  //       options: {
  //         props: { 
  //           follow: headerId
  //         }
  //       }
  //     },
  //     {
  //       id: uniqid(),
  //       name: 'Footer',
  //       component: 'LayerMain',
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
        component: 'LayerMain'
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
          component: 'LayerMain'
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
// TODO: transform to component
const testTree = [
  {
    name: 'Root',
    component: 'LayerMain',
    options: {
      style: { height: '1000px' }
    },
    children: [
      'Odzdz',
      {
        name: 'Toto',
        component: 'LayerMain',
        options: {
          props: {x: 3}
        }
      }
    ]
  },
];

const homeTree = [
  {
    name: 'Root',
    component: 'LayerMain',
    options: {
      style: { height: '1000px' }
    },
    children: [
      {
        name: 'header',
        component: 'LayerMain',
        // children: [{
        //   name: 'nav',
        //   component: '@current/CustomNav',
        //   props: {

        //   }
        // }]
      },
      {
        name: 'main',
        component: 'LayerMain',
      },
      {
        name: 'footer',
        component: 'LayerMain',
      }
    ]
  },
];

const basicTree = [
  {
    name: 'Root',
    component: 'LayerMain',
    options: {
      style: { height: '1000px' }
    },
  },
];

const project = {
  currentPage: 'Home',
  pages: [{
    name: 'Home',
    // tree: basicTree 
    tree: testTree 
  },
  {
    name: 'Contact',
    tree: [
      {
        name: '_Root',
        component: 'LayerMain'
      },
    ]
  }]
};

export default project;

export function getCurrentPage() {
  return project.pages.find(page => page.name === project.currentPage);
}
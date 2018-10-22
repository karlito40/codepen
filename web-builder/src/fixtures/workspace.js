import uniqid from 'uniqid';

// TODO: transform to component
const headerId = uniqid();
const testTree = [
  {
    id: uniqid(),
    name: 'Root',
    component: 'LayerMain',
    options: {
      style: { height: '1000px', width: '500px' }
    },
    // children: [
    //   'Child text',
    //   {
    //     id: headerId,
    //     name: 'Header',
    //     component: 'LayerMain',
    //     notify: [
          
    //     ]
    //   },
    //   {
    //     id: uniqid(),
    //     name: 'Content',
    //     component: 'LayerMain',
    //     options: {
    //       props: { 
    //         follow: headerId
    //       }
    //     }
    //   },
    //   {
    //     id: uniqid(),
    //     name: 'Footer',
    //     component: 'LayerMain',
    //     follow: headerId
    //   }
    // ]
  },
];

const homeTree = [
  {
    id: uniqid(),
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
    id: uniqid(),
    name: 'Root',
    component: 'LayerMain',
    options: {
      style: { height: '1000px' }
    },
  },
];

const workspace = {
  id: uniqid(),
  currentPage: 'Home',
  pages: [{
    name: 'Home',
    // tree: basicTree 
    tree: testTree 
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

export default workspace;

export function getCurrentPage() {
  return workspace.pages.find(page => page.name === workspace.currentPage);
}
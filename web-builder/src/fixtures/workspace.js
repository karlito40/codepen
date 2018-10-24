import uniqid from 'uniqid';

// TODO: transform to component
const headerId = uniqid();
const testTree = [
  {
    id: uniqid(),
    name: 'Root',
    component: 'Layer',
    options: {
      class: 'root',
      style: { height: '370px', width: '500px', top: '40px' }
    },
    children: [
      // 'Child text',
      {
        id: headerId,
        name: 'Header',
        component: 'Layer',
        options: {
          class: 'header',
          style: { height: '170px', width: '200px', top: '40px' },
        },
        children: [
          {id: uniqid(),
          name: 'SA',
          component: 'Layer',
          options: {
            class: 'sa',
            style: { height: '60px', width: '60px', top: '40px' },
          },}
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
      style: { height: '1000px' }
    },
    children: [
      {
        name: 'header',
        component: 'Layer',
        // children: [{
        //   name: 'nav',
        //   component: '@current/CustomNav',
        //   props: {

        //   }
        // }]
      },
      {
        name: 'main',
        component: 'Layer',
      },
      {
        name: 'footer',
        component: 'Layer',
      }
    ]
  },
];

const basicTree = [
  {
    id: uniqid(),
    name: 'Root',
    component: 'Layer',
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
        component: 'Layer'
      },
    ]
  }]
};

export default workspace;

export function getCurrentPage() {
  return workspace.pages.find(page => page.name === workspace.currentPage);
}
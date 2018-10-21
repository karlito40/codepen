// TODO: transform to component
const project = {
  currentPage: 'Home',
  pages: [{
    name: 'Home',
    tree: [
      {
        name: '_Root',
        component: 'Layer'
      },
      {
        name: 'header',
        component: 'Layer',
        children: [{
          name: 'nav',
          component: '@current/CustomNav',
          props: {

          }
        }]
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
  {
    name: 'Contact',
    tree: [
      {
        name: '_Root',
        component: 'Layer'
      },
    ]
  }]
};

export default project;

export function getCurrentPage() {
  return project.pages.find(page => page.name === project.currentPage);
}
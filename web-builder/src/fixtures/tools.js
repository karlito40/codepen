import store from '../store';

const ACTION_CAT = 'action';
const COMPONENT_CAT = 'component';

const tools = [
  // {
  //   name: 'text',
  //   description: 'Add text',
  //   icon: 'title',
  //   component: 'Text',
  //   category: COMPONENT_CAT
  // },
  // {
  //   name: 'link',
  //   description: 'Add link',
  //   icon: 'link',
  //   component: 'Link',
  //   category: COMPONENT_CAT
  // },
  // {
  //   name: 'image',
  //   description: 'Add image',
  //   icon: 'image',
  //   component: 'Image',
  //   category: COMPONENT_CAT
  // },
  {
    name: 'component',
    description: 'Add component',
    icon: 'apps',
    category: COMPONENT_CAT,
    action(pnode) {
      store.dispatch('toggleSearchForComponent', pnode);
    }
  },
  {
    name: 'draw',
    description: 'Draw layers',
    icon: 'create',
    category: ACTION_CAT,
    action(pnode) {
      store.dispatch('toggleDirectives', {
        nodeId: pnode.id,
        reset: ['drawable', 'resizable', 'draggable'],
        directives: [{
          name: 'drawable', 
          binding: {
            onDrawEnd(event, removePlaceholder) {
              const { target, rect } = event;
              const parentNodeId = target.dataset.pid;
        
              store.dispatch('addNode', {
                parentId: parentNodeId,
                build:{
                  component: {
                    name: 'Layer',
                    options: {
                      style: { ...rect },
                    }
                  },
                },
              });
              removePlaceholder();
            },
          }
        }],
      });
    }
  },
  {
    name: 'resize_and_dnd',
    description: 'Move/Resize',
    icon: 'zoom_out_map',
    category: ACTION_CAT,
    action(pnode) {
      store.dispatch('toggleDirectives', {
        nodeId: pnode.id,
        reset: ['drawable', 'resizable', 'draggable'],
        directives: ['resizable', 'draggable'],
      });
    }
  },
  {
    name: 'zoom',
    description: 'Zoom IN, Zoom OUT',
    icon: 'loupe',
    category: ACTION_CAT
  },
  
];

export default tools;

export function getCategory(cat) {
  return tools.filter(tool => tool.category === cat);
}

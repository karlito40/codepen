import store from '../store';

// future icons : layers, crop_landscape, code, title
const ACTION_CAT = 'action';
const COMPONENT_CAT = 'component';

const tools = [
  {
    name: 'text',
    description: 'Add text',
    icon: 'title',
    component: 'Text',
    category: COMPONENT_CAT
  },
  {
    name: 'link',
    description: 'Add link',
    icon: 'link',
    component: 'Link',
    category: COMPONENT_CAT
  },
  {
    name: 'image',
    description: 'Add image',
    icon: 'image',
    component: 'Image',
    category: COMPONENT_CAT
  },
  {
    name: 'draw',
    description: 'Draw layers',
    icon: 'create',
    category: ACTION_CAT,
    action(pnode) {
      store.dispatch('toggleDrawable', {
        nodeId: pnode.id,
        onDrawEnd(event, removePlaceholder) {
          const { target, rect } = event;
          const parentNodeId = target.dataset.pid;
    
          store.dispatch('addNode', {
            parentId: parentNodeId,
            build:{
              component: 'Layer',
              options: {
                style: { ...rect },
              }
            },
          });
          
          removePlaceholder();
        },
      });
    }
  },
  {
    name: 'resize_and_dnd',
    description: 'Move/Resize',
    icon: 'zoom_out_map',
    category: ACTION_CAT,
    action(pnode) {
      store.dispatch('toggleResizable', pnode.id);
      store.dispatch('toggleDraggable', pnode.id);
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

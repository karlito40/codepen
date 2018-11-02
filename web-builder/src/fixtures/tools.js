// future icons : layers, crop_landscape, code, title
const ACTION_CAT = 'action';
const COMPONENT_CAT = 'component';

const tools = [
  {
    name: 'draw',
    description: 'Draw layers',
    icon: 'create',
    component: 'Layer',
    visualizer: true,
    category: COMPONENT_CAT
  },
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
    name: 'drag_and_drop',
    description: 'Drag & drop',
    icon: 'open_with',
    category: ACTION_CAT
  },
  {
    name: 'redraw',
    description: 'Resize & Move layers',
    icon: 'zoom_out_map',
    category: ACTION_CAT
  },
  {
    name: 'zoom',
    description: 'Zoom IN, Zoom OUT',
    icon: 'loupe',
    category: ACTION_CAT
  },
  
];

export default tools;

import { resizable } from '../../utils/interact';
import { fromPosition, moveTarget, toPercent } from './_gestureUtil';

export default {
  install(Vue) {
    Vue.directive('resizable', {
      inserted (el, binding) {
        update(el, binding);
      },
      update(el, binding){
        update(el, binding);
      },
      unbind(el, binding, vnode, oldVnode) { // eslint-disable-line
        unset(el);
        // vnode.data.on.resizeComplete();
      }
    })
  }
}

function unset(el) {
  removeChildren(el, '.resizable-edge, .resizable-handle');
  resizable(el).unset();
}

function update(el, binding) {
  if(typeof binding.value !== 'undefined' && !binding.value
    || typeof binding.value === 'object' && typeof binding.value.active !== 'undefined' && !binding.value.active
  ) {
    return unset(el);
  }

  removeChildren(el, '.resizable-edge, .resizable-handle');

  appendEdges(el);

  resizable(el)
    .on('resizestart', fromPosition)
    .on('resizemove', resizeMoveListener)
    .on('resizeend', toPercent);
}


function resizeMoveListener(event) {
  const { target } = event;

  target.style.width  = event.rect.width + 'px';
  target.style.minHeight = event.rect.height + 'px';
  target.style.height = event.rect.height + 'px';

  moveTarget(target, event.deltaRect.left, event.deltaRect.top);
}

const handleDim = 10;
const handleMiddle = ~~(handleDim/2);
const handleBaseStyle = { width: handleDim + 'px', height: handleDim + 'px' };

function appendEdges(el) {
  const top = createEdge({
    width: '100%',
    height: '1px',
    top: '-1px',
    left: '0px',
  });
  el.appendChild(top);
  
  const right = createEdge({
    width: '1px',
    height: '100%',
    top: '0px',
    right: '-1px',
  });
  el.appendChild(right);
  
  const bottom = createEdge({
    width: '100%',
    height: '1px',
    bottom: '-1px',
    left: '0px',
  });
  el.appendChild(bottom);

  const left = createEdge({
    width: '1px',
    height: '100%',
    top: '0px',
    left: '-1px',
  });
  el.appendChild(left);
  
  // tl handle
  el.appendChild(createHandle({
    ...handleBaseStyle,
    left: -handleMiddle + 'px',
    top: -handleMiddle + 'px',
  }));
  
  // tr handle
  el.appendChild(createHandle({
    ...handleBaseStyle,
    right: -handleMiddle + 'px',
    top: -handleMiddle + 'px',
  }));

  // br handle
  el.appendChild(createHandle({
    ...handleBaseStyle,
    right: -handleMiddle + 'px',
    bottom: -handleMiddle + 'px',
  }));
  
  // bl handle
  el.appendChild(createHandle({
    ...handleBaseStyle,
    left: -handleMiddle + 'px',
    bottom: -handleMiddle + 'px',
  }));
}

function createEdge(style = {}) {
  const edge = document.createElement('div');
  edge.className = 'resizable-edge';
  edge.style.position = 'absolute';
  edge.style.backgroundColor = 'black';

  for(let [key, value] of Object.entries(style)) {
    edge.style[key] = value;
  }

  return edge;
}

function createHandle(style = {}) {
  const handle = document.createElement('div');
  handle.className = 'resizable-handle';
  handle.style.position = 'absolute';
  handle.style.border = '1px solid black';
  handle.style.backgroundColor = 'white';
  
  for(let [key, value] of Object.entries(style)) {
    handle.style[key] = value;
  }

  return handle;
}

function removeChildren(el, selector) {
  [...el.querySelectorAll(selector)].forEach(edge => edge.remove());
}
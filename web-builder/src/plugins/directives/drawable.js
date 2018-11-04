import { drawable } from '../../utils/interact';

export default {
  install(Vue) {
    Vue.directive('drawable', {
      inserted(el, binding) {
        update(el, binding);
        
      },
      update(el, binding) {
        update(el, binding);
      },
      unbind(el) {
        unset(el);
      }
    })
  }
}

function update(el, binding) {
  if(typeof binding.value !== 'undefined' && !binding.value
    || typeof binding.value === 'object' && typeof binding.value.active !== 'undefined' && !binding.value.active
  ) {
    return unset(el);
  }
  
  removeChildren(el, '.drawable-edge');

  appendEdges(el);

  drawable(el).on('drawend', (e) => drawEndListener(e, binding));
}

function unset(el) {
  removeChildren(el, '.drawable-edge');
  drawable(el).unset();
}

function drawEndListener(event, binding) {
  if(binding.value && binding.value.onDrawEnd) {
    binding.value.onDrawEnd(event, () => {
      event.freshEl.remove();    
    });
  }
}

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
}

function createEdge(style = {}) {
  const edge = document.createElement('div');
  edge.className = 'drawable-edge';
  edge.style.position = 'absolute';
  edge.style.backgroundColor = 'green';

  for(let [key, value] of Object.entries(style)) {
    edge.style[key] = value;
  }

  return edge;
}


function removeChildren(el, selector) {
  [...el.querySelectorAll(selector)].forEach(edge => edge.remove());
}
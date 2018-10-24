const listeners = new Map(); 

export default {
  install(Vue) {
    Vue.directive('over-out', {
      bind(el, binding) {
        update(el, binding);
      },
      update(el, binding) {
        update(el, binding);
      },
      unbind(el) {
        removeListeners(el);
      }
    })
  }
}

function update(el, binding) {
  const inListener = function(e) {
    return inHandler(e, binding);
  };

  const outListener = function(e) {
    return outHandler(e, binding);
  };

  listeners.set(el, [
    inListener,
    outListener
  ]);

  el.addEventListener('mouseover', inListener);
  el.addEventListener('mouseout', outListener);
}

function removeListeners(el) {
  const funcs = listeners.get(el) || [];
  funcs.forEach(listener => el.removeEventLister('mouseover', listener));
  listeners.delete(el);
}


function inHandler(e, binding) {
  e.stopPropagation();

  const className = getOptions(binding).class || '';
  e.currentTarget.classList.add(className);
}

function outHandler(e, binding) {
  e.stopPropagation();

  const className = getOptions(binding).class;
  if(className) {
    e.currentTarget.classList.remove(className);
  }
}

function getOptions(binding) {
  return (binding.value && typeof binding.value === 'object')
    ? binding.value
    : {};
}
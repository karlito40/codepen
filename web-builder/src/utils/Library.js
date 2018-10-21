import * as ComponentUtil from './Component';

export function createFromElements(namespace, elements) {
  return {
    namespace,
    store: ComponentUtil.createFromElements(namespace, elements),
};
}
import { ucfirst } from "./String";

export function createFromElement(namespace, element) {
  return {
    name: ucfirst(element),
    render(h) {
      return h(element, {
        props: { ...this.$props },
        on: this.$listeners
      }, this.$slots.default);
    }
  }
}

export function createFromElements(namespace, elements) {
  const store = {};
  for(let element of elements) {
    let component = createFromElement(namespace, element);
    store[component.name] = component;
  }

  return store;
}

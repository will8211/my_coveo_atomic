import { r as registerInstance, h } from './index-1c54a593.js';

const atomicComponentErrorCss = ":host{color:red}";

const AtomicComponentError = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h("p", null, this.error.name, h("br", null), this.error.message));
  }
};
AtomicComponentError.style = atomicComponentErrorCss;

export { AtomicComponentError as atomic_component_error };

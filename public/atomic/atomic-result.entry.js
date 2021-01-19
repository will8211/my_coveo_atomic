import { r as registerInstance, h, g as getElement } from './index-1c54a593.js';
import './utils-7d7e1c0f.js';
import './headless.esm-6bb95796.js';
import { b as bindLogDocumentOpenOnResult } from './result-utils-4df999ac.js';

const AtomicResult = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.unbindLogDocumentOpen = () => { };
  }
  componentDidRender() {
    this.unbindLogDocumentOpen = bindLogDocumentOpenOnResult(this.engine, this.result, this.host);
  }
  disconnectedCallback() {
    this.unbindLogDocumentOpen();
  }
  render() {
    return h("slot", null);
  }
  get host() { return getElement(this); }
};

export { AtomicResult as atomic_result };

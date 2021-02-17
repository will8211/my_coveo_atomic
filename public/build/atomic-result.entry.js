import { r as registerInstance, h, g as getElement } from './index-3acbf9e0.js';
import './headless.esm-fb41148c.js';
import { b as bindLogDocumentOpenOnResult } from './result-utils-5f70d6ae.js';

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

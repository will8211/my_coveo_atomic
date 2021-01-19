import { r as registerInstance, h } from './index-1c54a593.js';
import { q as nc } from './headless.esm-6bb95796.js';

const AtomicRelevanceInspector = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.unsubscribe = () => { };
    this.relevanceInspector = nc(this.engine, {
      initialState: {
        // TODO: add enable/disable mechanism
        enabled: false,
      },
    });
    this.unsubscribe = this.relevanceInspector.subscribe(() => this.updateState());
  }
  disconnectedCallback() {
    this.unsubscribe();
  }
  updateState() {
    this.state = this.relevanceInspector.state;
  }
  render() {
    if (!this.state.isEnabled) {
      return;
    }
    // TODO: Display data in a cleaner manner
    return (h("p", null, "Debug mode is enabled. Look at the developper console to see additional information."));
  }
};

export { AtomicRelevanceInspector as atomic_relevance_inspector };

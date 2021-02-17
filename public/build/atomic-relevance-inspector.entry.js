import { r as registerInstance, h } from './index-3acbf9e0.js';
import { q as lc } from './headless.esm-fb41148c.js';

const AtomicRelevanceInspector = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.unsubscribe = () => { };
    this.relevanceInspector = lc(this.bindings.engine, {
      initialState: {
        // TODO: add enable/disable mechanism
        enabled: false,
      },
    });
    this.unsubscribe = this.relevanceInspector.subscribe(() => (this.relevanceInspectorState = this.relevanceInspector.state));
  }
  disconnectedCallback() {
    this.unsubscribe();
  }
  render() {
    if (!this.relevanceInspectorState.isEnabled) {
      return;
    }
    // TODO: Display data in a cleaner manner
    return (h("p", null, "Debug mode is enabled. Look at the developper console to see additional information."));
  }
};

export { AtomicRelevanceInspector as atomic_relevance_inspector };

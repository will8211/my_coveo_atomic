import { r as registerInstance, h, g as getElement } from './index-1c54a593.js';
import { J as Ju } from './headless.esm-6bb95796.js';
import { I as Initialization } from './initialization-utils-bcbcd4a6.js';

const atomicFacetManagerCss = ":host{display:block}";

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const AtomicFacetManager = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.unsubscribe = () => { };
  }
  initialize() {
    this.facetManager = Ju(this.engine);
    this.unsubscribe = this.facetManager.subscribe(() => {
      this.updateStateToTriggerRender();
      this.sortFacets();
    });
  }
  disconnectedCallback() {
    this.unsubscribe();
  }
  updateStateToTriggerRender() {
    this.state = this.facetManager.state;
  }
  sortFacets() {
    const payload = this.facets.map((f) => ({ facetId: f.facetId, payload: f }));
    const sortedFacets = this.facetManager.sort(payload).map((f) => f.payload);
    this.host.append(...sortedFacets);
  }
  get facets() {
    const facets = [];
    const children = Array.from(this.host.children);
    children.forEach((child) => {
      this.isPseudoFacet(child) && facets.push(child);
    });
    return facets;
  }
  isPseudoFacet(el) {
    return 'facetId' in el;
  }
  render() {
    return h("slot", null);
  }
  get host() { return getElement(this); }
};
__decorate([
  Initialization()
], AtomicFacetManager.prototype, "initialize", null);
AtomicFacetManager.style = atomicFacetManagerCss;

export { AtomicFacetManager as atomic_facet_manager };

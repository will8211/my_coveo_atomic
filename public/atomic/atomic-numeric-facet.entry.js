import { r as registerInstance, h } from './index-1c54a593.js';
import { r as ru, n as nu } from './headless.esm-6bb95796.js';
import { I as Initialization } from './initialization-utils-bcbcd4a6.js';

const atomicNumericFacetCss = ":host{display:block}";

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
const AtomicNumericFacet = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.facetId = '';
    this.field = '';
    this.label = 'No label';
    this.unsubscribe = () => { };
  }
  initialize() {
    const options = {
      facetId: this.facetId,
      field: this.field,
      generateAutomaticRanges: false,
      currentValues: [
        ru({ start: 0, end: 20 }),
        ru({ start: 20, end: 40 }),
        ru({ start: 40, end: 60 }),
        ru({ start: 60, end: 80 }),
        ru({ start: 80, end: 100 }),
      ],
    };
    this.facet = nu(this.engine, { options });
    this.facetId = this.facet.state.facetId;
    this.subscribe();
  }
  subscribe() {
    this.unsubscribe = this.facet.subscribe(() => this.updateState());
  }
  connectedCallback() {
    this.facet && this.subscribe();
  }
  disconnectedCallback() {
    this.unsubscribe();
  }
  updateState() {
    this.state = this.facet.state;
  }
  get values() {
    return this.state.values.map((listItem) => this.buildListItem(listItem));
  }
  buildListItem(item) {
    const isSelected = this.facet.isValueSelected(item);
    return (h("div", { onClick: () => this.facet.toggleSelect(item) }, h("input", { type: "checkbox", checked: isSelected }), h("span", null, item.start, "-", item.end, " ", item.numberOfResults)));
  }
  get resetButton() {
    return this.state.hasActiveValues ? (h("button", { onClick: () => this.facet.deselectAll() }, "X")) : null;
  }
  get sortSelector() {
    return (h("select", { name: "facetSort", onChange: (val) => this.onFacetSortChange(val) }, this.sortOptions));
  }
  get sortOptions() {
    const criteria = ['ascending', 'descending'];
    return criteria.map((criterion) => (h("option", { value: criterion, selected: this.facet.isSortedBy(criterion) }, criterion)));
  }
  onFacetSortChange(e) {
    const select = e.composedPath()[0];
    const criterion = select.value;
    this.facet.sortBy(criterion);
  }
  render() {
    return (h("div", null, h("div", null, h("span", null, this.label), this.sortSelector, this.resetButton), h("div", null, this.values)));
  }
};
__decorate([
  Initialization()
], AtomicNumericFacet.prototype, "initialize", null);
AtomicNumericFacet.style = atomicNumericFacetCss;

export { AtomicNumericFacet as atomic_numeric_facet };

import { r as registerInstance, h } from './index-1c54a593.js';
import { M as Mc } from './headless.esm-6bb95796.js';
import { I as Initialization } from './initialization-utils-bcbcd4a6.js';

const atomicFacetCss = ":host{display:block}";

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
const AtomicFacet = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.facetId = '';
    this.field = '';
    this.label = 'No label';
    this.unsubscribe = () => { };
  }
  initialize() {
    const options = { facetId: this.facetId, field: this.field };
    this.facet = Mc(this.engine, { options });
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
    return (h("div", { onClick: () => this.facet.toggleSelect(item) }, h("input", { type: "checkbox", checked: isSelected }), h("span", null, item.value, " ", item.numberOfResults)));
  }
  get resetButton() {
    return this.state.hasActiveValues ? (h("button", { onClick: () => this.facet.deselectAll() }, "X")) : null;
  }
  get facetSearchInput() {
    return h("input", { onInput: (e) => this.onFacetSearch(e) });
  }
  onFacetSearch(e) {
    const value = e.target.value;
    const facetSearch = this.facet.facetSearch;
    facetSearch.updateText(value);
    facetSearch.search();
  }
  get facetSearchResults() {
    return this.state.facetSearch.values.map((searchResult) => (h("div", { onClick: () => this.facet.facetSearch.select(searchResult) }, searchResult.displayValue, " ", searchResult.count)));
  }
  get showMoreSearchResults() {
    if (!this.state.facetSearch.moreValuesAvailable) {
      return null;
    }
    return (h("button", { onClick: () => this.facet.facetSearch.showMoreResults() }, "show more"));
  }
  get sortSelector() {
    return (h("select", { name: "facetSort", onChange: (val) => this.onFacetSortChange(val) }, this.sortOptions));
  }
  get sortOptions() {
    const criteria = [
      'automatic',
      'occurrences',
      'score',
      'alphanumeric',
    ];
    return criteria.map((criterion) => (h("option", { value: criterion, selected: this.facet.isSortedBy(criterion) }, criterion)));
  }
  onFacetSortChange(e) {
    const select = e.composedPath()[0];
    const criterion = select.value;
    this.facet.sortBy(criterion);
  }
  get showMoreButton() {
    if (!this.state.canShowMoreValues) {
      return null;
    }
    return (h("button", { onClick: () => this.facet.showMoreValues() }, "show more"));
  }
  get showLessButton() {
    if (!this.state.canShowLessValues) {
      return null;
    }
    return (h("button", { onClick: () => this.facet.showLessValues() }, "show less"));
  }
  render() {
    return (h("div", null, h("div", null, h("span", null, this.label), this.sortSelector, this.resetButton), h("div", null, this.facetSearchInput, this.facetSearchResults, this.showMoreSearchResults), h("div", null, this.values), h("div", null, this.showMoreButton, this.showLessButton)));
  }
};
__decorate([
  Initialization()
], AtomicFacet.prototype, "initialize", null);
AtomicFacet.style = atomicFacetCss;

export { AtomicFacet as atomic_facet };

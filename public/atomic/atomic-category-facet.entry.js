import { r as registerInstance, h } from './index-1c54a593.js';
import { k as kc } from './headless.esm-6bb95796.js';
import { I as Initialization } from './initialization-utils-bcbcd4a6.js';

const atomicCategoryFacetCss = ":host{display:block}";

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
const AtomicCategoryFacet = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.facetId = '';
    this.field = '';
    this.label = 'No label';
    this.unsubscribe = () => { };
    this.handleSelect = (event) => {
      const target = event.target;
      const criterion = target.value;
      this.categoryFacet.sortBy(criterion);
    };
  }
  initialize() {
    const options = {
      facetId: this.facetId,
      field: this.field,
      delimitingCharacter: ';',
    };
    this.categoryFacet = kc(this.engine, { options });
    this.facetId = this.categoryFacet.state.facetId;
    this.subscribe();
  }
  subscribe() {
    this.unsubscribe = this.categoryFacet.subscribe(() => this.updateState());
  }
  connectedCallback() {
    this.categoryFacet && this.subscribe();
  }
  disconnectedCallback() {
    this.unsubscribe();
  }
  updateState() {
    this.state = this.categoryFacet.state;
  }
  get parents() {
    const parents = this.state.parents;
    return parents.map((parent, i) => {
      const isLast = i === parents.length - 1;
      return this.buildParent(parent, isLast);
    });
  }
  buildParent(parent, isLast) {
    return (h("div", { onClick: () => !isLast && this.categoryFacet.toggleSelect(parent) }, h("b", null, parent.value)));
  }
  get values() {
    return this.state.values.map((value) => this.buildValue(value));
  }
  buildValue(item) {
    return (h("div", { onClick: () => this.categoryFacet.toggleSelect(item) }, h("span", null, item.value, " ", item.numberOfResults)));
  }
  get facetSearchInput() {
    return h("input", { onInput: (e) => this.onFacetSearch(e) });
  }
  onFacetSearch(e) {
    const value = e.target.value;
    const facetSearch = this.categoryFacet.facetSearch;
    facetSearch.updateText(value);
    facetSearch.search();
  }
  get facetSearchResults() {
    return this.state.facetSearch.values.map((searchResult) => (h("div", { onClick: () => this.categoryFacet.facetSearch.select(searchResult) }, searchResult.displayValue, " ", searchResult.count)));
  }
  get showMoreSearchResults() {
    if (!this.state.facetSearch.moreValuesAvailable) {
      return null;
    }
    return (h("button", { onClick: () => this.categoryFacet.facetSearch.showMoreResults() }, "show more"));
  }
  get resetButton() {
    if (!this.state.hasActiveValues) {
      return null;
    }
    return (h("button", { onClick: () => this.categoryFacet.deselectAll() }, "All Categories"));
  }
  get sortOptions() {
    const criteria = [
      'occurrences',
      'alphanumeric',
    ];
    return criteria.map((criterion) => (h("option", { value: criterion, selected: this.categoryFacet.isSortedBy(criterion) }, criterion)));
  }
  get showMore() {
    if (!this.state.canShowMoreValues) {
      return null;
    }
    return (h("button", { onClick: () => this.categoryFacet.showMoreValues() }, "Show More"));
  }
  get showLess() {
    if (!this.state.canShowLessValues) {
      return null;
    }
    return (h("button", { onClick: () => this.categoryFacet.showLessValues() }, "Show Less"));
  }
  render() {
    return (h("div", null, h("div", null, h("span", null, this.label), h("select", { onInput: this.handleSelect }, this.sortOptions)), h("div", null, this.facetSearchInput, this.facetSearchResults, this.showMoreSearchResults), h("div", null, h("div", null, this.resetButton), h("div", null, this.parents), h("div", null, this.values), h("div", null, this.showMore), h("div", null, this.showLess))));
  }
};
__decorate([
  Initialization()
], AtomicCategoryFacet.prototype, "initialize", null);
AtomicCategoryFacet.style = atomicCategoryFacetCss;

export { AtomicCategoryFacet as atomic_category_facet };

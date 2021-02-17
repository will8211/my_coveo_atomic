import { r as registerInstance, f as createEvent, h } from './index-3acbf9e0.js';

const FacetSearch = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.resultSelected = createEvent(this, "resultSelected", 7);
    this.showMoreResults = createEvent(this, "showMoreResults", 7);
    this.facetSearch = createEvent(this, "facetSearch", 7);
  }
  get facetSearchInput() {
    return (h("input", { onInput: (e) => this.facetSearch.emit(e.target.value), class: "apply-border-on-background-variant w-full rounded" }));
  }
  get facetSearchResultList() {
    return this.facetSearchResults.map((searchResult) => (h("div", { onClick: () => this.resultSelected.emit(searchResult) }, searchResult.displayValue, " ", searchResult.count)));
  }
  get showMoreSearchResults() {
    if (!this.moreValuesAvailable) {
      return null;
    }
    return (h("button", { onClick: () => this.showMoreResults.emit() }, "show more"));
  }
  render() {
    return (h("div", null, this.facetSearchInput, this.facetSearchResultList, this.showMoreSearchResults));
  }
};

export { FacetSearch as facet_search };

import { r as registerInstance, f as createEvent, h } from './index-3acbf9e0.js';
import { r as randomID } from './utils-82f7d421.js';

const FacetValue = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.facetValueSelected = createEvent(this, "facetValueSelected", 7);
  }
  render() {
    const id = randomID('input');
    return (h("li", { role: "option", class: "flex flex-row items-center mt-2 cursor-pointer text-base" }, h("input", { type: "checkbox", checked: this.isSelected, class: "facet-value-checkbox w-5 h-5", id: id, name: id, onClick: () => this.facetValueSelected.emit() }), h("label", { htmlFor: id, class: "ml-3 flex flex-row text-on-background flex-grow cursor-pointer" }, this.label, h("span", { class: "ml-auto self-end text-on-background-variant" }, this.numberOfResults))));
  }
};

export { FacetValue as facet_value };

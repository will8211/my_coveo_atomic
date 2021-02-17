import { r as registerInstance, h } from './index-3acbf9e0.js';
import { h as hl } from './headless.esm-fb41148c.js';
import { I as InitializeBindings, B as BindStateToController } from './initialization-utils-bdb93b26.js';

const mainclear = `<svg focusable="false" enable-background="new 0 0 13 13" viewBox="0 0 13 13"
    xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Clear">
    <title>Clear</title>
    <g fill="currentColor">
        <path d="m7.881 6.501 4.834-4.834c.38-.38.38-1.001 0-1.381s-1.001-.38-1.381 0l-4.834 4.834-4.834-4.835c-.38-.38-1.001-.38-1.381 0s-.38 1.001 0 1.381l4.834 4.834-4.834 4.834c-.38.38-.38 1.001 0 1.381s1.001.38 1.381 0l4.834-4.834 4.834 4.834c.38.38 1.001.38 1.381 0s .38-1.001 0-1.381z"/>
    </g>
</svg>`;

const atomicBreadcrumbManagerCss = ":host{display:block;font-family:Lato, Helvetica Neue, Helvetica, Arial, sans-serif, sans-serif}.focus-within\\:rounded-b-none:focus-within{border-bottom-right-radius:0px;border-bottom-left-radius:0px;border-top-left-radius:0.25rem;border-top-right-radius:0.25rem}.apply-border-on-background{border-color:var(--atomic-on-background, #282829);border-style:solid;border-width:1px}.apply-border-on-background-variant{border-color:var(--atomic-on-background-variant, #6b6b6b);border-style:solid;border-width:1px}svg{width:9px;height:9px}";

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
const AtomicBreadcrumbManager = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.collapsedBreadcrumbsState = [];
    this.collapseThreshold = 5;
    this.categoryDivider = '/';
  }
  initialize() {
    this.breadcrumbManager = hl(this.bindings.engine);
  }
  get facetBreadcrumbs() {
    return this.breadcrumbManagerState.facetBreadcrumbs.map((breadcrumb) => {
      const breadcrumbsValues = this.getBreadrumbValues(breadcrumb);
      return (h("ul", { part: "breadcrumbs" }, h("li", { part: "breadcrumb-label" }, breadcrumb.field, ":\u00A0"), breadcrumbsValues));
    });
  }
  getBreadrumbValues(breadcrumb) {
    const { breadcrumbsToShow, moreButton } = this.collapsedBreadcrumbsHandler(breadcrumb);
    const renderedBreadcrumbs = breadcrumbsToShow.map((breadcrumbValue) => (h("li", { part: "breadcrumb-value" }, h("button", { part: "breadcrumb-button", "aria-label": `Remove inclusion filter on ${breadcrumbValue.value.value}`, onClick: () => this.breadcrumbManager.deselectBreadcrumb(breadcrumbValue) }, breadcrumbValue.value.value, this.mainClear))));
    return moreButton
      ? [...renderedBreadcrumbs, moreButton]
      : renderedBreadcrumbs;
  }
  get numericFacetBreadcrumbs() {
    return this.breadcrumbManagerState.numericFacetBreadcrumbs.map((breadcrumb) => {
      const breadcrumbsValues = this.getRangeBreadrumbValues(breadcrumb, false);
      return (h("ul", { part: "breadcrumbs" }, h("li", { part: "breadcrumb-label" }, breadcrumb.field, ":\u00A0"), breadcrumbsValues));
    });
  }
  get dateFacetBreadcrumbs() {
    return this.breadcrumbManagerState.dateFacetBreadcrumbs.map((breadcrumb) => {
      const breadcrumbsValues = this.getRangeBreadrumbValues(breadcrumb, true);
      return (h("ul", { part: "breadcrumbs" }, h("li", { part: "breadcrumb-label" }, breadcrumb.field, ":\u00A0"), breadcrumbsValues));
    });
  }
  getRangeBreadrumbValues(values, needDateFormatting) {
    const { breadcrumbsToShow, moreButton } = this.collapsedBreadcrumbsHandler(values);
    const renderedBreadcrumbs = breadcrumbsToShow.map((breadcrumbValue) => {
      const ariaLabel = this.getRangeAriaLabel(needDateFormatting, breadcrumbValue.value);
      return (h("li", { part: "breadcrumb-value" }, h("button", { part: "breadcrumb-button", "aria-label": ariaLabel, onClick: () => this.breadcrumbManager.deselectBreadcrumb(breadcrumbValue) }, breadcrumbValue.value.start, " - ", breadcrumbValue.value.end, this.mainClear)));
    });
    return moreButton
      ? [...renderedBreadcrumbs, moreButton]
      : renderedBreadcrumbs;
  }
  get categoryFacetBreadcrumbs() {
    return this.breadcrumbManagerState.categoryFacetBreadcrumbs.map((breadcrumb) => {
      const breadcrumbsValues = this.getCategoryBreadrumbValues(breadcrumb);
      return (h("ul", { part: "breadcrumbs" }, h("li", { part: "breadcrumb-label" }, breadcrumb.field, ":\u00A0"), breadcrumbsValues));
    });
  }
  getCategoryBreadrumbValues(values) {
    const breadcrumbsToShow = this.categoryCollapsedBreadcrumbsHandler(values);
    const ariaLabel = breadcrumbsToShow.join('/');
    const joinedBreadcrumbs = breadcrumbsToShow.join(` ${this.categoryDivider} `);
    return (h("li", { part: "breadcrumb-value category-breadcrumb-value" }, h("button", { part: "breadcrumb-button", "aria-label": `Remove inclusion filter on ${ariaLabel}`, onClick: () => this.breadcrumbManager.deselectBreadcrumb(values) }, joinedBreadcrumbs, this.mainClear)));
  }
  getClearAllFiltersButton() {
    return (h("button", { part: "breadcrumb-button", onClick: () => this.breadcrumbManager.deselectAll() }, "Clear All Filters"));
  }
  showFacetCollapsedBreadcrumbs(field) {
    this.collapsedBreadcrumbsState.push(field);
    this.collapsedBreadcrumbsState = [...this.collapsedBreadcrumbsState];
  }
  collapsedBreadcrumbsHandler(breadcrumb) {
    if (this.collapsedBreadcrumbsState.indexOf(breadcrumb.field) !== -1) {
      const breadcrumbsToShow = breadcrumb.values;
      this.resetCollapsedBreadcrumbs(breadcrumbsToShow.length, breadcrumb.field);
      return { breadcrumbsToShow, moreButton: undefined };
    }
    return {
      breadcrumbsToShow: breadcrumb.values.slice(0, this.collapseThreshold),
      moreButton: this.getMoreButton(breadcrumb.values.length - this.collapseThreshold, breadcrumb.field),
    };
  }
  categoryCollapsedBreadcrumbsHandler(breadcrumb) {
    if (breadcrumb.path.length <= 3) {
      return breadcrumb.path.map((breadcrumb) => breadcrumb.value);
    }
    const collapsed = '...';
    const firstBreadcrumbValue = breadcrumb.path[0].value;
    const lastTwoBreadcrumbsValues = breadcrumb.path
      .slice(-2)
      .map((breadcrumb) => breadcrumb.value);
    return [firstBreadcrumbValue, collapsed, ...lastTwoBreadcrumbsValues];
  }
  getMoreButton(collapsedBreadcrumbNumber, field) {
    if (collapsedBreadcrumbNumber <= 0)
      return undefined;
    return (h("li", { part: "breadcrumb-value" }, h("button", { part: "breadcrumb-button", "aria-label": `Show ${collapsedBreadcrumbNumber} more ${collapsedBreadcrumbNumber > 1 ? 'filters' : 'filter'}`, onClick: () => this.showFacetCollapsedBreadcrumbs(field) }, collapsedBreadcrumbNumber, " more...")));
  }
  get mainClear() {
    return h("span", { role: "button", innerHTML: mainclear });
  }
  resetCollapsedBreadcrumbs(length, field) {
    length <= this.collapseThreshold
      ? this.collapsedBreadcrumbsState.splice(this.collapsedBreadcrumbsState.indexOf(field), 1)
      : null;
  }
  getRangeAriaLabel(needDateFormatting, breadcrumbValue) {
    if (needDateFormatting) {
      const dateStart = new Date(breadcrumbValue.start);
      const dateEnd = new Date(breadcrumbValue.end);
      return `Remove inclusion filter on ${dateStart.toLocaleString()} to ${dateEnd.toLocaleString()}`;
    }
    return `Remove inclusion filter on ${breadcrumbValue.start} to ${breadcrumbValue.end}`;
  }
  render() {
    if (!this.breadcrumbManager.state.hasBreadcrumbs) {
      return;
    }
    return (h("div", null, h("span", null, this.facetBreadcrumbs, this.numericFacetBreadcrumbs, this.dateFacetBreadcrumbs, this.categoryFacetBreadcrumbs), h("span", null, this.getClearAllFiltersButton())));
  }
};
__decorate([
  InitializeBindings()
], AtomicBreadcrumbManager.prototype, "bindings", void 0);
__decorate([
  BindStateToController('breadcrumbManager')
], AtomicBreadcrumbManager.prototype, "breadcrumbManagerState", void 0);
AtomicBreadcrumbManager.style = atomicBreadcrumbManagerCss;

export { AtomicBreadcrumbManager as atomic_breadcrumb_manager };

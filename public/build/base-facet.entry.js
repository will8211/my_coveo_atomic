import { r as registerInstance, f as createEvent, h } from './index-3acbf9e0.js';

const CloseIcon = `<svg viewBox="0 0 22 22"><g transform="matrix(.7071 -.7071 .7071 .7071 -3.142 11)"><path d="m9-3.4h2v26.9h-2z"/><path d="m-3.4 9h26.9v2h-26.9z"/></g></svg>`;

const baseFacetCss = ":host{display:block;font-family:Lato, Helvetica Neue, Helvetica, Arial, sans-serif, sans-serif}.focus-within\\:rounded-b-none:focus-within{border-bottom-right-radius:0px;border-bottom-left-radius:0px;border-top-left-radius:0.25rem;border-top-right-radius:0.25rem}.apply-border-on-background{border-color:var(--atomic-on-background, #282829);border-style:solid;border-width:1px}.apply-border-on-background-variant{border-color:var(--atomic-on-background-variant, #6b6b6b);border-style:solid;border-width:1px}.content{z-index:1000}.facet-button{border-radius:var(--facet-button-radius, 30px)}";

const BaseFacet = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.deselectAll = createEvent(this, "deselectAll", 7);
    this.isExpanded = false;
  }
  openModal() {
    this.isExpanded = true;
    document.body.classList.add('overflow-hidden');
  }
  closeModal() {
    this.isExpanded = false;
    document.body.classList.remove('overflow-hidden');
  }
  get closeButton() {
    return this.isExpanded ? (h("button", { onClick: () => this.closeModal(), class: "ml-2" }, h("div", { class: "h-4 w-4 text-on-background fill-current", innerHTML: CloseIcon }))) : null;
  }
  get resetButton() {
    return this.hasActiveValues ? (h("button", { onClick: () => this.deselectAll.emit(), class: "block text-primary mr-2 lg:mr-0 text-sm" }, "Clear")) : null;
  }
  render() {
    return (h("div", { class: "facet", part: "facet" }, h("button", { class: 'facet-button border-solid bg-transparent  px-4 h-9 outline-none focus:outline-none lg:hidden cursor-pointer ' +
        (this.hasActiveValues
          ? 'border-2 border-primary text-primary'
          : 'border border-divider text-on-background-variant'), onClick: () => this.openModal() }, this.label), h("div", { class: 'content box-border  lg:block h-screen w-screen lg:h-auto lg:w-auto fixed object-left-top bg-white top-0 left-0 lg:static p-3 ' +
        (this.isExpanded ? 'block' : 'hidden') }, h("div", { class: "flex flex-row items-center pb-2 mb-2 border-b border-solid border-on-background" }, h("span", { class: "font-semibold text-on-background text-sm" }, this.label), h("span", { class: "flex flex-row block ml-auto" }, this.resetButton, this.closeButton)), h("slot", null))));
  }
};
BaseFacet.style = baseFacetCss;

export { BaseFacet as base_facet };

import { r as registerInstance, h } from './index-1c54a593.js';
import { m as mu } from './headless.esm-6bb95796.js';
import { I as Initialization } from './initialization-utils-bcbcd4a6.js';

const atomicPagerCss = "@charset \"UTF-8\";:host{display:block;font-family:var(--bs-font-sans-serif);font-size:1rem;font-weight:400;line-height:1.5;color:#212529;background-color:#fff;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0, 0, 0, 0)}*,*::before,*::after{box-sizing:border-box}@media (prefers-reduced-motion: no-preference){:root{scroll-behavior:smooth}}body{margin:0;font-family:var(--bs-font-sans-serif);font-size:1rem;font-weight:400;line-height:1.5;color:#212529;background-color:#fff;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0, 0, 0, 0)}[tabindex=\"-1\"]:focus:not(:focus-visible){outline:0 !important}hr{margin:1rem 0;color:inherit;background-color:currentColor;border:0;opacity:0.25}hr:not([size]){height:1px}h6,.h6,h5,.h5,h4,.h4,h3,.h3,h2,.h2,h1,.h1{margin-top:0;margin-bottom:0.5rem;font-weight:500;line-height:1.2}h1,.h1{font-size:calc(1.375rem + 1.5vw)}@media (min-width: 1200px){h1,.h1{font-size:2.5rem}}h2,.h2{font-size:calc(1.325rem + 0.9vw)}@media (min-width: 1200px){h2,.h2{font-size:2rem}}h3,.h3{font-size:calc(1.3rem + 0.6vw)}@media (min-width: 1200px){h3,.h3{font-size:1.75rem}}h4,.h4{font-size:calc(1.275rem + 0.3vw)}@media (min-width: 1200px){h4,.h4{font-size:1.5rem}}h5,.h5{font-size:1.25rem}h6,.h6{font-size:1rem}p{margin-top:0;margin-bottom:1rem}abbr[title],abbr[data-original-title]{text-decoration:underline;text-decoration:underline dotted;cursor:help;text-decoration-skip-ink:none}address{margin-bottom:1rem;font-style:normal;line-height:inherit}ol,ul{padding-left:2rem}ol,ul,dl{margin-top:0;margin-bottom:1rem}ol ol,ul ul,ol ul,ul ol{margin-bottom:0}dt{font-weight:700}dd{margin-bottom:0.5rem;margin-left:0}blockquote{margin:0 0 1rem}b,strong{font-weight:bolder}small,.small{font-size:0.875em}mark,.mark{padding:0.2em;background-color:#fcf8e3}sub,sup{position:relative;font-size:0.75em;line-height:0;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}a{color:#0d6efd;text-decoration:underline}a:hover{color:#0a58ca}a:not([href]):not([class]),a:not([href]):not([class]):hover{color:inherit;text-decoration:none}pre,code,kbd,samp{font-family:var(--bs-font-monospace);font-size:1em}pre{display:block;margin-top:0;margin-bottom:1rem;overflow:auto;font-size:0.875em}pre code{font-size:inherit;color:inherit;word-break:normal}code{font-size:0.875em;color:#d63384;word-wrap:break-word}a>code{color:inherit}kbd{padding:0.2rem 0.4rem;font-size:0.875em;color:#fff;background-color:#212529;border-radius:0.2rem}kbd kbd{padding:0;font-size:1em;font-weight:700}figure{margin:0 0 1rem}img,svg{vertical-align:middle}table{caption-side:bottom;border-collapse:collapse}caption{padding-top:0.5rem;padding-bottom:0.5rem;color:#6c757d;text-align:left}th{text-align:inherit;text-align:-webkit-match-parent}thead,tbody,tfoot,tr,td,th{border-color:inherit;border-style:solid;border-width:0}label{display:inline-block}button{border-radius:0}button:focus{outline:dotted 1px;outline:-webkit-focus-ring-color auto 5px}input,button,select,optgroup,textarea{margin:0;font-family:inherit;font-size:inherit;line-height:inherit}button,select{text-transform:none}[role=button]{cursor:pointer}select{word-wrap:normal}[list]::-webkit-calendar-picker-indicator{display:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button}button:not(:disabled),[type=button]:not(:disabled),[type=reset]:not(:disabled),[type=submit]:not(:disabled){cursor:pointer}::-moz-focus-inner{padding:0;border-style:none}textarea{resize:vertical}fieldset{min-width:0;padding:0;margin:0;border:0}legend{float:left;width:100%;padding:0;margin-bottom:0.5rem;font-size:calc(1.275rem + 0.3vw);line-height:inherit}@media (min-width: 1200px){legend{font-size:1.5rem}}legend+*{clear:left}::-webkit-datetime-edit-fields-wrapper,::-webkit-datetime-edit-text,::-webkit-datetime-edit-minute,::-webkit-datetime-edit-hour-field,::-webkit-datetime-edit-day-field,::-webkit-datetime-edit-month-field,::-webkit-datetime-edit-year-field{padding:0}::-webkit-inner-spin-button{height:auto}[type=search]{outline-offset:-2px;-webkit-appearance:textfield}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-color-swatch-wrapper{padding:0}::file-selector-button{font:inherit}::-webkit-file-upload-button{font:inherit;-webkit-appearance:button}output{display:inline-block}iframe{border:0}summary{display:list-item;cursor:pointer}progress{vertical-align:baseline}[hidden]{display:none !important}.clearfix::after{display:block;clear:both;content:\"\"}.link-primary{color:#0d6efd}.link-primary:hover,.link-primary:focus{color:#0a58ca}.link-secondary{color:#6c757d}.link-secondary:hover,.link-secondary:focus{color:#565e64}.link-success{color:#198754}.link-success:hover,.link-success:focus{color:#146c43}.link-info{color:#0dcaf0}.link-info:hover,.link-info:focus{color:#3dd5f3}.link-warning{color:#ffc107}.link-warning:hover,.link-warning:focus{color:#ffcd39}.link-danger{color:#dc3545}.link-danger:hover,.link-danger:focus{color:#b02a37}.link-light{color:#f8f9fa}.link-light:hover,.link-light:focus{color:#f9fafb}.link-dark{color:#212529}.link-dark:hover,.link-dark:focus{color:#1a1e21}.ratio{position:relative;width:100%}.ratio::before{display:block;padding-top:var(--aspect-ratio);content:\"\"}.ratio>*{position:absolute;top:0;left:0;width:100%;height:100%}.ratio-1x1{--aspect-ratio:100%}.ratio-4x3{--aspect-ratio:calc(3 / 4 * 100%)}.ratio-16x9{--aspect-ratio:calc(9 / 16 * 100%)}.ratio-21x9{--aspect-ratio:calc(9 / 21 * 100%)}.fixed-top{position:fixed;top:0;right:0;left:0;z-index:1030}.fixed-bottom{position:fixed;right:0;bottom:0;left:0;z-index:1030}.sticky-top{position:sticky;top:0;z-index:1020}@media (min-width: 576px){.sticky-sm-top{position:sticky;top:0;z-index:1020}}@media (min-width: 768px){.sticky-md-top{position:sticky;top:0;z-index:1020}}@media (min-width: 992px){.sticky-lg-top{position:sticky;top:0;z-index:1020}}@media (min-width: 1200px){.sticky-xl-top{position:sticky;top:0;z-index:1020}}@media (min-width: 1400px){.sticky-xxl-top{position:sticky;top:0;z-index:1020}}.visually-hidden,.visually-hidden-focusable:not(:focus){position:absolute !important;width:1px !important;height:1px !important;padding:0 !important;margin:-1px !important;overflow:hidden !important;clip:rect(0, 0, 0, 0) !important;white-space:nowrap !important;border:0 !important}.stretched-link::after{position:absolute;top:0;right:0;bottom:0;left:0;z-index:1;content:\"\"}.text-truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.lead{font-size:1.25rem;font-weight:300}.display-1{font-size:calc(1.625rem + 4.5vw);font-weight:300;line-height:1.2}@media (min-width: 1200px){.display-1{font-size:5rem}}.display-2{font-size:calc(1.575rem + 3.9vw);font-weight:300;line-height:1.2}@media (min-width: 1200px){.display-2{font-size:4.5rem}}.display-3{font-size:calc(1.525rem + 3.3vw);font-weight:300;line-height:1.2}@media (min-width: 1200px){.display-3{font-size:4rem}}.display-4{font-size:calc(1.475rem + 2.7vw);font-weight:300;line-height:1.2}@media (min-width: 1200px){.display-4{font-size:3.5rem}}.display-5{font-size:calc(1.425rem + 2.1vw);font-weight:300;line-height:1.2}@media (min-width: 1200px){.display-5{font-size:3rem}}.display-6{font-size:calc(1.375rem + 1.5vw);font-weight:300;line-height:1.2}@media (min-width: 1200px){.display-6{font-size:2.5rem}}.list-unstyled{padding-left:0;list-style:none}.list-inline{padding-left:0;list-style:none}.list-inline-item{display:inline-block}.list-inline-item:not(:last-child){margin-right:0.5rem}.initialism{font-size:0.875em;text-transform:uppercase}.blockquote{margin-bottom:1rem;font-size:1.25rem}.blockquote>:last-child{margin-bottom:0}.blockquote-footer{margin-top:-1rem;margin-bottom:1rem;font-size:0.875em;color:#6c757d}.blockquote-footer::before{content:\"— \"}.pagination{display:flex;padding-left:0;list-style:none}.page-link{position:relative;display:block;color:var(--atomic-pagination-active-color, #0d6efd);text-decoration:none;background-color:#fff;border:1px solid var(--atomic-pagination-border-color, #dee2e6);transition:color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out}@media (prefers-reduced-motion: reduce){.page-link{transition:none}}.page-link:hover{z-index:2;color:var(--atomic-pagination-active-color, #0a58ca);background-color:#e9ecef;border-color:var(--atomic-pagination-border-color, #dee2e6)}.page-link:focus{z-index:3;color:var(--atomic-pagination-active-color, #0a58ca);background-color:#e9ecef;outline:0;box-shadow:0 0 0 0.25rem rgba(13, 110, 253, 0.25)}.page-item:not(:first-child) .page-link{margin-left:-1px}.page-item.active .page-link{z-index:3;color:#fff;background-color:var(--atomic-pagination-active-color, #0d6efd);border-color:var(--atomic-pagination-active-color, #0d6efd)}.page-item.disabled .page-link{color:#6c757d;pointer-events:none;background-color:#fff;border-color:#dee2e6}.page-link{padding:0.375rem 0.75rem}.page-item:first-child .page-link{border-top-left-radius:var(--atomic-border-radius, 0.25rem);border-bottom-left-radius:var(--atomic-border-radius, 0.25rem)}.page-item:last-child .page-link{border-top-right-radius:var(--atomic-border-radius, 0.25rem);border-bottom-right-radius:var(--atomic-border-radius, 0.25rem)}.pagination-lg .page-link{padding:0.75rem 1.5rem;font-size:1.25rem}.pagination-lg .page-item:first-child .page-link{border-top-left-radius:0.3rem;border-bottom-left-radius:0.3rem}.pagination-lg .page-item:last-child .page-link{border-top-right-radius:0.3rem;border-bottom-right-radius:0.3rem}.pagination-sm .page-link{padding:0.25rem 0.5rem;font-size:0.875rem}.pagination-sm .page-item:first-child .page-link{border-top-left-radius:0.2rem;border-bottom-left-radius:0.2rem}.pagination-sm .page-item:last-child .page-link{border-top-right-radius:0.2rem;border-bottom-right-radius:0.2rem}";

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
const AtomicPager = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.unsubscribe = () => { };
  }
  initialize() {
    this.pager = mu(this.engine);
    this.unsubscribe = this.pager.subscribe(() => this.updateState());
  }
  disconnectedCallback() {
    this.unsubscribe();
  }
  updateState() {
    this.state = this.pager.state;
  }
  get backButton() {
    if (!this.state.hasPreviousPage) {
      return null;
    }
    const icon = '<';
    return (h("li", { class: "page-item" }, h("button", { part: "back-button", class: "page-link", "aria-label": "Previous page", onClick: () => {
        this.pager.previousPage();
      } }, h("slot", { name: "back-button" }, icon))));
  }
  get nextButton() {
    if (!this.state.hasNextPage) {
      return null;
    }
    const icon = '>';
    return (h("li", { class: "page-item" }, h("button", { part: "next-button", class: "page-link", "aria-label": "Next page", onClick: () => {
        this.pager.nextPage();
      } }, h("slot", { name: "next-button" }, icon))));
  }
  get pages() {
    const pages = this.pager.state.currentPages;
    return pages.map((page) => this.buildPage(page));
  }
  buildPage(page) {
    const isSelected = this.pager.isCurrentPage(page);
    const className = isSelected ? 'active' : '';
    return (h("li", { class: `page-item ${className}` }, h("button", { part: `page-button ${isSelected && 'active-page-button'}`, class: "page-link", "aria-label": `Page ${page}`, onClick: () => {
        this.pager.selectPage(page);
      } }, page)));
  }
  render() {
    return (h("nav", { "aria-label": "Pager" }, h("ul", { class: "pagination mb-0", part: "list" }, this.backButton, this.pages, this.nextButton)));
  }
};
__decorate([
  Initialization()
], AtomicPager.prototype, "initialize", null);
AtomicPager.style = atomicPagerCss;

export { AtomicPager as atomic_pager };

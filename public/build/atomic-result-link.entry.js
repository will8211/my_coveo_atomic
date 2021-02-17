import { r as registerInstance, h } from './index-3acbf9e0.js';
import { R as ResultContext, a as ResultContextRenderer } from './result-template-decorators-403b70fb.js';

const atomicResultLinkCss = ":host{display:block;font-family:Lato, Helvetica Neue, Helvetica, Arial, sans-serif, sans-serif}.focus-within\\:rounded-b-none:focus-within{border-bottom-right-radius:0px;border-bottom-left-radius:0px;border-top-left-radius:0.25rem;border-top-right-radius:0.25rem}.apply-border-on-background{border-color:var(--atomic-on-background, #282829);border-style:solid;border-width:1px}.apply-border-on-background-variant{border-color:var(--atomic-on-background-variant, #6b6b6b);border-style:solid;border-width:1px}a,a:hover{color:inherit;text-decoration:inherit}";

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
const AtomicResultValue = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h("a", { href: this.result.clickUri }, h("slot", null, h("h3", null, this.result.title))));
  }
};
__decorate([
  ResultContext()
], AtomicResultValue.prototype, "result", void 0);
__decorate([
  ResultContextRenderer
], AtomicResultValue.prototype, "render", null);
AtomicResultValue.style = atomicResultLinkCss;

export { AtomicResultValue as atomic_result_link };

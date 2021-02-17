import { r as registerInstance, g as getElement } from './index-3acbf9e0.js';
import { x as xd } from './headless.esm-fb41148c.js';
import { R as ResultContext, a as ResultContextRenderer } from './result-template-decorators-403b70fb.js';

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
    this.value = '';
  }
  render() {
    const resultValue = xd.getResultProperty(this.result, this.value);
    if (resultValue !== null) {
      return resultValue;
    }
    this.host.remove();
  }
  get host() { return getElement(this); }
};
__decorate([
  ResultContext()
], AtomicResultValue.prototype, "result", void 0);
__decorate([
  ResultContextRenderer
], AtomicResultValue.prototype, "render", null);

export { AtomicResultValue as atomic_result_value };

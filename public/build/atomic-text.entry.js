import { r as registerInstance } from './index-3acbf9e0.js';
import { I as InitializeBindings, a as BindStateToI18n } from './initialization-utils-bdb93b26.js';

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
const AtomicText = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.strings = {
      value: () => this.bindings.i18n.t(this.value, {
        count: this.count,
      }),
    };
  }
  connectedCallback() {
    if (!this.value) {
      this.error = new Error('The "value" attribute must be defined.');
    }
  }
  render() {
    return this.strings.value();
  }
};
__decorate([
  InitializeBindings()
], AtomicText.prototype, "bindings", void 0);
__decorate([
  BindStateToI18n()
], AtomicText.prototype, "strings", void 0);

export { AtomicText as atomic_text };

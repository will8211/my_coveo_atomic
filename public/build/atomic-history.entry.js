import { r as registerInstance, h } from './index-3acbf9e0.js';
import { d as hu } from './headless.esm-fb41148c.js';
import { I as InitializeBindings, B as BindStateToController } from './initialization-utils-bdb93b26.js';

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
const AtomicHistory = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  initialize() {
    this.history = hu(this.bindings.engine);
  }
  back() {
    this.history.back();
  }
  forward() {
    this.history.forward();
  }
  render() {
    return (h("div", null, h("button", { disabled: !this.historyState.past.length, onClick: () => this.back() }, "Back"), h("button", { disabled: !this.historyState.future.length, onClick: () => this.forward() }, "Forward")));
  }
};
__decorate([
  InitializeBindings()
], AtomicHistory.prototype, "bindings", void 0);
__decorate([
  BindStateToController('history')
], AtomicHistory.prototype, "historyState", void 0);

export { AtomicHistory as atomic_history };

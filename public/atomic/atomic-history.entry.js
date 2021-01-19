import { r as registerInstance, h } from './index-1c54a593.js';
import { o as ou } from './headless.esm-6bb95796.js';
import { I as Initialization } from './initialization-utils-bcbcd4a6.js';

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
    this.unsubscribe = () => { };
  }
  initialize() {
    this.history = ou(this.engine);
    this.unsubscribe = this.history.subscribe(() => this.updateState());
  }
  disconnectedCallback() {
    this.unsubscribe();
  }
  updateState() {
    this.state = this.history.state;
  }
  back() {
    this.history.back();
  }
  forward() {
    this.history.forward();
  }
  render() {
    return (h("div", null, h("button", { onClick: () => this.back() }, "BACK"), h("button", { onClick: () => this.forward() }, "FORWARD")));
  }
};
__decorate([
  Initialization()
], AtomicHistory.prototype, "initialize", null);

export { AtomicHistory as atomic_history };

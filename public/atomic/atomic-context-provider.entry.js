import { r as registerInstance } from './index-1c54a593.js';
import { i as ic } from './headless.esm-6bb95796.js';
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
const AtomicContextProvider = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.context = '{}';
  }
  initialize() {
    const context = ic(this.engine);
    const contextObject = JSON.parse(this.context);
    context.set(contextObject);
  }
};
__decorate([
  Initialization()
], AtomicContextProvider.prototype, "initialize", null);

export { AtomicContextProvider as atomic_context_provider };

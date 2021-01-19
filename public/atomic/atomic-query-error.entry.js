import { r as registerInstance, h } from './index-1c54a593.js';
import { v as vu } from './headless.esm-6bb95796.js';
import { I as Initialization } from './initialization-utils-bcbcd4a6.js';

const atomicQueryErrorCss = "";

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
const AtomicQueryError = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.unsubscribe = () => { };
  }
  initialize() {
    this.queryError = vu(this.engine);
    this.unsubscribe = this.queryError.subscribe(() => this.updateState());
  }
  disconnectedCallback() {
    this.unsubscribe();
  }
  updateState() {
    this.state = this.queryError.state;
  }
  get results() {
    var _a;
    return this.state.hasError ? (h("div", null, h("div", null, "Oops ", (_a = this.state.error) === null || _a === void 0 ? void 0 :
      _a.message), h("code", null, JSON.stringify(this.state.error)))) : ('');
  }
  render() {
    return this.results;
  }
};
__decorate([
  Initialization()
], AtomicQueryError.prototype, "initialize", null);
AtomicQueryError.style = atomicQueryErrorCss;

export { AtomicQueryError as atomic_query_error };

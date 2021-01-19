import { r as registerInstance, h } from './index-1c54a593.js';
import { a as ac } from './headless.esm-6bb95796.js';
import { I as Initialization } from './initialization-utils-bcbcd4a6.js';

const atomicDidYouMeanCss = ".bold{font-weight:bold}";

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
const AtomicDidYouMean = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.unsubscribe = () => { };
  }
  initialize() {
    this.didYouMean = ac(this.engine);
    this.unsubscribe = this.didYouMean.subscribe(() => this.updateState());
  }
  disconnectedCallback() {
    this.unsubscribe();
  }
  render() {
    if (!this.state.hasQueryCorrection) {
      return '';
    }
    if (this.state.wasAutomaticallyCorrected) {
      return [
        h("p", null, "No results for", ' ', h("b", null, this.state.queryCorrection.wordCorrections[0].originalWord)),
        h("p", null, "Query was automatically corrected to", ' ', h("b", null, this.state.wasCorrectedTo)),
      ];
    }
    return (h("button", { onClick: () => this.applyCorrection() }, "Did you mean: ", this.state.queryCorrection.correctedQuery, " ?"));
  }
  applyCorrection() {
    this.didYouMean.applyCorrection();
  }
  updateState() {
    this.state = this.didYouMean.state;
  }
};
__decorate([
  Initialization()
], AtomicDidYouMean.prototype, "initialize", null);
AtomicDidYouMean.style = atomicDidYouMeanCss;

export { AtomicDidYouMean as atomic_did_you_mean };

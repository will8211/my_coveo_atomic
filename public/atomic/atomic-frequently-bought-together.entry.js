import { r as registerInstance, h } from './index-1c54a593.js';
import { _ as _i, b as kn, d as cl } from './headless.esm-6bb95796.js';

const AtomicProductRecommendations = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.unsubscribe = () => { };
  }
  componentWillLoad() {
    const sampleConfiguration = _i.getSampleConfiguration();
    this.engine = new _i({
      configuration: Object.assign(Object.assign({}, sampleConfiguration), { search: Object.assign(Object.assign({}, sampleConfiguration.search), { searchHub: 'frequently_bought_recommendations' }) }),
      reducers: kn,
    });
    this.frequentlyBoughtTogether = cl(this.engine, {
      options: {
        sku: 'abc',
      },
    });
    this.unsubscribe = this.frequentlyBoughtTogether.subscribe(() => this.updateState());
    this.frequentlyBoughtTogether.refresh();
  }
  disconnectedCallback() {
    this.unsubscribe();
  }
  updateState() {
    this.state = this.frequentlyBoughtTogether.state;
  }
  render() {
    return (h("div", null, "FREQUENTLY BOUGHT TOGETHER:", h("ul", null, this.state.recommendations.map((p) => (h("li", null, p.name))))));
  }
};

export { AtomicProductRecommendations as atomic_frequently_bought_together };

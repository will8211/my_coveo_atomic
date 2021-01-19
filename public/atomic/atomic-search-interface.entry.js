import { r as registerInstance, h, g as getElement } from './index-1c54a593.js';
import { _ as _i, B as Bs, j as nd, l as ld, z as zd, w as wl, H as Hl } from './headless.esm-6bb95796.js';

const AtomicSearchInterface = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.sample = false;
    this.pipeline = 'default';
    this.searchHub = 'default';
    this.logLevel = 'info';
    this.unsubscribe = () => { };
    this.hangingComponentsInitialization = [];
    this.initialized = false;
  }
  componentWillLoad() {
    if (this.sample) {
      this.initialize(_i.getSampleConfiguration());
    }
  }
  disconnectedCallback() {
    this.unsubscribe();
  }
  async initialize(options) {
    if (this.initialized) {
      console.error('The atomic-search-interface component has already been initialized.', this.host, this);
      return;
    }
    this.initEngine(Object.assign(Object.assign({}, options), { search: {
        searchHub: this.searchHub,
        pipeline: this.pipeline,
      } }));
    this.initialized = true;
  }
  initEngine(config) {
    try {
      this.engine = new _i({
        configuration: config,
        reducers: Bs,
        loggerOptions: {
          level: this.logLevel,
        },
      });
    }
    catch (error) {
      this.error = error;
      return;
    }
    this.hangingComponentsInitialization.forEach((event) => event.detail(this.engine));
    this.hangingComponentsInitialization = [];
    // Waits until the fields are registered asynchronously before triggering a search
    setTimeout(() => {
      this.initSearchParameterManager();
      this.engine.dispatch(nd.executeSearch(ld.logInterfaceLoad()));
    }, 0);
  }
  initSearchParameterManager() {
    const stateWithoutHash = window.location.hash.slice(1);
    const decodedState = decodeURIComponent(stateWithoutHash);
    const { serialize, deserialize } = zd();
    const params = deserialize(decodedState);
    const manager = wl(this.engine, {
      initialState: { parameters: params },
    });
    this.unsubscribe = manager.subscribe(() => {
      window.location.hash = serialize(manager.state.parameters);
    });
  }
  updateSearchConfiguration() {
    var _a;
    (_a = this.engine) === null || _a === void 0 ? void 0 : _a.dispatch(Hl.updateSearchConfiguration({
      pipeline: this.pipeline,
      searchHub: this.searchHub,
    }));
  }
  handleInitialization(event) {
    event.stopPropagation();
    if (this.engine) {
      event.detail(this.engine);
      return;
    }
    this.hangingComponentsInitialization.push(event);
  }
  render() {
    if (this.error) {
      return (h("atomic-component-error", { error: this.error }));
    }
    if (!this.engine) {
      return;
    }
    return [
      h("atomic-relevance-inspector", { engine: this.engine }),
      h("slot", null),
    ];
  }
  get host() { return getElement(this); }
  static get watchers() { return {
    "searchHub": ["updateSearchConfiguration"],
    "pipeline": ["updateSearchConfiguration"]
  }; }
};

export { AtomicSearchInterface as atomic_search_interface };

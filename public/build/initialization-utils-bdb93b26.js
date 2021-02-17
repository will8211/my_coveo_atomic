import { g as getElement, h } from './index-3acbf9e0.js';

class MissingInterfaceParentError extends Error {
  constructor(elementName) {
    super(`The "${elementName}" element must be the child of a configured "atomic-search-interface" element.`);
  }
}
class ComponentInitializationError extends Error {
  constructor(elementName) {
    super(`The "${elementName}" element had an initialization error. Look at the developer console for more information.`);
  }
}
/**
 * Utility that automatically fetches the `Bindings` from the parent `AtomicSearchInterface` component.
 * Once a component is bound, the `initialize` method is called, if defined.
 *
 * In order for a component using this decorator to render properly, it should have an internal state bound to one of the property from `bindings`.
 * This is possible by using either the `BindStateToController` or the `BindStateToI18n` decorator.
 *
 * For more information and examples, view the "Utilities" section of the readme.
 */
function InitializeBindings() {
  return (component, bindingsProperty) => {
    const { componentWillLoad, render, componentDidRender, componentDidLoad, } = component;
    if (bindingsProperty !== 'bindings') {
      return console.error(`The InitializeBindings decorator should be used on a property called "bindings", and not "${bindingsProperty}"`, component);
    }
    component.componentWillLoad = function () {
      const element = getElement(this);
      const event = new CustomEvent('atomic/initializeComponent', {
        detail: (bindings) => {
          this.bindings = bindings;
          try {
            this.initialize && this.initialize();
          }
          catch (e) {
            this.error = new ComponentInitializationError(element.nodeName.toLowerCase());
          }
        },
        // Event will bubble up the DOM until it is caught
        bubbles: true,
        // Allows to verify if event is caught (cancelled). If it's not caught, it won't be initialized.
        cancelable: true,
        // Allows to compose Atomic components inside one another, event will go across DOM/Shadow DOM
        composed: true,
      });
      const canceled = element.dispatchEvent(event);
      if (canceled) {
        this.error = new MissingInterfaceParentError(element.nodeName.toLowerCase());
        return;
      }
      return componentWillLoad && componentWillLoad.call(this);
    };
    let hasRendered = false;
    let hasLoaded = false;
    component.render = function () {
      if (this.error) {
        return (h("atomic-component-error", { element: getElement(this), error: this.error }));
      }
      if (!this.bindings) {
        return;
      }
      hasRendered = true;
      return render && render.call(this);
    };
    component.componentDidRender = function () {
      if (!hasRendered) {
        return;
      }
      componentDidRender && componentDidRender.call(this);
      if (!hasLoaded) {
        componentDidLoad && componentDidLoad.call(this);
        hasLoaded = true;
      }
    };
    component.componentDidLoad = function () { };
  };
}
/**
 * Decorator to be used on a property decorator with Stencil's `State` that will be subscribed automatically to a Headless Framework controller.
 * @param controllerProperty The controller property to subscribe to. The controller has to be defined inside the `initialize` method.
 * @param options
 */
function BindStateToController(controllerProperty, options) {
  return (component, stateProperty) => {
    const { connectedCallback, disconnectedCallback, initialize } = component;
    let unsubscribe = () => { };
    component.connectedCallback = function () {
      if ((options === null || options === void 0 ? void 0 : options.subscribeOnConnectedCallback) && this[controllerProperty]) {
        unsubscribe = this[controllerProperty].subscribe(() => {
          this[stateProperty] = this[controllerProperty].state;
          (options === null || options === void 0 ? void 0 : options.onUpdateCallbackMethod) &&
            this[options.onUpdateCallbackMethod] &&
            this[options.onUpdateCallbackMethod]();
        });
      }
      connectedCallback && connectedCallback.call(this);
    };
    component.initialize = function () {
      initialize && initialize.call(this);
      if (!initialize) {
        return console.error(`ControllerState: The "initialize" method has to be defined and instanciate a controller for the property ${controllerProperty}`, component);
      }
      if (!this[controllerProperty]) {
        return console.error(`ControllerState: The controller property "${controllerProperty}" is not defined`, component);
      }
      if ((options === null || options === void 0 ? void 0 : options.onUpdateCallbackMethod) &&
        !this[options.onUpdateCallbackMethod]) {
        return console.error(`ControllerState: The onUpdateCallbackMethod property "${options.onUpdateCallbackMethod}" is not defined`, component);
      }
      unsubscribe = this[controllerProperty].subscribe(() => {
        this[stateProperty] = this[controllerProperty].state;
        (options === null || options === void 0 ? void 0 : options.onUpdateCallbackMethod) &&
          this[options.onUpdateCallbackMethod]();
      });
    };
    component.disconnectedCallback = function () {
      unsubscribe();
      disconnectedCallback && disconnectedCallback.call(this);
    };
  };
}
/**
 * Decorator to be used on a property decorator with Stencil's `State` that will be subscribed automatically to the i18next language change.
 * The state should be of the `I18nState` format and use the `i18n` binding to retrieve strings.
 */
function BindStateToI18n() {
  return (component, stateProperty) => {
    const { disconnectedCallback, initialize } = component;
    let unsubscribe = () => { };
    component.initialize = function () {
      const updateStrings = () => {
        this[stateProperty] = Object.assign({}, this[stateProperty]);
      };
      updateStrings(); // Ensures re-render of localized strings on initialization
      this.bindings.i18n.on('languageChanged', updateStrings);
      unsubscribe = () => this.bindings.i18n.off('languageChanged', updateStrings);
      initialize && initialize.call(this);
    };
    component.disconnectedCallback = function () {
      unsubscribe();
      disconnectedCallback && disconnectedCallback.call(this);
    };
  };
}

export { BindStateToController as B, InitializeBindings as I, BindStateToI18n as a };

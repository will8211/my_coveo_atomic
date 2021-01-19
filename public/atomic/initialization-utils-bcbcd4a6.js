import { g as getElement, h as h$1 } from './index-1c54a593.js';

class t extends Error{constructor(t){super(t),this.name="SchemaValidationError";}}class e{constructor(t){this.definition=t;}validate(e={},i=""){const n={...this.default,...e},r=[];for(const t in this.definition){const e=this.definition[t].validate(n[t]);e&&r.push(`${t}: ${e}`);}if(r.length)throw function(e,i){const n=`\n  The following properties are invalid:\n\n    ${e.join("\n\t")}\n  \n  ${i}\n  `;return new t(n)}(r,i);return n}get default(){const t={};for(const e in this.definition){const i=this.definition[e].default;void 0!==i&&(t[e]=i);}return t}}class i{constructor(t={}){this.baseConfig=t;}validate(t){return this.baseConfig.required&&u(t)?"value is required.":null}get default(){return this.baseConfig.default instanceof Function?this.baseConfig.default():this.baseConfig.default}get required(){return !0===this.baseConfig.required}}function n(t){return void 0===t}function r(t){return null===t}function u(t){return n(t)||r(t)}class a{constructor(t={}){this.config=t,this.value=new i(t);}validate(t){const e=this.value.validate(t);return e||(o(t)?t<this.config.min?`minimum value of ${this.config.min} not respected.`:t>this.config.max?`maximum value of ${this.config.max} not respected.`:null:"value is not a number.")}get default(){return this.value.default}get required(){return this.value.required}}function o(t){return n(t)||s(t)}function s(t){return "number"==typeof t}class l{constructor(t={}){this.value=new i(t);}validate(t){const e=this.value.validate(t);return e||(f(t)?null:"value is not a boolean.")}get default(){return this.value.default}get required(){return this.value.required}}function f(t){return n(t)||c(t)}function c(t){return "boolean"==typeof t}const d=/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;class h{constructor(t={}){this.config={emptyAllowed:!0,url:!1,...t},this.value=new i(this.config);}validate(t){const{emptyAllowed:e,url:i,regex:r,constrainTo:u}=this.config,a=this.value.validate(t);if(a)return a;if(n(t))return null;if(!v(t))return "value is not a string.";if(!e&&!t.length)return "value is an empty string.";if(i&&!d.test(t))return "value is not a valid URL.";if(r&&!r.test(t))return "value did not match provided regex "+r;if(u&&!u.includes(t)){return `value should be one of: ${u.join(", ")}.`}return null}get default(){return this.value.default}get required(){return this.value.required}}function v(t){return "[object String]"===Object.prototype.toString.call(t)}class g{constructor(t={}){this.config={options:{required:!1},values:{},...t};}validate(t){if(n(t))return this.config.options.required?"value is required and is currently undefined":null;if(!m(t))return "value is not an object";for(const[e,i]of Object.entries(this.config.values))if(i.required&&u(t[e]))return "value does not contain "+e;let e="";for(const[i,n]of Object.entries(this.config.values)){const r=t[i],u=n.validate(r);null!==u&&(e+=" "+u);}return ""===e?null:e}get default(){}get required(){return !!this.config.options.required}}function m(t){return void 0!==t&&"object"==typeof t}class p{constructor(t={}){this.config=t,this.value=new i(this.config);}validate(t){if(!u(t)&&!Array.isArray(t))return "value is not an array";const e=this.value.validate(t);if(null!==e)return e;if(u(t))return null;if(void 0!==this.config.max&&t.length>this.config.max)return "value contains more than "+this.config.max;if(void 0!==this.config.min&&t.length<this.config.min)return "value contains less than "+this.config.min;if(void 0!==this.config.each){let e="";return t.forEach((i=>{this.config.each.required&&u(i)&&(e="value is null or undefined: "+t.join(","));const n=this.validatePrimitiveValue(i,this.config.each);null!==n&&(e+=" "+n);})),""===e?null:e}return null}validatePrimitiveValue(t,e){return c(t)||v(t)||s(t)||m(t)?e.validate(t):"value is not a primitive value"}get default(){}get required(){return this.value.required}}function q(t){return Array.isArray(t)}class b{constructor(t){this.config=t,this.value=new i(t);}validate(t){const e=this.value.validate(t);if(null!==e)return e;if(n(t))return null;return Object.values(this.config.enum).find((e=>e===t))?null:"value is not in enum."}get default(){return this.value.default}get required(){return this.value.required}}

const engineProviders = ['atomic-search-interface'];
class InitializationError extends Error {
  constructor(elementName) {
    super(`The ${elementName} element must be the child of a configured ${engineProviders.join(' or ')} element.`);
    this.name = 'InitializationError';
  }
}
const initializationOptionsSchema = new e({
  errorProperty: new h({ default: 'error' }),
  engineProperty: new h({ default: 'engine' }),
});
function Initialization(options) {
  return (component, initializeMethod) => {
    const { componentWillLoad, render, componentDidRender, componentDidLoad, [initializeMethod]: initialize, } = component;
    const { errorProperty, engineProperty, } = initializationOptionsSchema.validate(options);
    component.componentWillLoad = function () {
      const element = getElement(this);
      const parentEngineProvider = element.closest(engineProviders.join());
      if (!parentEngineProvider) {
        this[errorProperty] = new InitializationError(element.nodeName.toLowerCase());
        return;
      }
      const event = new CustomEvent('atomic/initializeComponent', {
        detail: (engine) => {
          this[engineProperty] = engine;
          try {
            initialize.call(this);
          }
          catch (error) {
            this[errorProperty] = error;
          }
        },
        bubbles: true,
      });
      element.dispatchEvent(event);
      return componentWillLoad && componentWillLoad.call(this);
    };
    if (!render) {
      console.error('The "render" lifecycle method has to be defined for the InitializeComponent decorator to work.');
    }
    let hasRendered = false;
    let hasLoaded = false;
    component.render = function () {
      if (this[errorProperty]) {
        hasRendered = true;
        return (h$1("atomic-component-error", { error: this[errorProperty] }));
      }
      if (!this[engineProperty]) {
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
      return;
    };
    component.componentDidLoad = function () { };
  };
}

export { Initialization as I };

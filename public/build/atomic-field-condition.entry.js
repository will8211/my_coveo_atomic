import { r as registerInstance, h, g as getElement } from './index-3acbf9e0.js';
import { x as xd } from './headless.esm-fb41148c.js';
import { R as ResultContext, a as ResultContextRenderer } from './result-template-decorators-403b70fb.js';
import './utils-82f7d421.js';
import { M as MapProp } from './props-utils-d8bbf1ed.js';

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
const AtomicFieldCondition = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.conditions = [];
    this.mustMatch = {};
    this.mustNotMatch = {};
    this.fields = [];
    this.shouldBeRemoved = false;
  }
  componentWillLoad() {
    if (this.ifDefined) {
      const fieldNames = this.ifDefined.split(',');
      this.fields.push(...fieldNames);
      this.conditions.push(xd.fieldsMustBeDefined(fieldNames));
    }
    if (this.ifNotDefined) {
      const fieldNames = this.ifNotDefined.split(',');
      this.fields.push(...fieldNames);
      this.conditions.push(xd.fieldsMustNotBeDefined(fieldNames));
    }
    for (const field in this.mustMatch) {
      this.conditions.push(xd.fieldMustMatch(field, this.mustMatch[field]));
      this.fields.push(field);
    }
    for (const field in this.mustNotMatch) {
      this.conditions.push(xd.fieldMustNotMatch(field, this.mustNotMatch[field]));
      this.fields.push(field);
    }
  }
  render() {
    if (!this.conditions.every((condition) => condition(this.result))) {
      this.shouldBeRemoved = true;
      return '';
    }
    return h("slot", null);
  }
  componentDidLoad() {
    this.shouldBeRemoved && this.host.remove();
  }
  async getFields() {
    return this.fields;
  }
  get host() { return getElement(this); }
};
__decorate([
  MapProp()
], AtomicFieldCondition.prototype, "mustMatch", void 0);
__decorate([
  MapProp()
], AtomicFieldCondition.prototype, "mustNotMatch", void 0);
__decorate([
  ResultContext()
], AtomicFieldCondition.prototype, "result", void 0);
__decorate([
  ResultContextRenderer
], AtomicFieldCondition.prototype, "render", null);

export { AtomicFieldCondition as atomic_field_condition };

import { r as registerInstance, h, g as getElement } from './index-1c54a593.js';
import './utils-7d7e1c0f.js';
import { c as cd } from './headless.esm-6bb95796.js';
import { R as ResultContext, a as ResultContextRenderer } from './result-template-decorators-c22f7e40.js';
import { M as MapProp } from './props-utils-76718155.js';

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
      this.conditions.push(cd.fieldsMustBeDefined(fieldNames));
    }
    if (this.ifNotDefined) {
      const fieldNames = this.ifNotDefined.split(',');
      this.fields.push(...fieldNames);
      this.conditions.push(cd.fieldsMustNotBeDefined(fieldNames));
    }
    for (const field in this.mustMatch) {
      this.conditions.push(cd.fieldMustMatch(field, this.mustMatch[field]));
      this.fields.push(field);
    }
    for (const field in this.mustNotMatch) {
      this.conditions.push(cd.fieldMustNotMatch(field, this.mustNotMatch[field]));
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

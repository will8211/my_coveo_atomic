import { r as registerInstance, g as getElement } from './index-1c54a593.js';
import './utils-7d7e1c0f.js';
import { c as cd } from './headless.esm-6bb95796.js';
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
const AtomicResultTemplate = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    var _a;
    this.conditions = [];
    this.mustMatch = {};
    this.mustNotMatch = {};
    this.fields = [];
    this.matchConditions = [];
    const isParentResultList = ((_a = this.host.parentElement) === null || _a === void 0 ? void 0 : _a.nodeName) === 'ATOMIC-RESULT-LIST';
    if (!isParentResultList) {
      throw new Error('The "atomic-result-template" component has to be the child of an "atomic-result-list" component.');
    }
  }
  componentWillLoad() {
    this.fieldsToInclude &&
      this.fields.push(...this.fieldsToInclude.split(','));
    for (const field in this.mustMatch) {
      this.matchConditions.push(cd.fieldMustMatch(field, this.mustMatch[field]));
      this.fields.push(field);
    }
    for (const field in this.mustNotMatch) {
      this.matchConditions.push(cd.fieldMustNotMatch(field, this.mustNotMatch[field]));
      this.fields.push(field);
    }
  }
  async getConditions() {
    return this.conditions.concat(this.matchConditions);
  }
  async getFields() {
    const fieldValues = [];
    this.host
      .querySelectorAll('atomic-result-value')
      .forEach((resultValueElement) => {
      fieldValues.push(resultValueElement.value);
    });
    const fieldsPromises = [];
    this.host
      .querySelectorAll('atomic-field-condition')
      .forEach((fieldConditionElement) => {
      fieldsPromises.push(fieldConditionElement.getFields());
    });
    return this.fields.concat(fieldValues, ...(await Promise.all(fieldsPromises)));
  }
  get host() { return getElement(this); }
};
__decorate([
  MapProp()
], AtomicResultTemplate.prototype, "mustMatch", void 0);
__decorate([
  MapProp()
], AtomicResultTemplate.prototype, "mustNotMatch", void 0);

export { AtomicResultTemplate as atomic_result_template };

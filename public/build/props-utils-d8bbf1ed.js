import { g as getElement } from './index-3acbf9e0.js';
import { c as camelToKebab } from './utils-82f7d421.js';

function MapProp(opts) {
  return (component, variableName) => {
    const { componentWillLoad } = component;
    if (!componentWillLoad) {
      console.error('The "componentWillLoad" lifecycle method has to be defined for the MapProp decorator to work.');
      return;
    }
    component.componentWillLoad = function () {
      const prefix = (opts && opts.attributePrefix) || variableName;
      const kebabPrefix = camelToKebab(prefix) + '-';
      const variable = this[variableName];
      const attributes = getElement(this).attributes;
      for (let i = 0; i < attributes.length; i++) {
        const attribute = attributes[i];
        if (attribute.name.indexOf(kebabPrefix) !== 0) {
          continue;
        }
        variable[attribute.name.replace(kebabPrefix, '')] = `${attribute.value}`.split(',');
      }
      componentWillLoad.call(this);
    };
  };
}

export { MapProp as M };

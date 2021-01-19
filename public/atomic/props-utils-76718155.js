import { g as getElement } from './index-1c54a593.js';
import { c as camelToKebab } from './utils-7d7e1c0f.js';

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

import { g as getElement } from './index-1c54a593.js';

function ResultContext() {
  return (component, resultVariable) => {
    const { render } = component;
    if (!render) {
      console.error('The "render" lifecycle method has to be defined for the ResultTemplateComponent decorator to work.');
      return;
    }
    component.render = function () {
      const element = getElement(this);
      const parentResultComponent = element.closest('atomic-result');
      if (!parentResultComponent) {
        throw new Error(`The "${element.nodeName.toLowerCase()}" component has to be the child of an "atomic-result-template" component`);
      }
      component[resultVariable] = parentResultComponent.result;
      return render.call(this);
    };
  };
}
function ResultContextRenderer(_component, _propertyKey, descriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function () {
    const element = getElement(this);
    const parentResultTemplateComponent = element.closest('atomic-result-template');
    const parentResultComponent = element.closest('atomic-result');
    if (!parentResultTemplateComponent && !parentResultComponent) {
      throw new Error(`The "${element.nodeName.toLowerCase()}" component has to be the child of an "atomic-result-template" component`);
    }
    if (parentResultTemplateComponent) {
      return;
    }
    return originalMethod.call(this);
  };
}

export { ResultContext as R, ResultContextRenderer as a };

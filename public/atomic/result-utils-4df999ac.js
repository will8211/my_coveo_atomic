import { o as once } from './utils-7d7e1c0f.js';
import { S as Sd } from './headless.esm-6bb95796.js';

/**
 * Binds the logging of document
 * @returns An unbind function for the events
 * @param engine An instance of an Headless Engine
 * @param result The result object
 * @param resultElement Parent result element
 * @param selector Optional. Css selector that selects all links to the document. Default: "a" tags with the clickUri as "href" parameter.
 */
function bindLogDocumentOpenOnResult(engine, result, resultElement, selector) {
  const logDocumentOpenOnce = once(() => {
    engine.dispatch(Sd.logDocumentOpen(result));
  });
  // 1 second is a reasonable amount of time to catch most longpress actions
  const longpressDelay = 1000;
  let longPressTimer;
  const startPressTimer = () => {
    longPressTimer = window.setTimeout(logDocumentOpenOnce, longpressDelay);
  };
  const clearPressTimer = () => {
    longPressTimer && clearTimeout(longPressTimer);
  };
  const eventsMap = {
    contextmenu: logDocumentOpenOnce,
    click: logDocumentOpenOnce,
    mouseup: logDocumentOpenOnce,
    mousedown: logDocumentOpenOnce,
    touchstart: startPressTimer,
    touchend: clearPressTimer,
  };
  const elements = resultElement.querySelectorAll(selector || `a[href='${result.clickUri}']`);
  elements.forEach((element) => {
    Object.keys(eventsMap).forEach((key) => element.addEventListener(key, eventsMap[key]));
  });
  return () => {
    elements.forEach((element) => {
      Object.keys(eventsMap).forEach((key) => element.removeEventListener(key, eventsMap[key]));
    });
  };
}

export { bindLogDocumentOpenOnResult as b };

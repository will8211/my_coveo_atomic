/**
 * Returns a function that can be executed only once
 */
function once(fn) {
  let result;
  return function (...args) {
    if (fn) {
      result = fn.apply(this, args);
      fn = () => { };
    }
    return result;
  };
}
function camelToKebab(value) {
  return value.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
}
function randomID(prepend, length = 5) {
  return (prepend +
    Math.random()
      .toString(36)
      .substr(2, 2 + length));
}

export { camelToKebab as c, once as o, randomID as r };

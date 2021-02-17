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
function sanitize(string) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
    '`': '&#x60;',
  };
  const reg = /[&<>"'/]/gi;
  return string.replace(reg, (match) => map[match]);
}

export { camelToKebab as c, randomID as r, sanitize as s };

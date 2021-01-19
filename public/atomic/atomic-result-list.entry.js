import { r as registerInstance, h, g as getElement } from './index-1c54a593.js';
import { f as Ml, g as Su } from './headless.esm-6bb95796.js';
import { I as Initialization } from './initialization-utils-bcbcd4a6.js';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports), module.exports;
}

function getDefaultExportFromNamespaceIfPresent (n) {
	return n && Object.prototype.hasOwnProperty.call(n, 'default') ? n['default'] : n;
}

function getDefaultExportFromNamespaceIfNotNamed (n) {
	return n && Object.prototype.hasOwnProperty.call(n, 'default') && Object.keys(n).length === 1 ? n['default'] : n;
}

function getAugmentedNamespace(n) {
	if (n.__esModule) return n;
	var a = Object.defineProperty({}, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var mustache = createCommonjsModule(function (module, exports) {
// This file has been generated from mustache.mjs
(function (global, factory) {
  'object' === 'object' && 'object' !== 'undefined' ? module.exports = factory() :
  typeof undefined === 'function' && undefined.amd ? undefined(factory) :
  (global = global || self, global.Mustache = factory());
}(commonjsGlobal, (function () { 'use strict';

  /*!
   * mustache.js - Logic-less {{mustache}} templates with JavaScript
   * http://github.com/janl/mustache.js
   */

  var objectToString = Object.prototype.toString;
  var isArray = Array.isArray || function isArrayPolyfill (object) {
    return objectToString.call(object) === '[object Array]';
  };

  function isFunction (object) {
    return typeof object === 'function';
  }

  /**
   * More correct typeof string handling array
   * which normally returns typeof 'object'
   */
  function typeStr (obj) {
    return isArray(obj) ? 'array' : typeof obj;
  }

  function escapeRegExp (string) {
    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
  }

  /**
   * Null safe way of checking whether or not an object,
   * including its prototype, has a given property
   */
  function hasProperty (obj, propName) {
    return obj != null && typeof obj === 'object' && (propName in obj);
  }

  /**
   * Safe way of detecting whether or not the given thing is a primitive and
   * whether it has the given property
   */
  function primitiveHasOwnProperty (primitive, propName) {
    return (
      primitive != null
      && typeof primitive !== 'object'
      && primitive.hasOwnProperty
      && primitive.hasOwnProperty(propName)
    );
  }

  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
  // See https://github.com/janl/mustache.js/issues/189
  var regExpTest = RegExp.prototype.test;
  function testRegExp (re, string) {
    return regExpTest.call(re, string);
  }

  var nonSpaceRe = /\S/;
  function isWhitespace (string) {
    return !testRegExp(nonSpaceRe, string);
  }

  var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };

  function escapeHtml (string) {
    return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap (s) {
      return entityMap[s];
    });
  }

  var whiteRe = /\s*/;
  var spaceRe = /\s+/;
  var equalsRe = /\s*=/;
  var curlyRe = /\s*\}/;
  var tagRe = /#|\^|\/|>|\{|&|=|!/;

  /**
   * Breaks up the given `template` string into a tree of tokens. If the `tags`
   * argument is given here it must be an array with two string values: the
   * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
   * course, the default is to use mustaches (i.e. mustache.tags).
   *
   * A token is an array with at least 4 elements. The first element is the
   * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
   * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
   * all text that appears outside a symbol this element is "text".
   *
   * The second element of a token is its "value". For mustache tags this is
   * whatever else was inside the tag besides the opening symbol. For text tokens
   * this is the text itself.
   *
   * The third and fourth elements of the token are the start and end indices,
   * respectively, of the token in the original template.
   *
   * Tokens that are the root node of a subtree contain two more elements: 1) an
   * array of tokens in the subtree and 2) the index in the original template at
   * which the closing tag for that section begins.
   *
   * Tokens for partials also contain two more elements: 1) a string value of
   * indendation prior to that tag and 2) the index of that tag on that line -
   * eg a value of 2 indicates the partial is the third tag on this line.
   */
  function parseTemplate (template, tags) {
    if (!template)
      return [];
    var lineHasNonSpace = false;
    var sections = [];     // Stack to hold section tokens
    var tokens = [];       // Buffer to hold the tokens
    var spaces = [];       // Indices of whitespace tokens on the current line
    var hasTag = false;    // Is there a {{tag}} on the current line?
    var nonSpace = false;  // Is there a non-space char on the current line?
    var indentation = '';  // Tracks indentation for tags that use it
    var tagIndex = 0;      // Stores a count of number of tags encountered on a line

    // Strips all whitespace tokens array for the current line
    // if there was a {{#tag}} on it and otherwise only space.
    function stripSpace () {
      if (hasTag && !nonSpace) {
        while (spaces.length)
          delete tokens[spaces.pop()];
      } else {
        spaces = [];
      }

      hasTag = false;
      nonSpace = false;
    }

    var openingTagRe, closingTagRe, closingCurlyRe;
    function compileTags (tagsToCompile) {
      if (typeof tagsToCompile === 'string')
        tagsToCompile = tagsToCompile.split(spaceRe, 2);

      if (!isArray(tagsToCompile) || tagsToCompile.length !== 2)
        throw new Error('Invalid tags: ' + tagsToCompile);

      openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + '\\s*');
      closingTagRe = new RegExp('\\s*' + escapeRegExp(tagsToCompile[1]));
      closingCurlyRe = new RegExp('\\s*' + escapeRegExp('}' + tagsToCompile[1]));
    }

    compileTags(tags || mustache.tags);

    var scanner = new Scanner(template);

    var start, type, value, chr, token, openSection;
    while (!scanner.eos()) {
      start = scanner.pos;

      // Match any text between tags.
      value = scanner.scanUntil(openingTagRe);

      if (value) {
        for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
          chr = value.charAt(i);

          if (isWhitespace(chr)) {
            spaces.push(tokens.length);
            indentation += chr;
          } else {
            nonSpace = true;
            lineHasNonSpace = true;
            indentation += ' ';
          }

          tokens.push([ 'text', chr, start, start + 1 ]);
          start += 1;

          // Check for whitespace on the current line.
          if (chr === '\n') {
            stripSpace();
            indentation = '';
            tagIndex = 0;
            lineHasNonSpace = false;
          }
        }
      }

      // Match the opening tag.
      if (!scanner.scan(openingTagRe))
        break;

      hasTag = true;

      // Get the tag type.
      type = scanner.scan(tagRe) || 'name';
      scanner.scan(whiteRe);

      // Get the tag value.
      if (type === '=') {
        value = scanner.scanUntil(equalsRe);
        scanner.scan(equalsRe);
        scanner.scanUntil(closingTagRe);
      } else if (type === '{') {
        value = scanner.scanUntil(closingCurlyRe);
        scanner.scan(curlyRe);
        scanner.scanUntil(closingTagRe);
        type = '&';
      } else {
        value = scanner.scanUntil(closingTagRe);
      }

      // Match the closing tag.
      if (!scanner.scan(closingTagRe))
        throw new Error('Unclosed tag at ' + scanner.pos);

      if (type == '>') {
        token = [ type, value, start, scanner.pos, indentation, tagIndex, lineHasNonSpace ];
      } else {
        token = [ type, value, start, scanner.pos ];
      }
      tagIndex++;
      tokens.push(token);

      if (type === '#' || type === '^') {
        sections.push(token);
      } else if (type === '/') {
        // Check section nesting.
        openSection = sections.pop();

        if (!openSection)
          throw new Error('Unopened section "' + value + '" at ' + start);

        if (openSection[1] !== value)
          throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
      } else if (type === 'name' || type === '{' || type === '&') {
        nonSpace = true;
      } else if (type === '=') {
        // Set the tags for the next time around.
        compileTags(value);
      }
    }

    stripSpace();

    // Make sure there are no open sections when we're done.
    openSection = sections.pop();

    if (openSection)
      throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);

    return nestTokens(squashTokens(tokens));
  }

  /**
   * Combines the values of consecutive text tokens in the given `tokens` array
   * to a single token.
   */
  function squashTokens (tokens) {
    var squashedTokens = [];

    var token, lastToken;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      token = tokens[i];

      if (token) {
        if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
          lastToken[1] += token[1];
          lastToken[3] = token[3];
        } else {
          squashedTokens.push(token);
          lastToken = token;
        }
      }
    }

    return squashedTokens;
  }

  /**
   * Forms the given array of `tokens` into a nested tree structure where
   * tokens that represent a section have two additional items: 1) an array of
   * all tokens that appear in that section and 2) the index in the original
   * template that represents the end of that section.
   */
  function nestTokens (tokens) {
    var nestedTokens = [];
    var collector = nestedTokens;
    var sections = [];

    var token, section;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      token = tokens[i];

      switch (token[0]) {
        case '#':
        case '^':
          collector.push(token);
          sections.push(token);
          collector = token[4] = [];
          break;
        case '/':
          section = sections.pop();
          section[5] = token[2];
          collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
          break;
        default:
          collector.push(token);
      }
    }

    return nestedTokens;
  }

  /**
   * A simple string scanner that is used by the template parser to find
   * tokens in template strings.
   */
  function Scanner (string) {
    this.string = string;
    this.tail = string;
    this.pos = 0;
  }

  /**
   * Returns `true` if the tail is empty (end of string).
   */
  Scanner.prototype.eos = function eos () {
    return this.tail === '';
  };

  /**
   * Tries to match the given regular expression at the current position.
   * Returns the matched text if it can match, the empty string otherwise.
   */
  Scanner.prototype.scan = function scan (re) {
    var match = this.tail.match(re);

    if (!match || match.index !== 0)
      return '';

    var string = match[0];

    this.tail = this.tail.substring(string.length);
    this.pos += string.length;

    return string;
  };

  /**
   * Skips all text until the given regular expression can be matched. Returns
   * the skipped string, which is the entire tail if no match can be made.
   */
  Scanner.prototype.scanUntil = function scanUntil (re) {
    var index = this.tail.search(re), match;

    switch (index) {
      case -1:
        match = this.tail;
        this.tail = '';
        break;
      case 0:
        match = '';
        break;
      default:
        match = this.tail.substring(0, index);
        this.tail = this.tail.substring(index);
    }

    this.pos += match.length;

    return match;
  };

  /**
   * Represents a rendering context by wrapping a view object and
   * maintaining a reference to the parent context.
   */
  function Context (view, parentContext) {
    this.view = view;
    this.cache = { '.': this.view };
    this.parent = parentContext;
  }

  /**
   * Creates a new context using the given view with this context
   * as the parent.
   */
  Context.prototype.push = function push (view) {
    return new Context(view, this);
  };

  /**
   * Returns the value of the given name in this context, traversing
   * up the context hierarchy if the value is absent in this context's view.
   */
  Context.prototype.lookup = function lookup (name) {
    var cache = this.cache;

    var value;
    if (cache.hasOwnProperty(name)) {
      value = cache[name];
    } else {
      var context = this, intermediateValue, names, index, lookupHit = false;

      while (context) {
        if (name.indexOf('.') > 0) {
          intermediateValue = context.view;
          names = name.split('.');
          index = 0;

          /**
           * Using the dot notion path in `name`, we descend through the
           * nested objects.
           *
           * To be certain that the lookup has been successful, we have to
           * check if the last object in the path actually has the property
           * we are looking for. We store the result in `lookupHit`.
           *
           * This is specially necessary for when the value has been set to
           * `undefined` and we want to avoid looking up parent contexts.
           *
           * In the case where dot notation is used, we consider the lookup
           * to be successful even if the last "object" in the path is
           * not actually an object but a primitive (e.g., a string, or an
           * integer), because it is sometimes useful to access a property
           * of an autoboxed primitive, such as the length of a string.
           **/
          while (intermediateValue != null && index < names.length) {
            if (index === names.length - 1)
              lookupHit = (
                hasProperty(intermediateValue, names[index])
                || primitiveHasOwnProperty(intermediateValue, names[index])
              );

            intermediateValue = intermediateValue[names[index++]];
          }
        } else {
          intermediateValue = context.view[name];

          /**
           * Only checking against `hasProperty`, which always returns `false` if
           * `context.view` is not an object. Deliberately omitting the check
           * against `primitiveHasOwnProperty` if dot notation is not used.
           *
           * Consider this example:
           * ```
           * Mustache.render("The length of a football field is {{#length}}{{length}}{{/length}}.", {length: "100 yards"})
           * ```
           *
           * If we were to check also against `primitiveHasOwnProperty`, as we do
           * in the dot notation case, then render call would return:
           *
           * "The length of a football field is 9."
           *
           * rather than the expected:
           *
           * "The length of a football field is 100 yards."
           **/
          lookupHit = hasProperty(context.view, name);
        }

        if (lookupHit) {
          value = intermediateValue;
          break;
        }

        context = context.parent;
      }

      cache[name] = value;
    }

    if (isFunction(value))
      value = value.call(this.view);

    return value;
  };

  /**
   * A Writer knows how to take a stream of tokens and render them to a
   * string, given a context. It also maintains a cache of templates to
   * avoid the need to parse the same template twice.
   */
  function Writer () {
    this.templateCache = {
      _cache: {},
      set: function set (key, value) {
        this._cache[key] = value;
      },
      get: function get (key) {
        return this._cache[key];
      },
      clear: function clear () {
        this._cache = {};
      }
    };
  }

  /**
   * Clears all cached templates in this writer.
   */
  Writer.prototype.clearCache = function clearCache () {
    if (typeof this.templateCache !== 'undefined') {
      this.templateCache.clear();
    }
  };

  /**
   * Parses and caches the given `template` according to the given `tags` or
   * `mustache.tags` if `tags` is omitted,  and returns the array of tokens
   * that is generated from the parse.
   */
  Writer.prototype.parse = function parse (template, tags) {
    var cache = this.templateCache;
    var cacheKey = template + ':' + (tags || mustache.tags).join(':');
    var isCacheEnabled = typeof cache !== 'undefined';
    var tokens = isCacheEnabled ? cache.get(cacheKey) : undefined;

    if (tokens == undefined) {
      tokens = parseTemplate(template, tags);
      isCacheEnabled && cache.set(cacheKey, tokens);
    }
    return tokens;
  };

  /**
   * High-level method that is used to render the given `template` with
   * the given `view`.
   *
   * The optional `partials` argument may be an object that contains the
   * names and templates of partials that are used in the template. It may
   * also be a function that is used to load partial templates on the fly
   * that takes a single argument: the name of the partial.
   *
   * If the optional `tags` argument is given here it must be an array with two
   * string values: the opening and closing tags used in the template (e.g.
   * [ "<%", "%>" ]). The default is to mustache.tags.
   */
  Writer.prototype.render = function render (template, view, partials, tags) {
    var tokens = this.parse(template, tags);
    var context = (view instanceof Context) ? view : new Context(view, undefined);
    return this.renderTokens(tokens, context, partials, template, tags);
  };

  /**
   * Low-level method that renders the given array of `tokens` using
   * the given `context` and `partials`.
   *
   * Note: The `originalTemplate` is only ever used to extract the portion
   * of the original template that was contained in a higher-order section.
   * If the template doesn't use higher-order sections, this argument may
   * be omitted.
   */
  Writer.prototype.renderTokens = function renderTokens (tokens, context, partials, originalTemplate, tags) {
    var buffer = '';

    var token, symbol, value;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      value = undefined;
      token = tokens[i];
      symbol = token[0];

      if (symbol === '#') value = this.renderSection(token, context, partials, originalTemplate);
      else if (symbol === '^') value = this.renderInverted(token, context, partials, originalTemplate);
      else if (symbol === '>') value = this.renderPartial(token, context, partials, tags);
      else if (symbol === '&') value = this.unescapedValue(token, context);
      else if (symbol === 'name') value = this.escapedValue(token, context);
      else if (symbol === 'text') value = this.rawValue(token);

      if (value !== undefined)
        buffer += value;
    }

    return buffer;
  };

  Writer.prototype.renderSection = function renderSection (token, context, partials, originalTemplate) {
    var self = this;
    var buffer = '';
    var value = context.lookup(token[1]);

    // This function is used to render an arbitrary template
    // in the current context by higher-order sections.
    function subRender (template) {
      return self.render(template, context, partials);
    }

    if (!value) return;

    if (isArray(value)) {
      for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
        buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate);
      }
    } else if (typeof value === 'object' || typeof value === 'string' || typeof value === 'number') {
      buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate);
    } else if (isFunction(value)) {
      if (typeof originalTemplate !== 'string')
        throw new Error('Cannot use higher-order sections without the original template');

      // Extract the portion of the original template that the section contains.
      value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);

      if (value != null)
        buffer += value;
    } else {
      buffer += this.renderTokens(token[4], context, partials, originalTemplate);
    }
    return buffer;
  };

  Writer.prototype.renderInverted = function renderInverted (token, context, partials, originalTemplate) {
    var value = context.lookup(token[1]);

    // Use JavaScript's definition of falsy. Include empty arrays.
    // See https://github.com/janl/mustache.js/issues/186
    if (!value || (isArray(value) && value.length === 0))
      return this.renderTokens(token[4], context, partials, originalTemplate);
  };

  Writer.prototype.indentPartial = function indentPartial (partial, indentation, lineHasNonSpace) {
    var filteredIndentation = indentation.replace(/[^ \t]/g, '');
    var partialByNl = partial.split('\n');
    for (var i = 0; i < partialByNl.length; i++) {
      if (partialByNl[i].length && (i > 0 || !lineHasNonSpace)) {
        partialByNl[i] = filteredIndentation + partialByNl[i];
      }
    }
    return partialByNl.join('\n');
  };

  Writer.prototype.renderPartial = function renderPartial (token, context, partials, tags) {
    if (!partials) return;

    var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
    if (value != null) {
      var lineHasNonSpace = token[6];
      var tagIndex = token[5];
      var indentation = token[4];
      var indentedValue = value;
      if (tagIndex == 0 && indentation) {
        indentedValue = this.indentPartial(value, indentation, lineHasNonSpace);
      }
      return this.renderTokens(this.parse(indentedValue, tags), context, partials, indentedValue, tags);
    }
  };

  Writer.prototype.unescapedValue = function unescapedValue (token, context) {
    var value = context.lookup(token[1]);
    if (value != null)
      return value;
  };

  Writer.prototype.escapedValue = function escapedValue (token, context) {
    var value = context.lookup(token[1]);
    if (value != null)
      return mustache.escape(value);
  };

  Writer.prototype.rawValue = function rawValue (token) {
    return token[1];
  };

  var mustache = {
    name: 'mustache.js',
    version: '4.0.1',
    tags: [ '{{', '}}' ],
    clearCache: undefined,
    escape: undefined,
    parse: undefined,
    render: undefined,
    Scanner: undefined,
    Context: undefined,
    Writer: undefined,
    /**
     * Allows a user to override the default caching strategy, by providing an
     * object with set, get and clear methods. This can also be used to disable
     * the cache by setting it to the literal `undefined`.
     */
    set templateCache (cache) {
      defaultWriter.templateCache = cache;
    },
    /**
     * Gets the default or overridden caching object from the default writer.
     */
    get templateCache () {
      return defaultWriter.templateCache;
    }
  };

  // All high-level mustache.* functions use this writer.
  var defaultWriter = new Writer();

  /**
   * Clears all cached templates in the default writer.
   */
  mustache.clearCache = function clearCache () {
    return defaultWriter.clearCache();
  };

  /**
   * Parses and caches the given template in the default writer and returns the
   * array of tokens it contains. Doing this ahead of time avoids the need to
   * parse templates on the fly as they are rendered.
   */
  mustache.parse = function parse (template, tags) {
    return defaultWriter.parse(template, tags);
  };

  /**
   * Renders the `template` with the given `view` and `partials` using the
   * default writer. If the optional `tags` argument is given here it must be an
   * array with two string values: the opening and closing tags used in the
   * template (e.g. [ "<%", "%>" ]). The default is to mustache.tags.
   */
  mustache.render = function render (template, view, partials, tags) {
    if (typeof template !== 'string') {
      throw new TypeError('Invalid template! Template should be a "string" ' +
                          'but "' + typeStr(template) + '" was given as the first ' +
                          'argument for mustache#render(template, view, partials)');
    }

    return defaultWriter.render(template, view, partials, tags);
  };

  // Export the escaping function so that the user may override it.
  // See https://github.com/janl/mustache.js/issues/244
  mustache.escape = escapeHtml;

  // Export these mainly for testing, but also for advanced usage.
  mustache.Scanner = Scanner;
  mustache.Context = Context;
  mustache.Writer = Writer;

  return mustache;

})));
});

const defaultTemplate = "<hr>\n<h3 class=\"h5\">\n  <!-- TODO: use result link when https://coveord.atlassian.net/browse/KIT-98 is resolved -->\n  <!-- <atomic-result-link></atomic-result-link> -->\n  <a href=\"{{clickUri}}\"><h3>{{title}}</h3></a>\n</h3>\n<p>\n  <atomic-result-value value=\"excerpt\"> </atomic-result-value>\n</p>\n\n<div class=\"row row-cols-2\">\n  <atomic-field-condition if-defined=\"author\">\n    <div class=\"mt-1\">\n      <span class=\"fs-6 mr-1 badge bg-secondary\">Author</span>\n      <atomic-result-value value=\"author\"></atomic-result-value>\n    </div>\n  </atomic-field-condition>\n\n  <atomic-field-condition if-defined=\"source\">\n    <div class=\"mt-1\">\n      <span class=\"fs-6 mr-1 badge bg-secondary\">Source</span>\n      <atomic-result-value value=\"source\"></atomic-result-value>\n    </div>\n  </atomic-field-condition>\n\n  <atomic-field-condition if-defined=\"language\">\n    <div class=\"mt-1\">\n      <span class=\"fs-6 mr-1 badge bg-secondary\">Language</span>\n      <atomic-result-value value=\"language\"></atomic-result-value>\n    </div>\n  </atomic-field-condition>\n\n  <atomic-field-condition if-defined=\"filetype\">\n    <div class=\"mt-1\">\n      <span class=\"fs-6 mr-1 badge bg-secondary\">Type</span>\n      <atomic-result-value value=\"filetype\"> </atomic-result-value>\n    </div>\n  </atomic-field-condition>\n</div>\n";

const atomicResultListCss = "@charset \"UTF-8\";:host{display:block;font-family:var(--bs-font-sans-serif);font-size:1rem;font-weight:400;line-height:1.5;color:#212529;background-color:#fff;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0, 0, 0, 0)}*,*::before,*::after{box-sizing:border-box}@media (prefers-reduced-motion: no-preference){:root{scroll-behavior:smooth}}body{margin:0;font-family:var(--bs-font-sans-serif);font-size:1rem;font-weight:400;line-height:1.5;color:#212529;background-color:#fff;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0, 0, 0, 0)}[tabindex=\"-1\"]:focus:not(:focus-visible){outline:0 !important}hr{margin:1rem 0;color:inherit;background-color:currentColor;border:0;opacity:0.25}hr:not([size]){height:1px}h6,.h6,h5,.h5,h4,.h4,h3,.h3,h2,.h2,h1,.h1{margin-top:0;margin-bottom:0.5rem;font-weight:500;line-height:1.2}h1,.h1{font-size:calc(1.375rem + 1.5vw)}@media (min-width: 1200px){h1,.h1{font-size:2.5rem}}h2,.h2{font-size:calc(1.325rem + 0.9vw)}@media (min-width: 1200px){h2,.h2{font-size:2rem}}h3,.h3{font-size:calc(1.3rem + 0.6vw)}@media (min-width: 1200px){h3,.h3{font-size:1.75rem}}h4,.h4{font-size:calc(1.275rem + 0.3vw)}@media (min-width: 1200px){h4,.h4{font-size:1.5rem}}h5,.h5{font-size:1.25rem}h6,.h6{font-size:1rem}p{margin-top:0;margin-bottom:1rem}abbr[title],abbr[data-original-title]{text-decoration:underline;text-decoration:underline dotted;cursor:help;text-decoration-skip-ink:none}address{margin-bottom:1rem;font-style:normal;line-height:inherit}ol,ul{padding-left:2rem}ol,ul,dl{margin-top:0;margin-bottom:1rem}ol ol,ul ul,ol ul,ul ol{margin-bottom:0}dt{font-weight:700}dd{margin-bottom:0.5rem;margin-left:0}blockquote{margin:0 0 1rem}b,strong{font-weight:bolder}small,.small{font-size:0.875em}mark,.mark{padding:0.2em;background-color:#fcf8e3}sub,sup{position:relative;font-size:0.75em;line-height:0;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}a{color:#0d6efd;text-decoration:underline}a:hover{color:#0a58ca}a:not([href]):not([class]),a:not([href]):not([class]):hover{color:inherit;text-decoration:none}pre,code,kbd,samp{font-family:var(--bs-font-monospace);font-size:1em}pre{display:block;margin-top:0;margin-bottom:1rem;overflow:auto;font-size:0.875em}pre code{font-size:inherit;color:inherit;word-break:normal}code{font-size:0.875em;color:#d63384;word-wrap:break-word}a>code{color:inherit}kbd{padding:0.2rem 0.4rem;font-size:0.875em;color:#fff;background-color:#212529;border-radius:0.2rem}kbd kbd{padding:0;font-size:1em;font-weight:700}figure{margin:0 0 1rem}img,svg{vertical-align:middle}table{caption-side:bottom;border-collapse:collapse}caption{padding-top:0.5rem;padding-bottom:0.5rem;color:#6c757d;text-align:left}th{text-align:inherit;text-align:-webkit-match-parent}thead,tbody,tfoot,tr,td,th{border-color:inherit;border-style:solid;border-width:0}label{display:inline-block}button{border-radius:0}button:focus{outline:dotted 1px;outline:-webkit-focus-ring-color auto 5px}input,button,select,optgroup,textarea{margin:0;font-family:inherit;font-size:inherit;line-height:inherit}button,select{text-transform:none}[role=button]{cursor:pointer}select{word-wrap:normal}[list]::-webkit-calendar-picker-indicator{display:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button}button:not(:disabled),[type=button]:not(:disabled),[type=reset]:not(:disabled),[type=submit]:not(:disabled){cursor:pointer}::-moz-focus-inner{padding:0;border-style:none}textarea{resize:vertical}fieldset{min-width:0;padding:0;margin:0;border:0}legend{float:left;width:100%;padding:0;margin-bottom:0.5rem;font-size:calc(1.275rem + 0.3vw);line-height:inherit}@media (min-width: 1200px){legend{font-size:1.5rem}}legend+*{clear:left}::-webkit-datetime-edit-fields-wrapper,::-webkit-datetime-edit-text,::-webkit-datetime-edit-minute,::-webkit-datetime-edit-hour-field,::-webkit-datetime-edit-day-field,::-webkit-datetime-edit-month-field,::-webkit-datetime-edit-year-field{padding:0}::-webkit-inner-spin-button{height:auto}[type=search]{outline-offset:-2px;-webkit-appearance:textfield}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-color-swatch-wrapper{padding:0}::file-selector-button{font:inherit}::-webkit-file-upload-button{font:inherit;-webkit-appearance:button}output{display:inline-block}iframe{border:0}summary{display:list-item;cursor:pointer}progress{vertical-align:baseline}[hidden]{display:none !important}.clearfix::after{display:block;clear:both;content:\"\"}.link-primary{color:#0d6efd}.link-primary:hover,.link-primary:focus{color:#0a58ca}.link-secondary{color:#6c757d}.link-secondary:hover,.link-secondary:focus{color:#565e64}.link-success{color:#198754}.link-success:hover,.link-success:focus{color:#146c43}.link-info{color:#0dcaf0}.link-info:hover,.link-info:focus{color:#3dd5f3}.link-warning{color:#ffc107}.link-warning:hover,.link-warning:focus{color:#ffcd39}.link-danger{color:#dc3545}.link-danger:hover,.link-danger:focus{color:#b02a37}.link-light{color:#f8f9fa}.link-light:hover,.link-light:focus{color:#f9fafb}.link-dark{color:#212529}.link-dark:hover,.link-dark:focus{color:#1a1e21}.ratio{position:relative;width:100%}.ratio::before{display:block;padding-top:var(--aspect-ratio);content:\"\"}.ratio>*{position:absolute;top:0;left:0;width:100%;height:100%}.ratio-1x1{--aspect-ratio:100%}.ratio-4x3{--aspect-ratio:calc(3 / 4 * 100%)}.ratio-16x9{--aspect-ratio:calc(9 / 16 * 100%)}.ratio-21x9{--aspect-ratio:calc(9 / 21 * 100%)}.fixed-top{position:fixed;top:0;right:0;left:0;z-index:1030}.fixed-bottom{position:fixed;right:0;bottom:0;left:0;z-index:1030}.sticky-top{position:sticky;top:0;z-index:1020}@media (min-width: 576px){.sticky-sm-top{position:sticky;top:0;z-index:1020}}@media (min-width: 768px){.sticky-md-top{position:sticky;top:0;z-index:1020}}@media (min-width: 992px){.sticky-lg-top{position:sticky;top:0;z-index:1020}}@media (min-width: 1200px){.sticky-xl-top{position:sticky;top:0;z-index:1020}}@media (min-width: 1400px){.sticky-xxl-top{position:sticky;top:0;z-index:1020}}.visually-hidden,.visually-hidden-focusable:not(:focus){position:absolute !important;width:1px !important;height:1px !important;padding:0 !important;margin:-1px !important;overflow:hidden !important;clip:rect(0, 0, 0, 0) !important;white-space:nowrap !important;border:0 !important}.stretched-link::after{position:absolute;top:0;right:0;bottom:0;left:0;z-index:1;content:\"\"}.text-truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.lead{font-size:1.25rem;font-weight:300}.display-1{font-size:calc(1.625rem + 4.5vw);font-weight:300;line-height:1.2}@media (min-width: 1200px){.display-1{font-size:5rem}}.display-2{font-size:calc(1.575rem + 3.9vw);font-weight:300;line-height:1.2}@media (min-width: 1200px){.display-2{font-size:4.5rem}}.display-3{font-size:calc(1.525rem + 3.3vw);font-weight:300;line-height:1.2}@media (min-width: 1200px){.display-3{font-size:4rem}}.display-4{font-size:calc(1.475rem + 2.7vw);font-weight:300;line-height:1.2}@media (min-width: 1200px){.display-4{font-size:3.5rem}}.display-5{font-size:calc(1.425rem + 2.1vw);font-weight:300;line-height:1.2}@media (min-width: 1200px){.display-5{font-size:3rem}}.display-6{font-size:calc(1.375rem + 1.5vw);font-weight:300;line-height:1.2}@media (min-width: 1200px){.display-6{font-size:2.5rem}}.list-unstyled{padding-left:0;list-style:none}.list-inline{padding-left:0;list-style:none}.list-inline-item{display:inline-block}.list-inline-item:not(:last-child){margin-right:0.5rem}.initialism{font-size:0.875em;text-transform:uppercase}.blockquote{margin-bottom:1rem;font-size:1.25rem}.blockquote>:last-child{margin-bottom:0}.blockquote-footer{margin-top:-1rem;margin-bottom:1rem;font-size:0.875em;color:#6c757d}.blockquote-footer::before{content:\"— \"}.alert{position:relative;padding:1rem 1rem;margin-bottom:1rem;border:1px solid transparent;border-radius:var(--atomic-border-radius, 0.25rem)}.alert-heading{color:inherit}.alert-link{font-weight:700}.alert-dismissible{padding-right:3rem}.alert-dismissible .btn-close{position:absolute;top:0;right:0;z-index:2;padding:1.25rem 1rem}.alert-primary{color:#084298;background-color:#cfe2ff;border-color:#b6d4fe}.alert-primary .alert-link{color:#06357a}.alert-secondary{color:#41464b;background-color:#e2e3e5;border-color:#d3d6d8}.alert-secondary .alert-link{color:#34383c}.alert-success{color:#0f5132;background-color:#d1e7dd;border-color:#badbcc}.alert-success .alert-link{color:#0c4128}.alert-info{color:#055160;background-color:#cff4fc;border-color:#b6effb}.alert-info .alert-link{color:#04414d}.alert-warning{color:#664d03;background-color:#fff3cd;border-color:#ffecb5}.alert-warning .alert-link{color:#523e02}.alert-danger{color:#842029;background-color:#f8d7da;border-color:#f5c2c7}.alert-danger .alert-link{color:#6a1a21}.alert-light{color:#636464;background-color:#fefefe;border-color:#fdfdfe}.alert-light .alert-link{color:#4f5050}.alert-dark{color:#141619;background-color:#d3d3d4;border-color:#bcbebf}.alert-dark .alert-link{color:#101214}.badge{display:inline-block;padding:0.35em 0.65em;font-size:0.75em;font-weight:700;line-height:1;color:#fff;text-align:center;white-space:nowrap;vertical-align:baseline;border-radius:var(--atomic-border-radius, 0.25rem)}.badge:empty{display:none}.btn .badge{position:relative;top:-1px}.breadcrumb{display:flex;flex-wrap:wrap;padding:0.5rem 1rem;margin-bottom:1rem;list-style:none;background-color:#e9ecef;border-radius:var(--atomic-border-radius, 0.25rem)}.breadcrumb-item+.breadcrumb-item{padding-left:0.5rem}.breadcrumb-item+.breadcrumb-item::before{float:left;padding-right:0.5rem;color:#6c757d;content:\"/\"}.breadcrumb-item.active{color:#6c757d}.btn{display:inline-block;font-weight:400;line-height:1.5;color:#212529;text-align:center;text-decoration:none;vertical-align:middle;cursor:pointer;user-select:none;background-color:transparent;border:1px solid transparent;padding:0.375rem 0.75rem;font-size:1rem;border-radius:var(--atomic-border-radius, 0.25rem);transition:color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out}@media (prefers-reduced-motion: reduce){.btn{transition:none}}.btn:hover{color:#212529}.btn-check:focus+.btn,.btn:focus{outline:0;box-shadow:0 0 0 0.25rem rgba(13, 110, 253, 0.25)}.btn:disabled,.btn.disabled,fieldset:disabled .btn{pointer-events:none;opacity:0.65}.btn-primary{color:#fff;background-color:#0d6efd;border-color:#0d6efd}.btn-primary:hover{color:#fff;background-color:#0b5ed7;border-color:#0a58ca}.btn-check:focus+.btn-primary,.btn-primary:focus{color:#fff;background-color:#0b5ed7;border-color:#0a58ca;box-shadow:0 0 0 0.25rem rgba(49, 132, 253, 0.5)}.btn-check:checked+.btn-primary,.btn-check:active+.btn-primary,.btn-primary:active,.btn-primary.active,.show>.btn-primary.dropdown-toggle{color:#fff;background-color:#0a58ca;border-color:#0a53be}.btn-check:checked+.btn-primary:focus,.btn-check:active+.btn-primary:focus,.btn-primary:active:focus,.btn-primary.active:focus,.show>.btn-primary.dropdown-toggle:focus{box-shadow:0 0 0 0.25rem rgba(49, 132, 253, 0.5)}.btn-primary:disabled,.btn-primary.disabled{color:#fff;background-color:#0d6efd;border-color:#0d6efd}.btn-secondary{color:#fff;background-color:#6c757d;border-color:#6c757d}.btn-secondary:hover{color:#fff;background-color:#5c636a;border-color:#565e64}.btn-check:focus+.btn-secondary,.btn-secondary:focus{color:#fff;background-color:#5c636a;border-color:#565e64;box-shadow:0 0 0 0.25rem rgba(130, 138, 145, 0.5)}.btn-check:checked+.btn-secondary,.btn-check:active+.btn-secondary,.btn-secondary:active,.btn-secondary.active,.show>.btn-secondary.dropdown-toggle{color:#fff;background-color:#565e64;border-color:#51585e}.btn-check:checked+.btn-secondary:focus,.btn-check:active+.btn-secondary:focus,.btn-secondary:active:focus,.btn-secondary.active:focus,.show>.btn-secondary.dropdown-toggle:focus{box-shadow:0 0 0 0.25rem rgba(130, 138, 145, 0.5)}.btn-secondary:disabled,.btn-secondary.disabled{color:#fff;background-color:#6c757d;border-color:#6c757d}.btn-success{color:#fff;background-color:#198754;border-color:#198754}.btn-success:hover{color:#fff;background-color:#157347;border-color:#146c43}.btn-check:focus+.btn-success,.btn-success:focus{color:#fff;background-color:#157347;border-color:#146c43;box-shadow:0 0 0 0.25rem rgba(60, 153, 110, 0.5)}.btn-check:checked+.btn-success,.btn-check:active+.btn-success,.btn-success:active,.btn-success.active,.show>.btn-success.dropdown-toggle{color:#fff;background-color:#146c43;border-color:#13653f}.btn-check:checked+.btn-success:focus,.btn-check:active+.btn-success:focus,.btn-success:active:focus,.btn-success.active:focus,.show>.btn-success.dropdown-toggle:focus{box-shadow:0 0 0 0.25rem rgba(60, 153, 110, 0.5)}.btn-success:disabled,.btn-success.disabled{color:#fff;background-color:#198754;border-color:#198754}.btn-info{color:#000;background-color:#0dcaf0;border-color:#0dcaf0}.btn-info:hover{color:#000;background-color:#31d2f2;border-color:#25cff2}.btn-check:focus+.btn-info,.btn-info:focus{color:#000;background-color:#31d2f2;border-color:#25cff2;box-shadow:0 0 0 0.25rem rgba(11, 172, 204, 0.5)}.btn-check:checked+.btn-info,.btn-check:active+.btn-info,.btn-info:active,.btn-info.active,.show>.btn-info.dropdown-toggle{color:#000;background-color:#3dd5f3;border-color:#25cff2}.btn-check:checked+.btn-info:focus,.btn-check:active+.btn-info:focus,.btn-info:active:focus,.btn-info.active:focus,.show>.btn-info.dropdown-toggle:focus{box-shadow:0 0 0 0.25rem rgba(11, 172, 204, 0.5)}.btn-info:disabled,.btn-info.disabled{color:#000;background-color:#0dcaf0;border-color:#0dcaf0}.btn-warning{color:#000;background-color:#ffc107;border-color:#ffc107}.btn-warning:hover{color:#000;background-color:#ffca2c;border-color:#ffc720}.btn-check:focus+.btn-warning,.btn-warning:focus{color:#000;background-color:#ffca2c;border-color:#ffc720;box-shadow:0 0 0 0.25rem rgba(217, 164, 6, 0.5)}.btn-check:checked+.btn-warning,.btn-check:active+.btn-warning,.btn-warning:active,.btn-warning.active,.show>.btn-warning.dropdown-toggle{color:#000;background-color:#ffcd39;border-color:#ffc720}.btn-check:checked+.btn-warning:focus,.btn-check:active+.btn-warning:focus,.btn-warning:active:focus,.btn-warning.active:focus,.show>.btn-warning.dropdown-toggle:focus{box-shadow:0 0 0 0.25rem rgba(217, 164, 6, 0.5)}.btn-warning:disabled,.btn-warning.disabled{color:#000;background-color:#ffc107;border-color:#ffc107}.btn-danger{color:#fff;background-color:#dc3545;border-color:#dc3545}.btn-danger:hover{color:#fff;background-color:#bb2d3b;border-color:#b02a37}.btn-check:focus+.btn-danger,.btn-danger:focus{color:#fff;background-color:#bb2d3b;border-color:#b02a37;box-shadow:0 0 0 0.25rem rgba(225, 83, 97, 0.5)}.btn-check:checked+.btn-danger,.btn-check:active+.btn-danger,.btn-danger:active,.btn-danger.active,.show>.btn-danger.dropdown-toggle{color:#fff;background-color:#b02a37;border-color:#a52834}.btn-check:checked+.btn-danger:focus,.btn-check:active+.btn-danger:focus,.btn-danger:active:focus,.btn-danger.active:focus,.show>.btn-danger.dropdown-toggle:focus{box-shadow:0 0 0 0.25rem rgba(225, 83, 97, 0.5)}.btn-danger:disabled,.btn-danger.disabled{color:#fff;background-color:#dc3545;border-color:#dc3545}.btn-light{color:#000;background-color:#f8f9fa;border-color:#f8f9fa}.btn-light:hover{color:#000;background-color:#f9fafb;border-color:#f9fafb}.btn-check:focus+.btn-light,.btn-light:focus{color:#000;background-color:#f9fafb;border-color:#f9fafb;box-shadow:0 0 0 0.25rem rgba(211, 212, 213, 0.5)}.btn-check:checked+.btn-light,.btn-check:active+.btn-light,.btn-light:active,.btn-light.active,.show>.btn-light.dropdown-toggle{color:#000;background-color:#f9fafb;border-color:#f9fafb}.btn-check:checked+.btn-light:focus,.btn-check:active+.btn-light:focus,.btn-light:active:focus,.btn-light.active:focus,.show>.btn-light.dropdown-toggle:focus{box-shadow:0 0 0 0.25rem rgba(211, 212, 213, 0.5)}.btn-light:disabled,.btn-light.disabled{color:#000;background-color:#f8f9fa;border-color:#f8f9fa}.btn-dark{color:#fff;background-color:#212529;border-color:#212529}.btn-dark:hover{color:#fff;background-color:#1c1f23;border-color:#1a1e21}.btn-check:focus+.btn-dark,.btn-dark:focus{color:#fff;background-color:#1c1f23;border-color:#1a1e21;box-shadow:0 0 0 0.25rem rgba(66, 70, 73, 0.5)}.btn-check:checked+.btn-dark,.btn-check:active+.btn-dark,.btn-dark:active,.btn-dark.active,.show>.btn-dark.dropdown-toggle{color:#fff;background-color:#1a1e21;border-color:#191c1f}.btn-check:checked+.btn-dark:focus,.btn-check:active+.btn-dark:focus,.btn-dark:active:focus,.btn-dark.active:focus,.show>.btn-dark.dropdown-toggle:focus{box-shadow:0 0 0 0.25rem rgba(66, 70, 73, 0.5)}.btn-dark:disabled,.btn-dark.disabled{color:#fff;background-color:#212529;border-color:#212529}.btn-outline-primary{color:#0d6efd;border-color:#0d6efd}.btn-outline-primary:hover{color:#fff;background-color:#0d6efd;border-color:#0d6efd}.btn-check:focus+.btn-outline-primary,.btn-outline-primary:focus{box-shadow:0 0 0 0.25rem rgba(13, 110, 253, 0.5)}.btn-check:checked+.btn-outline-primary,.btn-check:active+.btn-outline-primary,.btn-outline-primary:active,.btn-outline-primary.active,.btn-outline-primary.dropdown-toggle.show{color:#fff;background-color:#0d6efd;border-color:#0d6efd}.btn-check:checked+.btn-outline-primary:focus,.btn-check:active+.btn-outline-primary:focus,.btn-outline-primary:active:focus,.btn-outline-primary.active:focus,.btn-outline-primary.dropdown-toggle.show:focus{box-shadow:0 0 0 0.25rem rgba(13, 110, 253, 0.5)}.btn-outline-primary:disabled,.btn-outline-primary.disabled{color:#0d6efd;background-color:transparent}.btn-outline-secondary{color:#6c757d;border-color:#6c757d}.btn-outline-secondary:hover{color:#fff;background-color:#6c757d;border-color:#6c757d}.btn-check:focus+.btn-outline-secondary,.btn-outline-secondary:focus{box-shadow:0 0 0 0.25rem rgba(108, 117, 125, 0.5)}.btn-check:checked+.btn-outline-secondary,.btn-check:active+.btn-outline-secondary,.btn-outline-secondary:active,.btn-outline-secondary.active,.btn-outline-secondary.dropdown-toggle.show{color:#fff;background-color:#6c757d;border-color:#6c757d}.btn-check:checked+.btn-outline-secondary:focus,.btn-check:active+.btn-outline-secondary:focus,.btn-outline-secondary:active:focus,.btn-outline-secondary.active:focus,.btn-outline-secondary.dropdown-toggle.show:focus{box-shadow:0 0 0 0.25rem rgba(108, 117, 125, 0.5)}.btn-outline-secondary:disabled,.btn-outline-secondary.disabled{color:#6c757d;background-color:transparent}.btn-outline-success{color:#198754;border-color:#198754}.btn-outline-success:hover{color:#fff;background-color:#198754;border-color:#198754}.btn-check:focus+.btn-outline-success,.btn-outline-success:focus{box-shadow:0 0 0 0.25rem rgba(25, 135, 84, 0.5)}.btn-check:checked+.btn-outline-success,.btn-check:active+.btn-outline-success,.btn-outline-success:active,.btn-outline-success.active,.btn-outline-success.dropdown-toggle.show{color:#fff;background-color:#198754;border-color:#198754}.btn-check:checked+.btn-outline-success:focus,.btn-check:active+.btn-outline-success:focus,.btn-outline-success:active:focus,.btn-outline-success.active:focus,.btn-outline-success.dropdown-toggle.show:focus{box-shadow:0 0 0 0.25rem rgba(25, 135, 84, 0.5)}.btn-outline-success:disabled,.btn-outline-success.disabled{color:#198754;background-color:transparent}.btn-outline-info{color:#0dcaf0;border-color:#0dcaf0}.btn-outline-info:hover{color:#000;background-color:#0dcaf0;border-color:#0dcaf0}.btn-check:focus+.btn-outline-info,.btn-outline-info:focus{box-shadow:0 0 0 0.25rem rgba(13, 202, 240, 0.5)}.btn-check:checked+.btn-outline-info,.btn-check:active+.btn-outline-info,.btn-outline-info:active,.btn-outline-info.active,.btn-outline-info.dropdown-toggle.show{color:#000;background-color:#0dcaf0;border-color:#0dcaf0}.btn-check:checked+.btn-outline-info:focus,.btn-check:active+.btn-outline-info:focus,.btn-outline-info:active:focus,.btn-outline-info.active:focus,.btn-outline-info.dropdown-toggle.show:focus{box-shadow:0 0 0 0.25rem rgba(13, 202, 240, 0.5)}.btn-outline-info:disabled,.btn-outline-info.disabled{color:#0dcaf0;background-color:transparent}.btn-outline-warning{color:#ffc107;border-color:#ffc107}.btn-outline-warning:hover{color:#000;background-color:#ffc107;border-color:#ffc107}.btn-check:focus+.btn-outline-warning,.btn-outline-warning:focus{box-shadow:0 0 0 0.25rem rgba(255, 193, 7, 0.5)}.btn-check:checked+.btn-outline-warning,.btn-check:active+.btn-outline-warning,.btn-outline-warning:active,.btn-outline-warning.active,.btn-outline-warning.dropdown-toggle.show{color:#000;background-color:#ffc107;border-color:#ffc107}.btn-check:checked+.btn-outline-warning:focus,.btn-check:active+.btn-outline-warning:focus,.btn-outline-warning:active:focus,.btn-outline-warning.active:focus,.btn-outline-warning.dropdown-toggle.show:focus{box-shadow:0 0 0 0.25rem rgba(255, 193, 7, 0.5)}.btn-outline-warning:disabled,.btn-outline-warning.disabled{color:#ffc107;background-color:transparent}.btn-outline-danger{color:#dc3545;border-color:#dc3545}.btn-outline-danger:hover{color:#fff;background-color:#dc3545;border-color:#dc3545}.btn-check:focus+.btn-outline-danger,.btn-outline-danger:focus{box-shadow:0 0 0 0.25rem rgba(220, 53, 69, 0.5)}.btn-check:checked+.btn-outline-danger,.btn-check:active+.btn-outline-danger,.btn-outline-danger:active,.btn-outline-danger.active,.btn-outline-danger.dropdown-toggle.show{color:#fff;background-color:#dc3545;border-color:#dc3545}.btn-check:checked+.btn-outline-danger:focus,.btn-check:active+.btn-outline-danger:focus,.btn-outline-danger:active:focus,.btn-outline-danger.active:focus,.btn-outline-danger.dropdown-toggle.show:focus{box-shadow:0 0 0 0.25rem rgba(220, 53, 69, 0.5)}.btn-outline-danger:disabled,.btn-outline-danger.disabled{color:#dc3545;background-color:transparent}.btn-outline-light{color:#f8f9fa;border-color:#f8f9fa}.btn-outline-light:hover{color:#000;background-color:#f8f9fa;border-color:#f8f9fa}.btn-check:focus+.btn-outline-light,.btn-outline-light:focus{box-shadow:0 0 0 0.25rem rgba(248, 249, 250, 0.5)}.btn-check:checked+.btn-outline-light,.btn-check:active+.btn-outline-light,.btn-outline-light:active,.btn-outline-light.active,.btn-outline-light.dropdown-toggle.show{color:#000;background-color:#f8f9fa;border-color:#f8f9fa}.btn-check:checked+.btn-outline-light:focus,.btn-check:active+.btn-outline-light:focus,.btn-outline-light:active:focus,.btn-outline-light.active:focus,.btn-outline-light.dropdown-toggle.show:focus{box-shadow:0 0 0 0.25rem rgba(248, 249, 250, 0.5)}.btn-outline-light:disabled,.btn-outline-light.disabled{color:#f8f9fa;background-color:transparent}.btn-outline-dark{color:#212529;border-color:#212529}.btn-outline-dark:hover{color:#fff;background-color:#212529;border-color:#212529}.btn-check:focus+.btn-outline-dark,.btn-outline-dark:focus{box-shadow:0 0 0 0.25rem rgba(33, 37, 41, 0.5)}.btn-check:checked+.btn-outline-dark,.btn-check:active+.btn-outline-dark,.btn-outline-dark:active,.btn-outline-dark.active,.btn-outline-dark.dropdown-toggle.show{color:#fff;background-color:#212529;border-color:#212529}.btn-check:checked+.btn-outline-dark:focus,.btn-check:active+.btn-outline-dark:focus,.btn-outline-dark:active:focus,.btn-outline-dark.active:focus,.btn-outline-dark.dropdown-toggle.show:focus{box-shadow:0 0 0 0.25rem rgba(33, 37, 41, 0.5)}.btn-outline-dark:disabled,.btn-outline-dark.disabled{color:#212529;background-color:transparent}.btn-link{font-weight:400;color:#0d6efd;text-decoration:underline}.btn-link:hover{color:#0a58ca}.btn-link:disabled,.btn-link.disabled{color:#6c757d}.btn-lg,.btn-group-lg>.btn{padding:0.5rem 1rem;font-size:1.25rem;border-radius:0.3rem}.btn-sm,.btn-group-sm>.btn{padding:0.25rem 0.5rem;font-size:0.875rem;border-radius:0.2rem}.btn-group,.btn-group-vertical{position:relative;display:inline-flex;vertical-align:middle}.btn-group>.btn,.btn-group-vertical>.btn{position:relative;flex:1 1 auto}.btn-group>.btn-check:checked+.btn,.btn-group>.btn-check:focus+.btn,.btn-group>.btn:hover,.btn-group>.btn:focus,.btn-group>.btn:active,.btn-group>.btn.active,.btn-group-vertical>.btn-check:checked+.btn,.btn-group-vertical>.btn-check:focus+.btn,.btn-group-vertical>.btn:hover,.btn-group-vertical>.btn:focus,.btn-group-vertical>.btn:active,.btn-group-vertical>.btn.active{z-index:1}.btn-toolbar{display:flex;flex-wrap:wrap;justify-content:flex-start}.btn-toolbar .input-group{width:auto}.btn-group>.btn:not(:first-child),.btn-group>.btn-group:not(:first-child){margin-left:-1px}.btn-group>.btn:not(:last-child):not(.dropdown-toggle),.btn-group>.btn-group:not(:last-child)>.btn{border-top-right-radius:0;border-bottom-right-radius:0}.btn-group>.btn:nth-child(n+3),.btn-group>:not(.btn-check)+.btn,.btn-group>.btn-group:not(:first-child)>.btn{border-top-left-radius:0;border-bottom-left-radius:0}.dropdown-toggle-split{padding-right:0.5625rem;padding-left:0.5625rem}.dropdown-toggle-split::after,.dropup .dropdown-toggle-split::after,.dropright .dropdown-toggle-split::after{margin-left:0}.dropleft .dropdown-toggle-split::before{margin-right:0}.btn-sm+.dropdown-toggle-split,.btn-group-sm>.btn+.dropdown-toggle-split{padding-right:0.375rem;padding-left:0.375rem}.btn-lg+.dropdown-toggle-split,.btn-group-lg>.btn+.dropdown-toggle-split{padding-right:0.75rem;padding-left:0.75rem}.btn-group-vertical{flex-direction:column;align-items:flex-start;justify-content:center}.btn-group-vertical>.btn,.btn-group-vertical>.btn-group{width:100%}.btn-group-vertical>.btn:not(:first-child),.btn-group-vertical>.btn-group:not(:first-child){margin-top:-1px}.btn-group-vertical>.btn:not(:last-child):not(.dropdown-toggle),.btn-group-vertical>.btn-group:not(:last-child)>.btn{border-bottom-right-radius:0;border-bottom-left-radius:0}.btn-group-vertical>.btn:not(:first-child),.btn-group-vertical>.btn-group:not(:first-child)>.btn{border-top-left-radius:0;border-top-right-radius:0}.card{position:relative;display:flex;flex-direction:column;min-width:0;word-wrap:break-word;background-color:#fff;background-clip:border-box;border:1px solid rgba(0, 0, 0, 0.125);border-radius:var(--atomic-border-radius, 0.25rem)}.card>hr{margin-right:0;margin-left:0}.card>.list-group{border-top:inherit;border-bottom:inherit}.card>.list-group:first-child{border-top-width:0;border-top-left-radius:calc(var(--atomic-border-radius, 0.25rem) - 1px);border-top-right-radius:calc(var(--atomic-border-radius, 0.25rem) - 1px)}.card>.list-group:last-child{border-bottom-width:0;border-bottom-right-radius:calc(var(--atomic-border-radius, 0.25rem) - 1px);border-bottom-left-radius:calc(var(--atomic-border-radius, 0.25rem) - 1px)}.card>.card-header+.list-group,.card>.list-group+.card-footer{border-top:0}.card-body{flex:1 1 auto;padding:1rem 1rem}.card-title{margin-bottom:0.5rem}.card-subtitle{margin-top:-0.25rem;margin-bottom:0}.card-text:last-child{margin-bottom:0}.card-link:hover{text-decoration:none}.card-link+.card-link{margin-left:1rem}.card-header{padding:0.5rem 1rem;margin-bottom:0;background-color:rgba(0, 0, 0, 0.03);border-bottom:1px solid rgba(0, 0, 0, 0.125)}.card-header:first-child{border-radius:calc(var(--atomic-border-radius, 0.25rem) - 1px) calc(var(--atomic-border-radius, 0.25rem) - 1px) 0 0}.card-footer{padding:0.5rem 1rem;background-color:rgba(0, 0, 0, 0.03);border-top:1px solid rgba(0, 0, 0, 0.125)}.card-footer:last-child{border-radius:0 0 calc(var(--atomic-border-radius, 0.25rem) - 1px) calc(var(--atomic-border-radius, 0.25rem) - 1px)}.card-header-tabs{margin-right:-0.5rem;margin-bottom:-0.5rem;margin-left:-0.5rem;border-bottom:0}.card-header-pills{margin-right:-0.5rem;margin-left:-0.5rem}.card-img-overlay{position:absolute;top:0;right:0;bottom:0;left:0;padding:1rem;border-radius:calc(var(--atomic-border-radius, 0.25rem) - 1px)}.card-img,.card-img-top,.card-img-bottom{width:100%}.card-img,.card-img-top{border-top-left-radius:calc(var(--atomic-border-radius, 0.25rem) - 1px);border-top-right-radius:calc(var(--atomic-border-radius, 0.25rem) - 1px)}.card-img,.card-img-bottom{border-bottom-right-radius:calc(var(--atomic-border-radius, 0.25rem) - 1px);border-bottom-left-radius:calc(var(--atomic-border-radius, 0.25rem) - 1px)}.card-group>.card{margin-bottom:0.75rem}@media (min-width: 576px){.card-group{display:flex;flex-flow:row wrap}.card-group>.card{flex:1 0 0%;margin-bottom:0}.card-group>.card+.card{margin-left:0;border-left:0}.card-group>.card:not(:last-child){border-top-right-radius:0;border-bottom-right-radius:0}.card-group>.card:not(:last-child) .card-img-top,.card-group>.card:not(:last-child) .card-header{border-top-right-radius:0}.card-group>.card:not(:last-child) .card-img-bottom,.card-group>.card:not(:last-child) .card-footer{border-bottom-right-radius:0}.card-group>.card:not(:first-child){border-top-left-radius:0;border-bottom-left-radius:0}.card-group>.card:not(:first-child) .card-img-top,.card-group>.card:not(:first-child) .card-header{border-top-left-radius:0}.card-group>.card:not(:first-child) .card-img-bottom,.card-group>.card:not(:first-child) .card-footer{border-bottom-left-radius:0}}.btn-close{box-sizing:content-box;width:1em;height:1em;padding:0.25em 0.25em;color:#000;background:transparent url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3e%3c/svg%3e\") center/1em auto no-repeat;border:0;border-radius:var(--atomic-border-radius, 0.25rem);opacity:0.5}.btn-close:hover{color:#000;text-decoration:none;opacity:0.75}.btn-close:focus{outline:none;box-shadow:0 0 0 0.25rem rgba(13, 110, 253, 0.25);opacity:1}.btn-close:disabled,.btn-close.disabled{pointer-events:none;user-select:none;opacity:0.25}.btn-close-white{filter:invert(1) grayscale(100%) brightness(200%)}.container,.container-fluid,.container-xxl,.container-xl,.container-lg,.container-md,.container-sm{--bs-gutter-x:1.5rem;width:100%;padding-right:calc(var(--bs-gutter-x) / 2);padding-left:calc(var(--bs-gutter-x) / 2);margin-right:auto;margin-left:auto}@media (min-width: 576px){.container-sm,.container{max-width:540px}}@media (min-width: 768px){.container-md,.container-sm,.container{max-width:720px}}@media (min-width: 992px){.container-lg,.container-md,.container-sm,.container{max-width:960px}}@media (min-width: 1200px){.container-xl,.container-lg,.container-md,.container-sm,.container{max-width:1140px}}@media (min-width: 1400px){.container-xxl,.container-xl,.container-lg,.container-md,.container-sm,.container{max-width:1320px}}.row{--bs-gutter-x:1.5rem;--bs-gutter-y:0;display:flex;flex-wrap:wrap;margin-top:calc(var(--bs-gutter-y) * -1);margin-right:calc(var(--bs-gutter-x) / -2);margin-left:calc(var(--bs-gutter-x) / -2)}.row>*{flex-shrink:0;width:100%;max-width:100%;padding-right:calc(var(--bs-gutter-x) / 2);padding-left:calc(var(--bs-gutter-x) / 2);margin-top:var(--bs-gutter-y)}.col{flex:1 0 0%}.row-cols-auto>*{flex:0 0 auto;width:auto}.row-cols-1>*{flex:0 0 auto;width:100%}.row-cols-2>*{flex:0 0 auto;width:50%}.row-cols-3>*{flex:0 0 auto;width:33.3333333333%}.row-cols-4>*{flex:0 0 auto;width:25%}.row-cols-5>*{flex:0 0 auto;width:20%}.row-cols-6>*{flex:0 0 auto;width:16.6666666667%}.col-auto{flex:0 0 auto;width:auto}.col-1{flex:0 0 auto;width:8.3333333333%}.col-2{flex:0 0 auto;width:16.6666666667%}.col-3{flex:0 0 auto;width:25%}.col-4{flex:0 0 auto;width:33.3333333333%}.col-5{flex:0 0 auto;width:41.6666666667%}.col-6{flex:0 0 auto;width:50%}.col-7{flex:0 0 auto;width:58.3333333333%}.col-8{flex:0 0 auto;width:66.6666666667%}.col-9{flex:0 0 auto;width:75%}.col-10{flex:0 0 auto;width:83.3333333333%}.col-11{flex:0 0 auto;width:91.6666666667%}.col-12{flex:0 0 auto;width:100%}.offset-1{margin-left:8.3333333333%}.offset-2{margin-left:16.6666666667%}.offset-3{margin-left:25%}.offset-4{margin-left:33.3333333333%}.offset-5{margin-left:41.6666666667%}.offset-6{margin-left:50%}.offset-7{margin-left:58.3333333333%}.offset-8{margin-left:66.6666666667%}.offset-9{margin-left:75%}.offset-10{margin-left:83.3333333333%}.offset-11{margin-left:91.6666666667%}.g-0,.gx-0{--bs-gutter-x:0}.g-0,.gy-0{--bs-gutter-y:0}.g-1,.gx-1{--bs-gutter-x:0.25rem}.g-1,.gy-1{--bs-gutter-y:0.25rem}.g-2,.gx-2{--bs-gutter-x:0.5rem}.g-2,.gy-2{--bs-gutter-y:0.5rem}.g-3,.gx-3{--bs-gutter-x:1rem}.g-3,.gy-3{--bs-gutter-y:1rem}.g-4,.gx-4{--bs-gutter-x:1.5rem}.g-4,.gy-4{--bs-gutter-y:1.5rem}.g-5,.gx-5{--bs-gutter-x:3rem}.g-5,.gy-5{--bs-gutter-y:3rem}@media (min-width: 576px){.col-sm{flex:1 0 0%}.row-cols-sm-auto>*{flex:0 0 auto;width:auto}.row-cols-sm-1>*{flex:0 0 auto;width:100%}.row-cols-sm-2>*{flex:0 0 auto;width:50%}.row-cols-sm-3>*{flex:0 0 auto;width:33.3333333333%}.row-cols-sm-4>*{flex:0 0 auto;width:25%}.row-cols-sm-5>*{flex:0 0 auto;width:20%}.row-cols-sm-6>*{flex:0 0 auto;width:16.6666666667%}.col-sm-auto{flex:0 0 auto;width:auto}.col-sm-1{flex:0 0 auto;width:8.3333333333%}.col-sm-2{flex:0 0 auto;width:16.6666666667%}.col-sm-3{flex:0 0 auto;width:25%}.col-sm-4{flex:0 0 auto;width:33.3333333333%}.col-sm-5{flex:0 0 auto;width:41.6666666667%}.col-sm-6{flex:0 0 auto;width:50%}.col-sm-7{flex:0 0 auto;width:58.3333333333%}.col-sm-8{flex:0 0 auto;width:66.6666666667%}.col-sm-9{flex:0 0 auto;width:75%}.col-sm-10{flex:0 0 auto;width:83.3333333333%}.col-sm-11{flex:0 0 auto;width:91.6666666667%}.col-sm-12{flex:0 0 auto;width:100%}.offset-sm-0{margin-left:0}.offset-sm-1{margin-left:8.3333333333%}.offset-sm-2{margin-left:16.6666666667%}.offset-sm-3{margin-left:25%}.offset-sm-4{margin-left:33.3333333333%}.offset-sm-5{margin-left:41.6666666667%}.offset-sm-6{margin-left:50%}.offset-sm-7{margin-left:58.3333333333%}.offset-sm-8{margin-left:66.6666666667%}.offset-sm-9{margin-left:75%}.offset-sm-10{margin-left:83.3333333333%}.offset-sm-11{margin-left:91.6666666667%}.g-sm-0,.gx-sm-0{--bs-gutter-x:0}.g-sm-0,.gy-sm-0{--bs-gutter-y:0}.g-sm-1,.gx-sm-1{--bs-gutter-x:0.25rem}.g-sm-1,.gy-sm-1{--bs-gutter-y:0.25rem}.g-sm-2,.gx-sm-2{--bs-gutter-x:0.5rem}.g-sm-2,.gy-sm-2{--bs-gutter-y:0.5rem}.g-sm-3,.gx-sm-3{--bs-gutter-x:1rem}.g-sm-3,.gy-sm-3{--bs-gutter-y:1rem}.g-sm-4,.gx-sm-4{--bs-gutter-x:1.5rem}.g-sm-4,.gy-sm-4{--bs-gutter-y:1.5rem}.g-sm-5,.gx-sm-5{--bs-gutter-x:3rem}.g-sm-5,.gy-sm-5{--bs-gutter-y:3rem}}@media (min-width: 768px){.col-md{flex:1 0 0%}.row-cols-md-auto>*{flex:0 0 auto;width:auto}.row-cols-md-1>*{flex:0 0 auto;width:100%}.row-cols-md-2>*{flex:0 0 auto;width:50%}.row-cols-md-3>*{flex:0 0 auto;width:33.3333333333%}.row-cols-md-4>*{flex:0 0 auto;width:25%}.row-cols-md-5>*{flex:0 0 auto;width:20%}.row-cols-md-6>*{flex:0 0 auto;width:16.6666666667%}.col-md-auto{flex:0 0 auto;width:auto}.col-md-1{flex:0 0 auto;width:8.3333333333%}.col-md-2{flex:0 0 auto;width:16.6666666667%}.col-md-3{flex:0 0 auto;width:25%}.col-md-4{flex:0 0 auto;width:33.3333333333%}.col-md-5{flex:0 0 auto;width:41.6666666667%}.col-md-6{flex:0 0 auto;width:50%}.col-md-7{flex:0 0 auto;width:58.3333333333%}.col-md-8{flex:0 0 auto;width:66.6666666667%}.col-md-9{flex:0 0 auto;width:75%}.col-md-10{flex:0 0 auto;width:83.3333333333%}.col-md-11{flex:0 0 auto;width:91.6666666667%}.col-md-12{flex:0 0 auto;width:100%}.offset-md-0{margin-left:0}.offset-md-1{margin-left:8.3333333333%}.offset-md-2{margin-left:16.6666666667%}.offset-md-3{margin-left:25%}.offset-md-4{margin-left:33.3333333333%}.offset-md-5{margin-left:41.6666666667%}.offset-md-6{margin-left:50%}.offset-md-7{margin-left:58.3333333333%}.offset-md-8{margin-left:66.6666666667%}.offset-md-9{margin-left:75%}.offset-md-10{margin-left:83.3333333333%}.offset-md-11{margin-left:91.6666666667%}.g-md-0,.gx-md-0{--bs-gutter-x:0}.g-md-0,.gy-md-0{--bs-gutter-y:0}.g-md-1,.gx-md-1{--bs-gutter-x:0.25rem}.g-md-1,.gy-md-1{--bs-gutter-y:0.25rem}.g-md-2,.gx-md-2{--bs-gutter-x:0.5rem}.g-md-2,.gy-md-2{--bs-gutter-y:0.5rem}.g-md-3,.gx-md-3{--bs-gutter-x:1rem}.g-md-3,.gy-md-3{--bs-gutter-y:1rem}.g-md-4,.gx-md-4{--bs-gutter-x:1.5rem}.g-md-4,.gy-md-4{--bs-gutter-y:1.5rem}.g-md-5,.gx-md-5{--bs-gutter-x:3rem}.g-md-5,.gy-md-5{--bs-gutter-y:3rem}}@media (min-width: 992px){.col-lg{flex:1 0 0%}.row-cols-lg-auto>*{flex:0 0 auto;width:auto}.row-cols-lg-1>*{flex:0 0 auto;width:100%}.row-cols-lg-2>*{flex:0 0 auto;width:50%}.row-cols-lg-3>*{flex:0 0 auto;width:33.3333333333%}.row-cols-lg-4>*{flex:0 0 auto;width:25%}.row-cols-lg-5>*{flex:0 0 auto;width:20%}.row-cols-lg-6>*{flex:0 0 auto;width:16.6666666667%}.col-lg-auto{flex:0 0 auto;width:auto}.col-lg-1{flex:0 0 auto;width:8.3333333333%}.col-lg-2{flex:0 0 auto;width:16.6666666667%}.col-lg-3{flex:0 0 auto;width:25%}.col-lg-4{flex:0 0 auto;width:33.3333333333%}.col-lg-5{flex:0 0 auto;width:41.6666666667%}.col-lg-6{flex:0 0 auto;width:50%}.col-lg-7{flex:0 0 auto;width:58.3333333333%}.col-lg-8{flex:0 0 auto;width:66.6666666667%}.col-lg-9{flex:0 0 auto;width:75%}.col-lg-10{flex:0 0 auto;width:83.3333333333%}.col-lg-11{flex:0 0 auto;width:91.6666666667%}.col-lg-12{flex:0 0 auto;width:100%}.offset-lg-0{margin-left:0}.offset-lg-1{margin-left:8.3333333333%}.offset-lg-2{margin-left:16.6666666667%}.offset-lg-3{margin-left:25%}.offset-lg-4{margin-left:33.3333333333%}.offset-lg-5{margin-left:41.6666666667%}.offset-lg-6{margin-left:50%}.offset-lg-7{margin-left:58.3333333333%}.offset-lg-8{margin-left:66.6666666667%}.offset-lg-9{margin-left:75%}.offset-lg-10{margin-left:83.3333333333%}.offset-lg-11{margin-left:91.6666666667%}.g-lg-0,.gx-lg-0{--bs-gutter-x:0}.g-lg-0,.gy-lg-0{--bs-gutter-y:0}.g-lg-1,.gx-lg-1{--bs-gutter-x:0.25rem}.g-lg-1,.gy-lg-1{--bs-gutter-y:0.25rem}.g-lg-2,.gx-lg-2{--bs-gutter-x:0.5rem}.g-lg-2,.gy-lg-2{--bs-gutter-y:0.5rem}.g-lg-3,.gx-lg-3{--bs-gutter-x:1rem}.g-lg-3,.gy-lg-3{--bs-gutter-y:1rem}.g-lg-4,.gx-lg-4{--bs-gutter-x:1.5rem}.g-lg-4,.gy-lg-4{--bs-gutter-y:1.5rem}.g-lg-5,.gx-lg-5{--bs-gutter-x:3rem}.g-lg-5,.gy-lg-5{--bs-gutter-y:3rem}}@media (min-width: 1200px){.col-xl{flex:1 0 0%}.row-cols-xl-auto>*{flex:0 0 auto;width:auto}.row-cols-xl-1>*{flex:0 0 auto;width:100%}.row-cols-xl-2>*{flex:0 0 auto;width:50%}.row-cols-xl-3>*{flex:0 0 auto;width:33.3333333333%}.row-cols-xl-4>*{flex:0 0 auto;width:25%}.row-cols-xl-5>*{flex:0 0 auto;width:20%}.row-cols-xl-6>*{flex:0 0 auto;width:16.6666666667%}.col-xl-auto{flex:0 0 auto;width:auto}.col-xl-1{flex:0 0 auto;width:8.3333333333%}.col-xl-2{flex:0 0 auto;width:16.6666666667%}.col-xl-3{flex:0 0 auto;width:25%}.col-xl-4{flex:0 0 auto;width:33.3333333333%}.col-xl-5{flex:0 0 auto;width:41.6666666667%}.col-xl-6{flex:0 0 auto;width:50%}.col-xl-7{flex:0 0 auto;width:58.3333333333%}.col-xl-8{flex:0 0 auto;width:66.6666666667%}.col-xl-9{flex:0 0 auto;width:75%}.col-xl-10{flex:0 0 auto;width:83.3333333333%}.col-xl-11{flex:0 0 auto;width:91.6666666667%}.col-xl-12{flex:0 0 auto;width:100%}.offset-xl-0{margin-left:0}.offset-xl-1{margin-left:8.3333333333%}.offset-xl-2{margin-left:16.6666666667%}.offset-xl-3{margin-left:25%}.offset-xl-4{margin-left:33.3333333333%}.offset-xl-5{margin-left:41.6666666667%}.offset-xl-6{margin-left:50%}.offset-xl-7{margin-left:58.3333333333%}.offset-xl-8{margin-left:66.6666666667%}.offset-xl-9{margin-left:75%}.offset-xl-10{margin-left:83.3333333333%}.offset-xl-11{margin-left:91.6666666667%}.g-xl-0,.gx-xl-0{--bs-gutter-x:0}.g-xl-0,.gy-xl-0{--bs-gutter-y:0}.g-xl-1,.gx-xl-1{--bs-gutter-x:0.25rem}.g-xl-1,.gy-xl-1{--bs-gutter-y:0.25rem}.g-xl-2,.gx-xl-2{--bs-gutter-x:0.5rem}.g-xl-2,.gy-xl-2{--bs-gutter-y:0.5rem}.g-xl-3,.gx-xl-3{--bs-gutter-x:1rem}.g-xl-3,.gy-xl-3{--bs-gutter-y:1rem}.g-xl-4,.gx-xl-4{--bs-gutter-x:1.5rem}.g-xl-4,.gy-xl-4{--bs-gutter-y:1.5rem}.g-xl-5,.gx-xl-5{--bs-gutter-x:3rem}.g-xl-5,.gy-xl-5{--bs-gutter-y:3rem}}@media (min-width: 1400px){.col-xxl{flex:1 0 0%}.row-cols-xxl-auto>*{flex:0 0 auto;width:auto}.row-cols-xxl-1>*{flex:0 0 auto;width:100%}.row-cols-xxl-2>*{flex:0 0 auto;width:50%}.row-cols-xxl-3>*{flex:0 0 auto;width:33.3333333333%}.row-cols-xxl-4>*{flex:0 0 auto;width:25%}.row-cols-xxl-5>*{flex:0 0 auto;width:20%}.row-cols-xxl-6>*{flex:0 0 auto;width:16.6666666667%}.col-xxl-auto{flex:0 0 auto;width:auto}.col-xxl-1{flex:0 0 auto;width:8.3333333333%}.col-xxl-2{flex:0 0 auto;width:16.6666666667%}.col-xxl-3{flex:0 0 auto;width:25%}.col-xxl-4{flex:0 0 auto;width:33.3333333333%}.col-xxl-5{flex:0 0 auto;width:41.6666666667%}.col-xxl-6{flex:0 0 auto;width:50%}.col-xxl-7{flex:0 0 auto;width:58.3333333333%}.col-xxl-8{flex:0 0 auto;width:66.6666666667%}.col-xxl-9{flex:0 0 auto;width:75%}.col-xxl-10{flex:0 0 auto;width:83.3333333333%}.col-xxl-11{flex:0 0 auto;width:91.6666666667%}.col-xxl-12{flex:0 0 auto;width:100%}.offset-xxl-0{margin-left:0}.offset-xxl-1{margin-left:8.3333333333%}.offset-xxl-2{margin-left:16.6666666667%}.offset-xxl-3{margin-left:25%}.offset-xxl-4{margin-left:33.3333333333%}.offset-xxl-5{margin-left:41.6666666667%}.offset-xxl-6{margin-left:50%}.offset-xxl-7{margin-left:58.3333333333%}.offset-xxl-8{margin-left:66.6666666667%}.offset-xxl-9{margin-left:75%}.offset-xxl-10{margin-left:83.3333333333%}.offset-xxl-11{margin-left:91.6666666667%}.g-xxl-0,.gx-xxl-0{--bs-gutter-x:0}.g-xxl-0,.gy-xxl-0{--bs-gutter-y:0}.g-xxl-1,.gx-xxl-1{--bs-gutter-x:0.25rem}.g-xxl-1,.gy-xxl-1{--bs-gutter-y:0.25rem}.g-xxl-2,.gx-xxl-2{--bs-gutter-x:0.5rem}.g-xxl-2,.gy-xxl-2{--bs-gutter-y:0.5rem}.g-xxl-3,.gx-xxl-3{--bs-gutter-x:1rem}.g-xxl-3,.gy-xxl-3{--bs-gutter-y:1rem}.g-xxl-4,.gx-xxl-4{--bs-gutter-x:1.5rem}.g-xxl-4,.gy-xxl-4{--bs-gutter-y:1.5rem}.g-xxl-5,.gx-xxl-5{--bs-gutter-x:3rem}.g-xxl-5,.gy-xxl-5{--bs-gutter-y:3rem}}.img-fluid{max-width:100%;height:auto}.img-thumbnail{padding:0.25rem;background-color:#fff;border:1px solid #dee2e6;border-radius:var(--atomic-border-radius, 0.25rem);max-width:100%;height:auto}.figure{display:inline-block}.figure-img{margin-bottom:0.5rem;line-height:1}.figure-caption{font-size:0.875em;color:#6c757d}.table{--bs-table-bg:transparent;--bs-table-accent-bg:transparent;--bs-table-striped-color:#212529;--bs-table-striped-bg:rgba(0, 0, 0, 0.05);--bs-table-active-color:#212529;--bs-table-active-bg:rgba(0, 0, 0, 0.1);--bs-table-hover-color:#212529;--bs-table-hover-bg:rgba(0, 0, 0, 0.075);width:100%;margin-bottom:1rem;color:#212529;vertical-align:top;border-color:#dee2e6}.table>:not(caption)>*>*{padding:0.5rem 0.5rem;background-color:var(--bs-table-bg);background-image:linear-gradient(var(--bs-table-accent-bg), var(--bs-table-accent-bg));border-bottom-width:1px}.table>tbody{vertical-align:inherit}.table>thead{vertical-align:bottom}.table>:not(:last-child)>:last-child>*{border-bottom-color:currentColor}.caption-top{caption-side:top}.table-sm>:not(caption)>*>*{padding:0.25rem 0.25rem}.table-bordered>:not(caption)>*{border-width:1px 0}.table-bordered>:not(caption)>*>*{border-width:0 1px}.table-borderless>:not(caption)>*>*{border-bottom-width:0}.table-striped>tbody>tr:nth-of-type(odd){--bs-table-accent-bg:var(--bs-table-striped-bg);color:var(--bs-table-striped-color)}.table-active{--bs-table-accent-bg:var(--bs-table-active-bg);color:var(--bs-table-active-color)}.table-hover>tbody>tr:hover{--bs-table-accent-bg:var(--bs-table-hover-bg);color:var(--bs-table-hover-color)}.table-primary{--bs-table-bg:#cfe2ff;--bs-table-striped-bg:#c5d7f2;--bs-table-striped-color:#000;--bs-table-active-bg:#bacbe6;--bs-table-active-color:#000;--bs-table-hover-bg:#bfd1ec;--bs-table-hover-color:#000;color:#000;border-color:#bacbe6}.table-secondary{--bs-table-bg:#e2e3e5;--bs-table-striped-bg:#d7d8da;--bs-table-striped-color:#000;--bs-table-active-bg:#cbccce;--bs-table-active-color:#000;--bs-table-hover-bg:#d1d2d4;--bs-table-hover-color:#000;color:#000;border-color:#cbccce}.table-success{--bs-table-bg:#d1e7dd;--bs-table-striped-bg:#c7dbd2;--bs-table-striped-color:#000;--bs-table-active-bg:#bcd0c7;--bs-table-active-color:#000;--bs-table-hover-bg:#c1d6cc;--bs-table-hover-color:#000;color:#000;border-color:#bcd0c7}.table-info{--bs-table-bg:#cff4fc;--bs-table-striped-bg:#c5e8ef;--bs-table-striped-color:#000;--bs-table-active-bg:#badce3;--bs-table-active-color:#000;--bs-table-hover-bg:#bfe2e9;--bs-table-hover-color:#000;color:#000;border-color:#badce3}.table-warning{--bs-table-bg:#fff3cd;--bs-table-striped-bg:#f2e7c3;--bs-table-striped-color:#000;--bs-table-active-bg:#e6dbb9;--bs-table-active-color:#000;--bs-table-hover-bg:#ece1be;--bs-table-hover-color:#000;color:#000;border-color:#e6dbb9}.table-danger{--bs-table-bg:#f8d7da;--bs-table-striped-bg:#eccccf;--bs-table-striped-color:#000;--bs-table-active-bg:#dfc2c4;--bs-table-active-color:#000;--bs-table-hover-bg:#e5c7ca;--bs-table-hover-color:#000;color:#000;border-color:#dfc2c4}.table-light{--bs-table-bg:#f8f9fa;--bs-table-striped-bg:#ecedee;--bs-table-striped-color:#000;--bs-table-active-bg:#dfe0e1;--bs-table-active-color:#000;--bs-table-hover-bg:#e5e6e7;--bs-table-hover-color:#000;color:#000;border-color:#dfe0e1}.table-dark{--bs-table-bg:#212529;--bs-table-striped-bg:#2c3034;--bs-table-striped-color:#fff;--bs-table-active-bg:#373b3e;--bs-table-active-color:#fff;--bs-table-hover-bg:#323539;--bs-table-hover-color:#fff;color:#fff;border-color:#373b3e}.table-responsive{overflow-x:auto;-webkit-overflow-scrolling:touch}@media (max-width: 575.98px){.table-responsive-sm{overflow-x:auto;-webkit-overflow-scrolling:touch}}@media (max-width: 767.98px){.table-responsive-md{overflow-x:auto;-webkit-overflow-scrolling:touch}}@media (max-width: 991.98px){.table-responsive-lg{overflow-x:auto;-webkit-overflow-scrolling:touch}}@media (max-width: 1199.98px){.table-responsive-xl{overflow-x:auto;-webkit-overflow-scrolling:touch}}@media (max-width: 1399.98px){.table-responsive-xxl{overflow-x:auto;-webkit-overflow-scrolling:touch}}.align-baseline{vertical-align:baseline}.align-top{vertical-align:top}.align-middle{vertical-align:middle}.align-bottom{vertical-align:bottom}.align-text-bottom{vertical-align:text-bottom}.align-text-top{vertical-align:text-top}.float-left{float:left}.float-right{float:right}.float-none{float:none}.overflow-auto{overflow:auto}.overflow-hidden{overflow:hidden}.overflow-visible{overflow:visible}.overflow-scroll{overflow:scroll}.d-inline{display:inline}.d-inline-block{display:inline-block}.d-block{display:block}.d-grid{display:grid}.d-table{display:table}.d-table-row{display:table-row}.d-table-cell{display:table-cell}.d-flex{display:flex}.d-inline-flex{display:inline-flex}.d-none{display:none}.shadow{box-shadow:0 0.5rem 1rem rgba(0, 0, 0, 0.15)}.shadow-sm{box-shadow:0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)}.shadow-lg{box-shadow:0 1rem 3rem rgba(0, 0, 0, 0.175)}.shadow-none{box-shadow:none}.position-static{position:static}.position-relative{position:relative}.position-absolute{position:absolute}.position-fixed{position:fixed}.position-sticky{position:sticky}.top-0{top:0}.top-50{top:50%}.top-100{top:100%}.bottom-0{bottom:0}.bottom-50{bottom:50%}.bottom-100{bottom:100%}.left-0{left:0}.left-50{left:50%}.left-100{left:100%}.right-0{right:0}.right-50{right:50%}.right-100{right:100%}.translate-middle{transform:translateX(-50%) translateY(-50%)}.border{border:1px solid #dee2e6}.border-0{border:0}.border-top{border-top:1px solid #dee2e6}.border-top-0{border-top:0}.border-right{border-right:1px solid #dee2e6}.border-right-0{border-right:0}.border-bottom{border-bottom:1px solid #dee2e6}.border-bottom-0{border-bottom:0}.border-left{border-left:1px solid #dee2e6}.border-left-0{border-left:0}.border-primary{border-color:#0d6efd}.border-secondary{border-color:#6c757d}.border-success{border-color:#198754}.border-info{border-color:#0dcaf0}.border-warning{border-color:#ffc107}.border-danger{border-color:#dc3545}.border-light{border-color:#f8f9fa}.border-dark{border-color:#212529}.border-white{border-color:#fff}.border-0{border-width:0}.border-1{border-width:1px}.border-2{border-width:2px}.border-3{border-width:3px}.border-4{border-width:4px}.border-5{border-width:5px}.w-25{width:25%}.w-50{width:50%}.w-75{width:75%}.w-100{width:100%}.w-auto{width:auto}.mw-100{max-width:100%}.vw-100{width:100vw}.min-vw-100{min-width:100vw}.h-25{height:25%}.h-50{height:50%}.h-75{height:75%}.h-100{height:100%}.h-auto{height:auto}.mh-100{max-height:100%}.vh-100{height:100vh}.min-vh-100{min-height:100vh}.flex-fill{flex:1 1 auto}.flex-row{flex-direction:row}.flex-column{flex-direction:column}.flex-row-reverse{flex-direction:row-reverse}.flex-column-reverse{flex-direction:column-reverse}.flex-grow-0{flex-grow:0}.flex-grow-1{flex-grow:1}.flex-shrink-0{flex-shrink:0}.flex-shrink-1{flex-shrink:1}.flex-wrap{flex-wrap:wrap}.flex-nowrap{flex-wrap:nowrap}.flex-wrap-reverse{flex-wrap:wrap-reverse}.gap-0{gap:0}.gap-1{gap:0.25rem}.gap-2{gap:0.5rem}.gap-3{gap:1rem}.gap-4{gap:1.5rem}.gap-5{gap:3rem}.justify-content-start{justify-content:flex-start}.justify-content-end{justify-content:flex-end}.justify-content-center{justify-content:center}.justify-content-between{justify-content:space-between}.justify-content-around{justify-content:space-around}.justify-content-evenly{justify-content:space-evenly}.align-items-start{align-items:flex-start}.align-items-end{align-items:flex-end}.align-items-center{align-items:center}.align-items-baseline{align-items:baseline}.align-items-stretch{align-items:stretch}.align-content-start{align-content:flex-start}.align-content-end{align-content:flex-end}.align-content-center{align-content:center}.align-content-between{align-content:space-between}.align-content-around{align-content:space-around}.align-content-stretch{align-content:stretch}.align-self-auto{align-self:auto}.align-self-start{align-self:flex-start}.align-self-end{align-self:flex-end}.align-self-center{align-self:center}.align-self-baseline{align-self:baseline}.align-self-stretch{align-self:stretch}.order-first{order:-1}.order-0{order:0}.order-1{order:1}.order-2{order:2}.order-3{order:3}.order-4{order:4}.order-5{order:5}.order-last{order:6}.m-0{margin:0}.m-1{margin:0.25rem}.m-2{margin:0.5rem}.m-3{margin:1rem}.m-4{margin:1.5rem}.m-5{margin:3rem}.m-auto{margin:auto}.mx-0{margin-right:0;margin-left:0}.mx-1{margin-right:0.25rem;margin-left:0.25rem}.mx-2{margin-right:0.5rem;margin-left:0.5rem}.mx-3{margin-right:1rem;margin-left:1rem}.mx-4{margin-right:1.5rem;margin-left:1.5rem}.mx-5{margin-right:3rem;margin-left:3rem}.mx-auto{margin-right:auto;margin-left:auto}.my-0{margin-top:0;margin-bottom:0}.my-1{margin-top:0.25rem;margin-bottom:0.25rem}.my-2{margin-top:0.5rem;margin-bottom:0.5rem}.my-3{margin-top:1rem;margin-bottom:1rem}.my-4{margin-top:1.5rem;margin-bottom:1.5rem}.my-5{margin-top:3rem;margin-bottom:3rem}.my-auto{margin-top:auto;margin-bottom:auto}.mt-0{margin-top:0}.mt-1{margin-top:0.25rem}.mt-2{margin-top:0.5rem}.mt-3{margin-top:1rem}.mt-4{margin-top:1.5rem}.mt-5{margin-top:3rem}.mt-auto{margin-top:auto}.mr-0{margin-right:0}.mr-1{margin-right:0.25rem}.mr-2{margin-right:0.5rem}.mr-3{margin-right:1rem}.mr-4{margin-right:1.5rem}.mr-5{margin-right:3rem}.mr-auto{margin-right:auto}.mb-0{margin-bottom:0}.mb-1{margin-bottom:0.25rem}.mb-2{margin-bottom:0.5rem}.mb-3{margin-bottom:1rem}.mb-4{margin-bottom:1.5rem}.mb-5{margin-bottom:3rem}.mb-auto{margin-bottom:auto}.ml-0{margin-left:0}.ml-1{margin-left:0.25rem}.ml-2{margin-left:0.5rem}.ml-3{margin-left:1rem}.ml-4{margin-left:1.5rem}.ml-5{margin-left:3rem}.ml-auto{margin-left:auto}.p-0{padding:0}.p-1{padding:0.25rem}.p-2{padding:0.5rem}.p-3{padding:1rem}.p-4{padding:1.5rem}.p-5{padding:3rem}.px-0{padding-right:0;padding-left:0}.px-1{padding-right:0.25rem;padding-left:0.25rem}.px-2{padding-right:0.5rem;padding-left:0.5rem}.px-3{padding-right:1rem;padding-left:1rem}.px-4{padding-right:1.5rem;padding-left:1.5rem}.px-5{padding-right:3rem;padding-left:3rem}.py-0{padding-top:0;padding-bottom:0}.py-1{padding-top:0.25rem;padding-bottom:0.25rem}.py-2{padding-top:0.5rem;padding-bottom:0.5rem}.py-3{padding-top:1rem;padding-bottom:1rem}.py-4{padding-top:1.5rem;padding-bottom:1.5rem}.py-5{padding-top:3rem;padding-bottom:3rem}.pt-0{padding-top:0}.pt-1{padding-top:0.25rem}.pt-2{padding-top:0.5rem}.pt-3{padding-top:1rem}.pt-4{padding-top:1.5rem}.pt-5{padding-top:3rem}.pr-0{padding-right:0}.pr-1{padding-right:0.25rem}.pr-2{padding-right:0.5rem}.pr-3{padding-right:1rem}.pr-4{padding-right:1.5rem}.pr-5{padding-right:3rem}.pb-0{padding-bottom:0}.pb-1{padding-bottom:0.25rem}.pb-2{padding-bottom:0.5rem}.pb-3{padding-bottom:1rem}.pb-4{padding-bottom:1.5rem}.pb-5{padding-bottom:3rem}.pl-0{padding-left:0}.pl-1{padding-left:0.25rem}.pl-2{padding-left:0.5rem}.pl-3{padding-left:1rem}.pl-4{padding-left:1.5rem}.pl-5{padding-left:3rem}.fs-1{font-size:calc(1.375rem + 1.5vw)}.fs-2{font-size:calc(1.325rem + 0.9vw)}.fs-3{font-size:calc(1.3rem + 0.6vw)}.fs-4{font-size:calc(1.275rem + 0.3vw)}.fs-5{font-size:1.25rem}.fs-6{font-size:1rem}.fst-italic{font-style:italic}.fst-normal{font-style:normal}.fw-light{font-weight:300}.fw-lighter{font-weight:lighter}.fw-normal{font-weight:400}.fw-bold{font-weight:700}.fw-bolder{font-weight:bolder}.text-lowercase{text-transform:lowercase}.text-uppercase{text-transform:uppercase}.text-capitalize{text-transform:capitalize}.text-left{text-align:left}.text-right{text-align:right}.text-center{text-align:center}.text-primary{color:#0d6efd}.text-secondary{color:#6c757d}.text-success{color:#198754}.text-info{color:#0dcaf0}.text-warning{color:#ffc107}.text-danger{color:#dc3545}.text-light{color:#f8f9fa}.text-dark{color:#212529}.text-white{color:#fff}.text-body{color:#212529}.text-muted{color:#6c757d}.text-black-50{color:rgba(0, 0, 0, 0.5)}.text-white-50{color:rgba(255, 255, 255, 0.5)}.text-reset{color:inherit}.lh-1{line-height:1}.lh-sm{line-height:1.25}.lh-base{line-height:1.5}.lh-lg{line-height:2}.bg-primary{background-color:#0d6efd}.bg-secondary{background-color:#6c757d}.bg-success{background-color:#198754}.bg-info{background-color:#0dcaf0}.bg-warning{background-color:#ffc107}.bg-danger{background-color:#dc3545}.bg-light{background-color:#f8f9fa}.bg-dark{background-color:#212529}.bg-body{background-color:#fff}.bg-white{background-color:#fff}.bg-transparent{background-color:transparent}.bg-gradient{background-image:var(--bs-gradient)}.text-wrap{white-space:normal}.text-nowrap{white-space:nowrap}.text-decoration-none{text-decoration:none}.text-decoration-underline{text-decoration:underline}.text-decoration-line-through{text-decoration:line-through}.text-break{word-wrap:break-word;word-break:break-word}.font-monospace{font-family:var(--bs-font-monospace)}.user-select-all{user-select:all}.user-select-auto{user-select:auto}.user-select-none{user-select:none}.pe-none{pointer-events:none}.pe-auto{pointer-events:auto}.rounded{border-radius:var(--atomic-border-radius, 0.25rem)}.rounded-0{border-radius:0}.rounded-1{border-radius:0.2rem}.rounded-2{border-radius:var(--atomic-border-radius, 0.25rem)}.rounded-3{border-radius:0.3rem}.rounded-circle{border-radius:50%}.rounded-pill{border-radius:50rem}.rounded-top{border-top-left-radius:var(--atomic-border-radius, 0.25rem);border-top-right-radius:var(--atomic-border-radius, 0.25rem)}.rounded-right{border-top-right-radius:var(--atomic-border-radius, 0.25rem);border-bottom-right-radius:var(--atomic-border-radius, 0.25rem)}.rounded-bottom{border-bottom-right-radius:var(--atomic-border-radius, 0.25rem);border-bottom-left-radius:var(--atomic-border-radius, 0.25rem)}.rounded-left{border-bottom-left-radius:var(--atomic-border-radius, 0.25rem);border-top-left-radius:var(--atomic-border-radius, 0.25rem)}.visible{visibility:visible}.invisible{visibility:hidden}@media (min-width: 576px){.float-sm-left{float:left}.float-sm-right{float:right}.float-sm-none{float:none}.d-sm-inline{display:inline}.d-sm-inline-block{display:inline-block}.d-sm-block{display:block}.d-sm-grid{display:grid}.d-sm-table{display:table}.d-sm-table-row{display:table-row}.d-sm-table-cell{display:table-cell}.d-sm-flex{display:flex}.d-sm-inline-flex{display:inline-flex}.d-sm-none{display:none}.flex-sm-fill{flex:1 1 auto}.flex-sm-row{flex-direction:row}.flex-sm-column{flex-direction:column}.flex-sm-row-reverse{flex-direction:row-reverse}.flex-sm-column-reverse{flex-direction:column-reverse}.flex-sm-grow-0{flex-grow:0}.flex-sm-grow-1{flex-grow:1}.flex-sm-shrink-0{flex-shrink:0}.flex-sm-shrink-1{flex-shrink:1}.flex-sm-wrap{flex-wrap:wrap}.flex-sm-nowrap{flex-wrap:nowrap}.flex-sm-wrap-reverse{flex-wrap:wrap-reverse}.gap-sm-0{gap:0}.gap-sm-1{gap:0.25rem}.gap-sm-2{gap:0.5rem}.gap-sm-3{gap:1rem}.gap-sm-4{gap:1.5rem}.gap-sm-5{gap:3rem}.justify-content-sm-start{justify-content:flex-start}.justify-content-sm-end{justify-content:flex-end}.justify-content-sm-center{justify-content:center}.justify-content-sm-between{justify-content:space-between}.justify-content-sm-around{justify-content:space-around}.justify-content-sm-evenly{justify-content:space-evenly}.align-items-sm-start{align-items:flex-start}.align-items-sm-end{align-items:flex-end}.align-items-sm-center{align-items:center}.align-items-sm-baseline{align-items:baseline}.align-items-sm-stretch{align-items:stretch}.align-content-sm-start{align-content:flex-start}.align-content-sm-end{align-content:flex-end}.align-content-sm-center{align-content:center}.align-content-sm-between{align-content:space-between}.align-content-sm-around{align-content:space-around}.align-content-sm-stretch{align-content:stretch}.align-self-sm-auto{align-self:auto}.align-self-sm-start{align-self:flex-start}.align-self-sm-end{align-self:flex-end}.align-self-sm-center{align-self:center}.align-self-sm-baseline{align-self:baseline}.align-self-sm-stretch{align-self:stretch}.order-sm-first{order:-1}.order-sm-0{order:0}.order-sm-1{order:1}.order-sm-2{order:2}.order-sm-3{order:3}.order-sm-4{order:4}.order-sm-5{order:5}.order-sm-last{order:6}.m-sm-0{margin:0}.m-sm-1{margin:0.25rem}.m-sm-2{margin:0.5rem}.m-sm-3{margin:1rem}.m-sm-4{margin:1.5rem}.m-sm-5{margin:3rem}.m-sm-auto{margin:auto}.mx-sm-0{margin-right:0;margin-left:0}.mx-sm-1{margin-right:0.25rem;margin-left:0.25rem}.mx-sm-2{margin-right:0.5rem;margin-left:0.5rem}.mx-sm-3{margin-right:1rem;margin-left:1rem}.mx-sm-4{margin-right:1.5rem;margin-left:1.5rem}.mx-sm-5{margin-right:3rem;margin-left:3rem}.mx-sm-auto{margin-right:auto;margin-left:auto}.my-sm-0{margin-top:0;margin-bottom:0}.my-sm-1{margin-top:0.25rem;margin-bottom:0.25rem}.my-sm-2{margin-top:0.5rem;margin-bottom:0.5rem}.my-sm-3{margin-top:1rem;margin-bottom:1rem}.my-sm-4{margin-top:1.5rem;margin-bottom:1.5rem}.my-sm-5{margin-top:3rem;margin-bottom:3rem}.my-sm-auto{margin-top:auto;margin-bottom:auto}.mt-sm-0{margin-top:0}.mt-sm-1{margin-top:0.25rem}.mt-sm-2{margin-top:0.5rem}.mt-sm-3{margin-top:1rem}.mt-sm-4{margin-top:1.5rem}.mt-sm-5{margin-top:3rem}.mt-sm-auto{margin-top:auto}.mr-sm-0{margin-right:0}.mr-sm-1{margin-right:0.25rem}.mr-sm-2{margin-right:0.5rem}.mr-sm-3{margin-right:1rem}.mr-sm-4{margin-right:1.5rem}.mr-sm-5{margin-right:3rem}.mr-sm-auto{margin-right:auto}.mb-sm-0{margin-bottom:0}.mb-sm-1{margin-bottom:0.25rem}.mb-sm-2{margin-bottom:0.5rem}.mb-sm-3{margin-bottom:1rem}.mb-sm-4{margin-bottom:1.5rem}.mb-sm-5{margin-bottom:3rem}.mb-sm-auto{margin-bottom:auto}.ml-sm-0{margin-left:0}.ml-sm-1{margin-left:0.25rem}.ml-sm-2{margin-left:0.5rem}.ml-sm-3{margin-left:1rem}.ml-sm-4{margin-left:1.5rem}.ml-sm-5{margin-left:3rem}.ml-sm-auto{margin-left:auto}.p-sm-0{padding:0}.p-sm-1{padding:0.25rem}.p-sm-2{padding:0.5rem}.p-sm-3{padding:1rem}.p-sm-4{padding:1.5rem}.p-sm-5{padding:3rem}.px-sm-0{padding-right:0;padding-left:0}.px-sm-1{padding-right:0.25rem;padding-left:0.25rem}.px-sm-2{padding-right:0.5rem;padding-left:0.5rem}.px-sm-3{padding-right:1rem;padding-left:1rem}.px-sm-4{padding-right:1.5rem;padding-left:1.5rem}.px-sm-5{padding-right:3rem;padding-left:3rem}.py-sm-0{padding-top:0;padding-bottom:0}.py-sm-1{padding-top:0.25rem;padding-bottom:0.25rem}.py-sm-2{padding-top:0.5rem;padding-bottom:0.5rem}.py-sm-3{padding-top:1rem;padding-bottom:1rem}.py-sm-4{padding-top:1.5rem;padding-bottom:1.5rem}.py-sm-5{padding-top:3rem;padding-bottom:3rem}.pt-sm-0{padding-top:0}.pt-sm-1{padding-top:0.25rem}.pt-sm-2{padding-top:0.5rem}.pt-sm-3{padding-top:1rem}.pt-sm-4{padding-top:1.5rem}.pt-sm-5{padding-top:3rem}.pr-sm-0{padding-right:0}.pr-sm-1{padding-right:0.25rem}.pr-sm-2{padding-right:0.5rem}.pr-sm-3{padding-right:1rem}.pr-sm-4{padding-right:1.5rem}.pr-sm-5{padding-right:3rem}.pb-sm-0{padding-bottom:0}.pb-sm-1{padding-bottom:0.25rem}.pb-sm-2{padding-bottom:0.5rem}.pb-sm-3{padding-bottom:1rem}.pb-sm-4{padding-bottom:1.5rem}.pb-sm-5{padding-bottom:3rem}.pl-sm-0{padding-left:0}.pl-sm-1{padding-left:0.25rem}.pl-sm-2{padding-left:0.5rem}.pl-sm-3{padding-left:1rem}.pl-sm-4{padding-left:1.5rem}.pl-sm-5{padding-left:3rem}.text-sm-left{text-align:left}.text-sm-right{text-align:right}.text-sm-center{text-align:center}}@media (min-width: 768px){.float-md-left{float:left}.float-md-right{float:right}.float-md-none{float:none}.d-md-inline{display:inline}.d-md-inline-block{display:inline-block}.d-md-block{display:block}.d-md-grid{display:grid}.d-md-table{display:table}.d-md-table-row{display:table-row}.d-md-table-cell{display:table-cell}.d-md-flex{display:flex}.d-md-inline-flex{display:inline-flex}.d-md-none{display:none}.flex-md-fill{flex:1 1 auto}.flex-md-row{flex-direction:row}.flex-md-column{flex-direction:column}.flex-md-row-reverse{flex-direction:row-reverse}.flex-md-column-reverse{flex-direction:column-reverse}.flex-md-grow-0{flex-grow:0}.flex-md-grow-1{flex-grow:1}.flex-md-shrink-0{flex-shrink:0}.flex-md-shrink-1{flex-shrink:1}.flex-md-wrap{flex-wrap:wrap}.flex-md-nowrap{flex-wrap:nowrap}.flex-md-wrap-reverse{flex-wrap:wrap-reverse}.gap-md-0{gap:0}.gap-md-1{gap:0.25rem}.gap-md-2{gap:0.5rem}.gap-md-3{gap:1rem}.gap-md-4{gap:1.5rem}.gap-md-5{gap:3rem}.justify-content-md-start{justify-content:flex-start}.justify-content-md-end{justify-content:flex-end}.justify-content-md-center{justify-content:center}.justify-content-md-between{justify-content:space-between}.justify-content-md-around{justify-content:space-around}.justify-content-md-evenly{justify-content:space-evenly}.align-items-md-start{align-items:flex-start}.align-items-md-end{align-items:flex-end}.align-items-md-center{align-items:center}.align-items-md-baseline{align-items:baseline}.align-items-md-stretch{align-items:stretch}.align-content-md-start{align-content:flex-start}.align-content-md-end{align-content:flex-end}.align-content-md-center{align-content:center}.align-content-md-between{align-content:space-between}.align-content-md-around{align-content:space-around}.align-content-md-stretch{align-content:stretch}.align-self-md-auto{align-self:auto}.align-self-md-start{align-self:flex-start}.align-self-md-end{align-self:flex-end}.align-self-md-center{align-self:center}.align-self-md-baseline{align-self:baseline}.align-self-md-stretch{align-self:stretch}.order-md-first{order:-1}.order-md-0{order:0}.order-md-1{order:1}.order-md-2{order:2}.order-md-3{order:3}.order-md-4{order:4}.order-md-5{order:5}.order-md-last{order:6}.m-md-0{margin:0}.m-md-1{margin:0.25rem}.m-md-2{margin:0.5rem}.m-md-3{margin:1rem}.m-md-4{margin:1.5rem}.m-md-5{margin:3rem}.m-md-auto{margin:auto}.mx-md-0{margin-right:0;margin-left:0}.mx-md-1{margin-right:0.25rem;margin-left:0.25rem}.mx-md-2{margin-right:0.5rem;margin-left:0.5rem}.mx-md-3{margin-right:1rem;margin-left:1rem}.mx-md-4{margin-right:1.5rem;margin-left:1.5rem}.mx-md-5{margin-right:3rem;margin-left:3rem}.mx-md-auto{margin-right:auto;margin-left:auto}.my-md-0{margin-top:0;margin-bottom:0}.my-md-1{margin-top:0.25rem;margin-bottom:0.25rem}.my-md-2{margin-top:0.5rem;margin-bottom:0.5rem}.my-md-3{margin-top:1rem;margin-bottom:1rem}.my-md-4{margin-top:1.5rem;margin-bottom:1.5rem}.my-md-5{margin-top:3rem;margin-bottom:3rem}.my-md-auto{margin-top:auto;margin-bottom:auto}.mt-md-0{margin-top:0}.mt-md-1{margin-top:0.25rem}.mt-md-2{margin-top:0.5rem}.mt-md-3{margin-top:1rem}.mt-md-4{margin-top:1.5rem}.mt-md-5{margin-top:3rem}.mt-md-auto{margin-top:auto}.mr-md-0{margin-right:0}.mr-md-1{margin-right:0.25rem}.mr-md-2{margin-right:0.5rem}.mr-md-3{margin-right:1rem}.mr-md-4{margin-right:1.5rem}.mr-md-5{margin-right:3rem}.mr-md-auto{margin-right:auto}.mb-md-0{margin-bottom:0}.mb-md-1{margin-bottom:0.25rem}.mb-md-2{margin-bottom:0.5rem}.mb-md-3{margin-bottom:1rem}.mb-md-4{margin-bottom:1.5rem}.mb-md-5{margin-bottom:3rem}.mb-md-auto{margin-bottom:auto}.ml-md-0{margin-left:0}.ml-md-1{margin-left:0.25rem}.ml-md-2{margin-left:0.5rem}.ml-md-3{margin-left:1rem}.ml-md-4{margin-left:1.5rem}.ml-md-5{margin-left:3rem}.ml-md-auto{margin-left:auto}.p-md-0{padding:0}.p-md-1{padding:0.25rem}.p-md-2{padding:0.5rem}.p-md-3{padding:1rem}.p-md-4{padding:1.5rem}.p-md-5{padding:3rem}.px-md-0{padding-right:0;padding-left:0}.px-md-1{padding-right:0.25rem;padding-left:0.25rem}.px-md-2{padding-right:0.5rem;padding-left:0.5rem}.px-md-3{padding-right:1rem;padding-left:1rem}.px-md-4{padding-right:1.5rem;padding-left:1.5rem}.px-md-5{padding-right:3rem;padding-left:3rem}.py-md-0{padding-top:0;padding-bottom:0}.py-md-1{padding-top:0.25rem;padding-bottom:0.25rem}.py-md-2{padding-top:0.5rem;padding-bottom:0.5rem}.py-md-3{padding-top:1rem;padding-bottom:1rem}.py-md-4{padding-top:1.5rem;padding-bottom:1.5rem}.py-md-5{padding-top:3rem;padding-bottom:3rem}.pt-md-0{padding-top:0}.pt-md-1{padding-top:0.25rem}.pt-md-2{padding-top:0.5rem}.pt-md-3{padding-top:1rem}.pt-md-4{padding-top:1.5rem}.pt-md-5{padding-top:3rem}.pr-md-0{padding-right:0}.pr-md-1{padding-right:0.25rem}.pr-md-2{padding-right:0.5rem}.pr-md-3{padding-right:1rem}.pr-md-4{padding-right:1.5rem}.pr-md-5{padding-right:3rem}.pb-md-0{padding-bottom:0}.pb-md-1{padding-bottom:0.25rem}.pb-md-2{padding-bottom:0.5rem}.pb-md-3{padding-bottom:1rem}.pb-md-4{padding-bottom:1.5rem}.pb-md-5{padding-bottom:3rem}.pl-md-0{padding-left:0}.pl-md-1{padding-left:0.25rem}.pl-md-2{padding-left:0.5rem}.pl-md-3{padding-left:1rem}.pl-md-4{padding-left:1.5rem}.pl-md-5{padding-left:3rem}.text-md-left{text-align:left}.text-md-right{text-align:right}.text-md-center{text-align:center}}@media (min-width: 992px){.float-lg-left{float:left}.float-lg-right{float:right}.float-lg-none{float:none}.d-lg-inline{display:inline}.d-lg-inline-block{display:inline-block}.d-lg-block{display:block}.d-lg-grid{display:grid}.d-lg-table{display:table}.d-lg-table-row{display:table-row}.d-lg-table-cell{display:table-cell}.d-lg-flex{display:flex}.d-lg-inline-flex{display:inline-flex}.d-lg-none{display:none}.flex-lg-fill{flex:1 1 auto}.flex-lg-row{flex-direction:row}.flex-lg-column{flex-direction:column}.flex-lg-row-reverse{flex-direction:row-reverse}.flex-lg-column-reverse{flex-direction:column-reverse}.flex-lg-grow-0{flex-grow:0}.flex-lg-grow-1{flex-grow:1}.flex-lg-shrink-0{flex-shrink:0}.flex-lg-shrink-1{flex-shrink:1}.flex-lg-wrap{flex-wrap:wrap}.flex-lg-nowrap{flex-wrap:nowrap}.flex-lg-wrap-reverse{flex-wrap:wrap-reverse}.gap-lg-0{gap:0}.gap-lg-1{gap:0.25rem}.gap-lg-2{gap:0.5rem}.gap-lg-3{gap:1rem}.gap-lg-4{gap:1.5rem}.gap-lg-5{gap:3rem}.justify-content-lg-start{justify-content:flex-start}.justify-content-lg-end{justify-content:flex-end}.justify-content-lg-center{justify-content:center}.justify-content-lg-between{justify-content:space-between}.justify-content-lg-around{justify-content:space-around}.justify-content-lg-evenly{justify-content:space-evenly}.align-items-lg-start{align-items:flex-start}.align-items-lg-end{align-items:flex-end}.align-items-lg-center{align-items:center}.align-items-lg-baseline{align-items:baseline}.align-items-lg-stretch{align-items:stretch}.align-content-lg-start{align-content:flex-start}.align-content-lg-end{align-content:flex-end}.align-content-lg-center{align-content:center}.align-content-lg-between{align-content:space-between}.align-content-lg-around{align-content:space-around}.align-content-lg-stretch{align-content:stretch}.align-self-lg-auto{align-self:auto}.align-self-lg-start{align-self:flex-start}.align-self-lg-end{align-self:flex-end}.align-self-lg-center{align-self:center}.align-self-lg-baseline{align-self:baseline}.align-self-lg-stretch{align-self:stretch}.order-lg-first{order:-1}.order-lg-0{order:0}.order-lg-1{order:1}.order-lg-2{order:2}.order-lg-3{order:3}.order-lg-4{order:4}.order-lg-5{order:5}.order-lg-last{order:6}.m-lg-0{margin:0}.m-lg-1{margin:0.25rem}.m-lg-2{margin:0.5rem}.m-lg-3{margin:1rem}.m-lg-4{margin:1.5rem}.m-lg-5{margin:3rem}.m-lg-auto{margin:auto}.mx-lg-0{margin-right:0;margin-left:0}.mx-lg-1{margin-right:0.25rem;margin-left:0.25rem}.mx-lg-2{margin-right:0.5rem;margin-left:0.5rem}.mx-lg-3{margin-right:1rem;margin-left:1rem}.mx-lg-4{margin-right:1.5rem;margin-left:1.5rem}.mx-lg-5{margin-right:3rem;margin-left:3rem}.mx-lg-auto{margin-right:auto;margin-left:auto}.my-lg-0{margin-top:0;margin-bottom:0}.my-lg-1{margin-top:0.25rem;margin-bottom:0.25rem}.my-lg-2{margin-top:0.5rem;margin-bottom:0.5rem}.my-lg-3{margin-top:1rem;margin-bottom:1rem}.my-lg-4{margin-top:1.5rem;margin-bottom:1.5rem}.my-lg-5{margin-top:3rem;margin-bottom:3rem}.my-lg-auto{margin-top:auto;margin-bottom:auto}.mt-lg-0{margin-top:0}.mt-lg-1{margin-top:0.25rem}.mt-lg-2{margin-top:0.5rem}.mt-lg-3{margin-top:1rem}.mt-lg-4{margin-top:1.5rem}.mt-lg-5{margin-top:3rem}.mt-lg-auto{margin-top:auto}.mr-lg-0{margin-right:0}.mr-lg-1{margin-right:0.25rem}.mr-lg-2{margin-right:0.5rem}.mr-lg-3{margin-right:1rem}.mr-lg-4{margin-right:1.5rem}.mr-lg-5{margin-right:3rem}.mr-lg-auto{margin-right:auto}.mb-lg-0{margin-bottom:0}.mb-lg-1{margin-bottom:0.25rem}.mb-lg-2{margin-bottom:0.5rem}.mb-lg-3{margin-bottom:1rem}.mb-lg-4{margin-bottom:1.5rem}.mb-lg-5{margin-bottom:3rem}.mb-lg-auto{margin-bottom:auto}.ml-lg-0{margin-left:0}.ml-lg-1{margin-left:0.25rem}.ml-lg-2{margin-left:0.5rem}.ml-lg-3{margin-left:1rem}.ml-lg-4{margin-left:1.5rem}.ml-lg-5{margin-left:3rem}.ml-lg-auto{margin-left:auto}.p-lg-0{padding:0}.p-lg-1{padding:0.25rem}.p-lg-2{padding:0.5rem}.p-lg-3{padding:1rem}.p-lg-4{padding:1.5rem}.p-lg-5{padding:3rem}.px-lg-0{padding-right:0;padding-left:0}.px-lg-1{padding-right:0.25rem;padding-left:0.25rem}.px-lg-2{padding-right:0.5rem;padding-left:0.5rem}.px-lg-3{padding-right:1rem;padding-left:1rem}.px-lg-4{padding-right:1.5rem;padding-left:1.5rem}.px-lg-5{padding-right:3rem;padding-left:3rem}.py-lg-0{padding-top:0;padding-bottom:0}.py-lg-1{padding-top:0.25rem;padding-bottom:0.25rem}.py-lg-2{padding-top:0.5rem;padding-bottom:0.5rem}.py-lg-3{padding-top:1rem;padding-bottom:1rem}.py-lg-4{padding-top:1.5rem;padding-bottom:1.5rem}.py-lg-5{padding-top:3rem;padding-bottom:3rem}.pt-lg-0{padding-top:0}.pt-lg-1{padding-top:0.25rem}.pt-lg-2{padding-top:0.5rem}.pt-lg-3{padding-top:1rem}.pt-lg-4{padding-top:1.5rem}.pt-lg-5{padding-top:3rem}.pr-lg-0{padding-right:0}.pr-lg-1{padding-right:0.25rem}.pr-lg-2{padding-right:0.5rem}.pr-lg-3{padding-right:1rem}.pr-lg-4{padding-right:1.5rem}.pr-lg-5{padding-right:3rem}.pb-lg-0{padding-bottom:0}.pb-lg-1{padding-bottom:0.25rem}.pb-lg-2{padding-bottom:0.5rem}.pb-lg-3{padding-bottom:1rem}.pb-lg-4{padding-bottom:1.5rem}.pb-lg-5{padding-bottom:3rem}.pl-lg-0{padding-left:0}.pl-lg-1{padding-left:0.25rem}.pl-lg-2{padding-left:0.5rem}.pl-lg-3{padding-left:1rem}.pl-lg-4{padding-left:1.5rem}.pl-lg-5{padding-left:3rem}.text-lg-left{text-align:left}.text-lg-right{text-align:right}.text-lg-center{text-align:center}}@media (min-width: 1200px){.float-xl-left{float:left}.float-xl-right{float:right}.float-xl-none{float:none}.d-xl-inline{display:inline}.d-xl-inline-block{display:inline-block}.d-xl-block{display:block}.d-xl-grid{display:grid}.d-xl-table{display:table}.d-xl-table-row{display:table-row}.d-xl-table-cell{display:table-cell}.d-xl-flex{display:flex}.d-xl-inline-flex{display:inline-flex}.d-xl-none{display:none}.flex-xl-fill{flex:1 1 auto}.flex-xl-row{flex-direction:row}.flex-xl-column{flex-direction:column}.flex-xl-row-reverse{flex-direction:row-reverse}.flex-xl-column-reverse{flex-direction:column-reverse}.flex-xl-grow-0{flex-grow:0}.flex-xl-grow-1{flex-grow:1}.flex-xl-shrink-0{flex-shrink:0}.flex-xl-shrink-1{flex-shrink:1}.flex-xl-wrap{flex-wrap:wrap}.flex-xl-nowrap{flex-wrap:nowrap}.flex-xl-wrap-reverse{flex-wrap:wrap-reverse}.gap-xl-0{gap:0}.gap-xl-1{gap:0.25rem}.gap-xl-2{gap:0.5rem}.gap-xl-3{gap:1rem}.gap-xl-4{gap:1.5rem}.gap-xl-5{gap:3rem}.justify-content-xl-start{justify-content:flex-start}.justify-content-xl-end{justify-content:flex-end}.justify-content-xl-center{justify-content:center}.justify-content-xl-between{justify-content:space-between}.justify-content-xl-around{justify-content:space-around}.justify-content-xl-evenly{justify-content:space-evenly}.align-items-xl-start{align-items:flex-start}.align-items-xl-end{align-items:flex-end}.align-items-xl-center{align-items:center}.align-items-xl-baseline{align-items:baseline}.align-items-xl-stretch{align-items:stretch}.align-content-xl-start{align-content:flex-start}.align-content-xl-end{align-content:flex-end}.align-content-xl-center{align-content:center}.align-content-xl-between{align-content:space-between}.align-content-xl-around{align-content:space-around}.align-content-xl-stretch{align-content:stretch}.align-self-xl-auto{align-self:auto}.align-self-xl-start{align-self:flex-start}.align-self-xl-end{align-self:flex-end}.align-self-xl-center{align-self:center}.align-self-xl-baseline{align-self:baseline}.align-self-xl-stretch{align-self:stretch}.order-xl-first{order:-1}.order-xl-0{order:0}.order-xl-1{order:1}.order-xl-2{order:2}.order-xl-3{order:3}.order-xl-4{order:4}.order-xl-5{order:5}.order-xl-last{order:6}.m-xl-0{margin:0}.m-xl-1{margin:0.25rem}.m-xl-2{margin:0.5rem}.m-xl-3{margin:1rem}.m-xl-4{margin:1.5rem}.m-xl-5{margin:3rem}.m-xl-auto{margin:auto}.mx-xl-0{margin-right:0;margin-left:0}.mx-xl-1{margin-right:0.25rem;margin-left:0.25rem}.mx-xl-2{margin-right:0.5rem;margin-left:0.5rem}.mx-xl-3{margin-right:1rem;margin-left:1rem}.mx-xl-4{margin-right:1.5rem;margin-left:1.5rem}.mx-xl-5{margin-right:3rem;margin-left:3rem}.mx-xl-auto{margin-right:auto;margin-left:auto}.my-xl-0{margin-top:0;margin-bottom:0}.my-xl-1{margin-top:0.25rem;margin-bottom:0.25rem}.my-xl-2{margin-top:0.5rem;margin-bottom:0.5rem}.my-xl-3{margin-top:1rem;margin-bottom:1rem}.my-xl-4{margin-top:1.5rem;margin-bottom:1.5rem}.my-xl-5{margin-top:3rem;margin-bottom:3rem}.my-xl-auto{margin-top:auto;margin-bottom:auto}.mt-xl-0{margin-top:0}.mt-xl-1{margin-top:0.25rem}.mt-xl-2{margin-top:0.5rem}.mt-xl-3{margin-top:1rem}.mt-xl-4{margin-top:1.5rem}.mt-xl-5{margin-top:3rem}.mt-xl-auto{margin-top:auto}.mr-xl-0{margin-right:0}.mr-xl-1{margin-right:0.25rem}.mr-xl-2{margin-right:0.5rem}.mr-xl-3{margin-right:1rem}.mr-xl-4{margin-right:1.5rem}.mr-xl-5{margin-right:3rem}.mr-xl-auto{margin-right:auto}.mb-xl-0{margin-bottom:0}.mb-xl-1{margin-bottom:0.25rem}.mb-xl-2{margin-bottom:0.5rem}.mb-xl-3{margin-bottom:1rem}.mb-xl-4{margin-bottom:1.5rem}.mb-xl-5{margin-bottom:3rem}.mb-xl-auto{margin-bottom:auto}.ml-xl-0{margin-left:0}.ml-xl-1{margin-left:0.25rem}.ml-xl-2{margin-left:0.5rem}.ml-xl-3{margin-left:1rem}.ml-xl-4{margin-left:1.5rem}.ml-xl-5{margin-left:3rem}.ml-xl-auto{margin-left:auto}.p-xl-0{padding:0}.p-xl-1{padding:0.25rem}.p-xl-2{padding:0.5rem}.p-xl-3{padding:1rem}.p-xl-4{padding:1.5rem}.p-xl-5{padding:3rem}.px-xl-0{padding-right:0;padding-left:0}.px-xl-1{padding-right:0.25rem;padding-left:0.25rem}.px-xl-2{padding-right:0.5rem;padding-left:0.5rem}.px-xl-3{padding-right:1rem;padding-left:1rem}.px-xl-4{padding-right:1.5rem;padding-left:1.5rem}.px-xl-5{padding-right:3rem;padding-left:3rem}.py-xl-0{padding-top:0;padding-bottom:0}.py-xl-1{padding-top:0.25rem;padding-bottom:0.25rem}.py-xl-2{padding-top:0.5rem;padding-bottom:0.5rem}.py-xl-3{padding-top:1rem;padding-bottom:1rem}.py-xl-4{padding-top:1.5rem;padding-bottom:1.5rem}.py-xl-5{padding-top:3rem;padding-bottom:3rem}.pt-xl-0{padding-top:0}.pt-xl-1{padding-top:0.25rem}.pt-xl-2{padding-top:0.5rem}.pt-xl-3{padding-top:1rem}.pt-xl-4{padding-top:1.5rem}.pt-xl-5{padding-top:3rem}.pr-xl-0{padding-right:0}.pr-xl-1{padding-right:0.25rem}.pr-xl-2{padding-right:0.5rem}.pr-xl-3{padding-right:1rem}.pr-xl-4{padding-right:1.5rem}.pr-xl-5{padding-right:3rem}.pb-xl-0{padding-bottom:0}.pb-xl-1{padding-bottom:0.25rem}.pb-xl-2{padding-bottom:0.5rem}.pb-xl-3{padding-bottom:1rem}.pb-xl-4{padding-bottom:1.5rem}.pb-xl-5{padding-bottom:3rem}.pl-xl-0{padding-left:0}.pl-xl-1{padding-left:0.25rem}.pl-xl-2{padding-left:0.5rem}.pl-xl-3{padding-left:1rem}.pl-xl-4{padding-left:1.5rem}.pl-xl-5{padding-left:3rem}.text-xl-left{text-align:left}.text-xl-right{text-align:right}.text-xl-center{text-align:center}}@media (min-width: 1400px){.float-xxl-left{float:left}.float-xxl-right{float:right}.float-xxl-none{float:none}.d-xxl-inline{display:inline}.d-xxl-inline-block{display:inline-block}.d-xxl-block{display:block}.d-xxl-grid{display:grid}.d-xxl-table{display:table}.d-xxl-table-row{display:table-row}.d-xxl-table-cell{display:table-cell}.d-xxl-flex{display:flex}.d-xxl-inline-flex{display:inline-flex}.d-xxl-none{display:none}.flex-xxl-fill{flex:1 1 auto}.flex-xxl-row{flex-direction:row}.flex-xxl-column{flex-direction:column}.flex-xxl-row-reverse{flex-direction:row-reverse}.flex-xxl-column-reverse{flex-direction:column-reverse}.flex-xxl-grow-0{flex-grow:0}.flex-xxl-grow-1{flex-grow:1}.flex-xxl-shrink-0{flex-shrink:0}.flex-xxl-shrink-1{flex-shrink:1}.flex-xxl-wrap{flex-wrap:wrap}.flex-xxl-nowrap{flex-wrap:nowrap}.flex-xxl-wrap-reverse{flex-wrap:wrap-reverse}.gap-xxl-0{gap:0}.gap-xxl-1{gap:0.25rem}.gap-xxl-2{gap:0.5rem}.gap-xxl-3{gap:1rem}.gap-xxl-4{gap:1.5rem}.gap-xxl-5{gap:3rem}.justify-content-xxl-start{justify-content:flex-start}.justify-content-xxl-end{justify-content:flex-end}.justify-content-xxl-center{justify-content:center}.justify-content-xxl-between{justify-content:space-between}.justify-content-xxl-around{justify-content:space-around}.justify-content-xxl-evenly{justify-content:space-evenly}.align-items-xxl-start{align-items:flex-start}.align-items-xxl-end{align-items:flex-end}.align-items-xxl-center{align-items:center}.align-items-xxl-baseline{align-items:baseline}.align-items-xxl-stretch{align-items:stretch}.align-content-xxl-start{align-content:flex-start}.align-content-xxl-end{align-content:flex-end}.align-content-xxl-center{align-content:center}.align-content-xxl-between{align-content:space-between}.align-content-xxl-around{align-content:space-around}.align-content-xxl-stretch{align-content:stretch}.align-self-xxl-auto{align-self:auto}.align-self-xxl-start{align-self:flex-start}.align-self-xxl-end{align-self:flex-end}.align-self-xxl-center{align-self:center}.align-self-xxl-baseline{align-self:baseline}.align-self-xxl-stretch{align-self:stretch}.order-xxl-first{order:-1}.order-xxl-0{order:0}.order-xxl-1{order:1}.order-xxl-2{order:2}.order-xxl-3{order:3}.order-xxl-4{order:4}.order-xxl-5{order:5}.order-xxl-last{order:6}.m-xxl-0{margin:0}.m-xxl-1{margin:0.25rem}.m-xxl-2{margin:0.5rem}.m-xxl-3{margin:1rem}.m-xxl-4{margin:1.5rem}.m-xxl-5{margin:3rem}.m-xxl-auto{margin:auto}.mx-xxl-0{margin-right:0;margin-left:0}.mx-xxl-1{margin-right:0.25rem;margin-left:0.25rem}.mx-xxl-2{margin-right:0.5rem;margin-left:0.5rem}.mx-xxl-3{margin-right:1rem;margin-left:1rem}.mx-xxl-4{margin-right:1.5rem;margin-left:1.5rem}.mx-xxl-5{margin-right:3rem;margin-left:3rem}.mx-xxl-auto{margin-right:auto;margin-left:auto}.my-xxl-0{margin-top:0;margin-bottom:0}.my-xxl-1{margin-top:0.25rem;margin-bottom:0.25rem}.my-xxl-2{margin-top:0.5rem;margin-bottom:0.5rem}.my-xxl-3{margin-top:1rem;margin-bottom:1rem}.my-xxl-4{margin-top:1.5rem;margin-bottom:1.5rem}.my-xxl-5{margin-top:3rem;margin-bottom:3rem}.my-xxl-auto{margin-top:auto;margin-bottom:auto}.mt-xxl-0{margin-top:0}.mt-xxl-1{margin-top:0.25rem}.mt-xxl-2{margin-top:0.5rem}.mt-xxl-3{margin-top:1rem}.mt-xxl-4{margin-top:1.5rem}.mt-xxl-5{margin-top:3rem}.mt-xxl-auto{margin-top:auto}.mr-xxl-0{margin-right:0}.mr-xxl-1{margin-right:0.25rem}.mr-xxl-2{margin-right:0.5rem}.mr-xxl-3{margin-right:1rem}.mr-xxl-4{margin-right:1.5rem}.mr-xxl-5{margin-right:3rem}.mr-xxl-auto{margin-right:auto}.mb-xxl-0{margin-bottom:0}.mb-xxl-1{margin-bottom:0.25rem}.mb-xxl-2{margin-bottom:0.5rem}.mb-xxl-3{margin-bottom:1rem}.mb-xxl-4{margin-bottom:1.5rem}.mb-xxl-5{margin-bottom:3rem}.mb-xxl-auto{margin-bottom:auto}.ml-xxl-0{margin-left:0}.ml-xxl-1{margin-left:0.25rem}.ml-xxl-2{margin-left:0.5rem}.ml-xxl-3{margin-left:1rem}.ml-xxl-4{margin-left:1.5rem}.ml-xxl-5{margin-left:3rem}.ml-xxl-auto{margin-left:auto}.p-xxl-0{padding:0}.p-xxl-1{padding:0.25rem}.p-xxl-2{padding:0.5rem}.p-xxl-3{padding:1rem}.p-xxl-4{padding:1.5rem}.p-xxl-5{padding:3rem}.px-xxl-0{padding-right:0;padding-left:0}.px-xxl-1{padding-right:0.25rem;padding-left:0.25rem}.px-xxl-2{padding-right:0.5rem;padding-left:0.5rem}.px-xxl-3{padding-right:1rem;padding-left:1rem}.px-xxl-4{padding-right:1.5rem;padding-left:1.5rem}.px-xxl-5{padding-right:3rem;padding-left:3rem}.py-xxl-0{padding-top:0;padding-bottom:0}.py-xxl-1{padding-top:0.25rem;padding-bottom:0.25rem}.py-xxl-2{padding-top:0.5rem;padding-bottom:0.5rem}.py-xxl-3{padding-top:1rem;padding-bottom:1rem}.py-xxl-4{padding-top:1.5rem;padding-bottom:1.5rem}.py-xxl-5{padding-top:3rem;padding-bottom:3rem}.pt-xxl-0{padding-top:0}.pt-xxl-1{padding-top:0.25rem}.pt-xxl-2{padding-top:0.5rem}.pt-xxl-3{padding-top:1rem}.pt-xxl-4{padding-top:1.5rem}.pt-xxl-5{padding-top:3rem}.pr-xxl-0{padding-right:0}.pr-xxl-1{padding-right:0.25rem}.pr-xxl-2{padding-right:0.5rem}.pr-xxl-3{padding-right:1rem}.pr-xxl-4{padding-right:1.5rem}.pr-xxl-5{padding-right:3rem}.pb-xxl-0{padding-bottom:0}.pb-xxl-1{padding-bottom:0.25rem}.pb-xxl-2{padding-bottom:0.5rem}.pb-xxl-3{padding-bottom:1rem}.pb-xxl-4{padding-bottom:1.5rem}.pb-xxl-5{padding-bottom:3rem}.pl-xxl-0{padding-left:0}.pl-xxl-1{padding-left:0.25rem}.pl-xxl-2{padding-left:0.5rem}.pl-xxl-3{padding-left:1rem}.pl-xxl-4{padding-left:1.5rem}.pl-xxl-5{padding-left:3rem}.text-xxl-left{text-align:left}.text-xxl-right{text-align:right}.text-xxl-center{text-align:center}}@media (min-width: 1200px){.fs-1{font-size:2.5rem}.fs-2{font-size:2rem}.fs-3{font-size:1.75rem}.fs-4{font-size:1.5rem}.fs-sm-1{font-size:2.5rem}.fs-sm-2{font-size:2rem}.fs-sm-3{font-size:1.75rem}.fs-sm-4{font-size:1.5rem}.fs-md-1{font-size:2.5rem}.fs-md-2{font-size:2rem}.fs-md-3{font-size:1.75rem}.fs-md-4{font-size:1.5rem}.fs-lg-1{font-size:2.5rem}.fs-lg-2{font-size:2rem}.fs-lg-3{font-size:1.75rem}.fs-lg-4{font-size:1.5rem}}@media print{.d-print-inline{display:inline}.d-print-inline-block{display:inline-block}.d-print-block{display:block}.d-print-grid{display:grid}.d-print-table{display:table}.d-print-table-row{display:table-row}.d-print-table-cell{display:table-cell}.d-print-flex{display:flex}.d-print-inline-flex{display:inline-flex}.d-print-none{display:none}}.fetch-more-results{display:block;margin-top:18px}";

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
const AtomicResultList = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * Whether to automatically retrieve an additional page of results and append it to the
     * current results when the user scrolls down to the bottom of element
     */
    this.enableInfiniteScroll = false;
    /**
     * Css class for the list wrapper
     */
    this.listClass = '';
    /**
     * Css class for a list element
     */
    this.listElementClass = '';
    this.fieldsToInclude = '';
    this.unsubscribe = () => { };
  }
  get fields() {
    if (this.fieldsToInclude.trim() === '')
      return;
    return this.fieldsToInclude.split(',').map((field) => field.trim());
  }
  initialize() {
    this.resultTemplatesManager = Ml(this.engine);
    this.resultList = Su(this.engine, {
      options: { fieldsToInclude: this.fields },
    });
    this.unsubscribe = this.resultList.subscribe(() => this.updateState());
    this.registerDefaultResultTemplates();
    this.registerChildrenResultTemplates();
  }
  registerDefaultResultTemplates() {
    // TODO: get fields & conditions from default templates
    this.resultTemplatesManager.registerTemplates({
      content: defaultTemplate,
      conditions: [],
    });
  }
  registerChildrenResultTemplates() {
    this.host
      .querySelectorAll('atomic-result-template')
      .forEach(async (resultTemplateElement) => {
      const conditions = await resultTemplateElement.getConditions();
      const fields = await resultTemplateElement.getFields();
      this.resultTemplatesManager.registerTemplates({
        content: resultTemplateElement.innerHTML,
        conditions,
        fields,
        priority: 1,
      });
    });
  }
  disconnectedCallback() {
    this.unsubscribe();
  }
  updateState() {
    this.state = this.resultList.state;
  }
  get results() {
    return this.state.results.map((result) => (h("atomic-result", { key: result.uniqueId, part: "list-element", class: this.listElementClass, result: result, engine: this.engine, innerHTML: mustache.render(this.resultTemplatesManager.selectTemplate(result) || '', result) })));
  }
  // TODO: improve rudimentary infinite scroll, add scroll container option
  handleInfiniteScroll() {
    if (!this.enableInfiniteScroll) {
      return;
    }
    const hasReachedEndOfElement = window.innerHeight + window.scrollY >= this.host.offsetHeight;
    if (hasReachedEndOfElement) {
      this.resultList.fetchMoreResults();
    }
  }
  render() {
    return (h("div", { part: "list", class: this.listClass }, this.results));
  }
  get host() { return getElement(this); }
};
__decorate([
  Initialization()
], AtomicResultList.prototype, "initialize", null);
AtomicResultList.style = atomicResultListCss;

export { AtomicResultList as atomic_result_list };

import { r as registerInstance, h } from './index-3acbf9e0.js';
import { B as Bu } from './headless.esm-fb41148c.js';
import { I as InitializeBindings, a as BindStateToI18n, B as BindStateToController } from './initialization-utils-bdb93b26.js';
import { r as randomID } from './utils-82f7d421.js';

class Combobox {
  constructor(options) {
    this.options = options;
    this.activeDescendant = '';
  }
  onInputChange(e) {
    const value = e.target.value;
    this.options.onChange(value);
  }
  onInputKeyup(e) {
    switch (e.key) {
      case 'Enter':
        this.onSubmit();
        break;
      case 'Escape':
        this.onInputBlur();
        break;
    }
  }
  onSubmit() {
    const activeDescendantElement = this.hasActiveDescendant && this.activeDescendantElement;
    this.updateActiveDescendant();
    if (activeDescendantElement) {
      this.options.onSelectValue(activeDescendantElement);
      return;
    }
    this.options.onSubmit();
  }
  onInputKeydown(e) {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this.focusNextValue();
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.focusPreviousValue();
        break;
    }
  }
  onInputBlur() {
    this.updateActiveDescendant();
    this.options.onBlur();
  }
  updateActiveDescendantElement(activeDescendantElement) {
    if (!activeDescendantElement) {
      return;
    }
    this.updateActiveDescendant(activeDescendantElement.id);
  }
  updateActiveDescendant(activeDescendant = '') {
    this.activeDescendant = activeDescendant;
  }
  get activeDescendantElement() {
    return this.listbox.querySelector(`#${this.activeDescendant}`);
  }
  get hasActiveDescendant() {
    return this.activeDescendant !== '';
  }
  get hasValues() {
    return !!this.listbox.childElementCount;
  }
  focusNextValue() {
    if (!this.hasValues) {
      return;
    }
    this.updateActiveDescendantElement(this.nextOfFirstValue);
    this.updateAccessibilityAttributes();
  }
  get firstValue() {
    return this.listbox.firstElementChild;
  }
  get nextOfFirstValue() {
    var _a;
    if (!this.hasActiveDescendant) {
      return this.firstValue;
    }
    return ((_a = this.activeDescendantElement) === null || _a === void 0 ? void 0 : _a.nextElementSibling) || this.firstValue;
  }
  focusPreviousValue() {
    if (!this.hasValues) {
      return;
    }
    this.updateActiveDescendantElement(this.previousOrLastValue);
    this.updateAccessibilityAttributes();
  }
  get lastValue() {
    return this.listbox.lastElementChild;
  }
  get previousOrLastValue() {
    var _a;
    if (!this.hasActiveDescendant) {
      return this.lastValue;
    }
    return (((_a = this.activeDescendantElement) === null || _a === void 0 ? void 0 : _a.previousElementSibling) || this.lastValue);
  }
  get container() {
    return this.options.containerRef();
  }
  get textbox() {
    return this.options.inputRef();
  }
  get listbox() {
    return this.options.valuesRef();
  }
  get listboxOptions() {
    return this.options.valuesRef().children;
  }
  get emptyOptionId() {
    return `${this.options.id}-empty-option`;
  }
  updateAccessibilityAttributes() {
    this.setAttributes(this.containerAttributes, this.container);
    this.setAttributes(this.textboxAttributes, this.textbox);
    this.setAttributes(this.listboxAttributes, this.listbox);
    this.removeEmptyOptionElement();
    Array.from(this.listboxOptions).forEach((value) => this.updateOption(value));
  }
  updateOption(value) {
    const isActive = value.id === this.activeDescendant;
    this.options.activeClass
      .split(' ')
      .forEach((activeClass) => value.classList.toggle(activeClass, isActive));
    this.setAttributes(this.optionAttributes(isActive, value), value);
  }
  removeEmptyOptionElement() {
    const emptyOptionElement = this.listbox.querySelector(`#${this.emptyOptionId}`);
    emptyOptionElement && emptyOptionElement.remove();
  }
  setAttributes(attributes, element) {
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
  }
  get containerAttributes() {
    return {
      'aria-owns': `${this.options.id}-listbox`,
      role: 'combobox',
      'aria-haspopup': 'listbox',
      'aria-expanded': `${this.hasValues}`,
    };
  }
  get textboxAttributes() {
    return {
      id: `${this.options.id}-textbox`,
      autocomplete: 'off',
      autocapitalize: 'off',
      autocorrect: 'off',
      'aria-autocomplete': 'list',
      'aria-controls': `${this.options.id}-listbox`,
      'aria-activedescendant': this.activeDescendant,
      'aria-label': this.options.strings.searchBox(),
    };
  }
  get listboxAttributes() {
    return {
      id: `${this.options.id}-listbox`,
      role: 'listbox',
      'aria-label': this.options.strings.querySuggestionList(),
    };
  }
  optionAttributes(isActive, value) {
    var _a;
    const part = (_a = value.getAttribute('part')) !== null && _a !== void 0 ? _a : '';
    const activePart = ` ${this.options.activePartName}`;
    return {
      role: 'option',
      'aria-selected': `${isActive}`,
      part: isActive ? `${part}${activePart}` : part.replace(activePart, ''),
    };
  }
}

const ClearIcon = `<svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path d="m18 2-1.8-2-7.1 7.1-7.1-7.1-2 2 7.1 7.1-7.1 7.1 2 1.8 7.1-6.9 7.1 6.9 1.8-1.8-6.9-7.1z"/></svg>`;

const SearchIcon = `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m6.4 0c3.5 0 6.4 2.9 6.4 6.4 0 1.4-.4 2.7-1.2 3.7l4 4c.4.4.4 1 .1 1.5l-.1.1c-.2.2-.5.3-.8.3s-.6-.1-.8-.3l-4-4c-1 .7-2.3 1.2-3.7 1.2-3.4-.1-6.3-3-6.3-6.5s2.9-6.4 6.4-6.4zm0 2.1c-2.3 0-4.3 1.9-4.3 4.3s1.9 4.3 4.3 4.3 4.3-1.9 4.3-4.3-1.9-4.3-4.3-4.3z"/></svg>`;

const atomicSearchBoxCss = ":host{display:block;font-family:Lato, Helvetica Neue, Helvetica, Arial, sans-serif, sans-serif}.focus-within\\:rounded-b-none:focus-within{border-bottom-right-radius:0px;border-bottom-left-radius:0px;border-top-left-radius:0.25rem;border-top-right-radius:0.25rem}.apply-border-on-background{border-color:var(--atomic-on-background, #282829);border-style:solid;border-width:1px}.apply-border-on-background-variant{border-color:var(--atomic-on-background-variant, #6b6b6b);border-style:solid;border-width:1px}/*! modern-normalize v1.0.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,*::before,*::after{box-sizing:border-box}:root{-moz-tab-size:4;-o-tab-size:4;tab-size:4}html{line-height:1.15;-webkit-text-size-adjust:100%;}body{margin:0}body{font-family:system-ui,\n\t\t-apple-system, \n\t\t'Segoe UI',\n\t\tRoboto,\n\t\tHelvetica,\n\t\tArial,\n\t\tsans-serif,\n\t\t'Apple Color Emoji',\n\t\t'Segoe UI Emoji'}hr{height:0;color:inherit;}abbr[title]{-webkit-text-decoration:underline dotted;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,\n\t\tSFMono-Regular,\n\t\tConsolas,\n\t\t'Liberation Mono',\n\t\tMenlo,\n\t\tmonospace;font-size:1em;}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}table{text-indent:0;border-color:inherit;}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0;}button,select{text-transform:none}button,[type='button'],[type='submit']{-webkit-appearance:button}legend{padding:0}progress{vertical-align:baseline}[type='search']{-webkit-appearance:textfield;outline-offset:-2px;}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}button{background-color:transparent;background-image:none}button:focus{outline:1px dotted;outline:5px auto -webkit-focus-ring-color}fieldset{margin:0;padding:0}ol,ul{list-style:none;margin:0;padding:0}html{font-family:var(--atomic-font-family, Lato, Arial, Helvetica, sans-serif);line-height:1.5;}body{font-family:inherit;line-height:inherit}*,::before,::after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb;}hr{border-top-width:1px}img{border-style:solid}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{color:#9ca3af}input:-ms-input-placeholder,textarea:-ms-input-placeholder{color:#9ca3af}input::placeholder,textarea::placeholder{color:#9ca3af}button,[role=\"button\"]{cursor:pointer}table{border-collapse:collapse}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}button,input,optgroup,select,textarea{padding:0;line-height:inherit;color:inherit}pre,code,kbd,samp{font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}.space-x-2>:not([hidden])~:not([hidden]){--tw-space-x-reverse:0;margin-right:calc(0.5rem * var(--tw-space-x-reverse));margin-left:calc(0.5rem * calc(1 - var(--tw-space-x-reverse)))}.appearance-none{-webkit-appearance:none;-moz-appearance:none;appearance:none}.bg-transparent{background-color:transparent}.bg-white{--tw-bg-opacity:1;background-color:rgba(255, 255, 255, var(--tw-bg-opacity))}.bg-primary{background-color:var(--atomic-primary, #1372EC)}.bg-background{background-color:var(--atomic-background, #FFFFFF)}.hover\\:bg-primary:hover{background-color:var(--atomic-primary, #1372EC)}.hover\\:bg-primary-variant:hover{background-color:var(--atomic-primary-variant, #215CD3)}.border-primary{border-color:var(--atomic-primary, #1372EC)}.border-on-background{border-color:var(--atomic-on-background, #282829)}.border-divider{border-color:var(--atomic-divider, #BCC3CA)}.rounded{border-radius:0.25rem}.rounded-b{border-bottom-right-radius:0.25rem;border-bottom-left-radius:0.25rem}.rounded-r-lg{border-top-right-radius:0.5rem;border-bottom-right-radius:0.5rem}.rounded-l-lg{border-top-left-radius:0.5rem;border-bottom-left-radius:0.5rem}.rounded-br-none{border-bottom-right-radius:0px}.rounded-bl-none{border-bottom-left-radius:0px}.border-solid{border-style:solid}.border-none{border-style:none}.border-0{border-width:0px}.border-2{border-width:2px}.border{border-width:1px}.border-t-0{border-top-width:0px}.border-r-0{border-right-width:0px}.border-l-0{border-left-width:0px}.border-b{border-bottom-width:1px}.box-border{box-sizing:border-box}.cursor-pointer{cursor:pointer}.cursor-not-allowed{cursor:not-allowed}.block{display:block}.flex{display:flex}.table{display:table}.hidden{display:none}.flex-row{flex-direction:row}.flex-col{flex-direction:column}.items-end{align-items:flex-end}.items-center{align-items:center}.self-end{align-self:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.flex-grow{flex-grow:1}.font-semibold{font-weight:600}.font-bold{font-weight:700}.h-2{height:0.5rem}.h-3{height:0.75rem}.h-4{height:1rem}.h-5{height:1.25rem}.h-9{height:2.25rem}.h-10{height:2.5rem}.h-2\\.5{height:0.625rem}.h-3\\.5{height:0.875rem}.h-screen{height:100vh}.text-sm{font-size:0.875rem;line-height:1.25rem}.text-base{font-size:1rem;line-height:1.5rem}.text-lg{font-size:1.125rem;line-height:1.75rem}.list-inside{list-style-position:inside}.list-none{list-style-type:none}.list-disc{list-style-type:disc}.m-auto{margin:auto}.my-0{margin-top:0px;margin-bottom:0px}.my-2{margin-top:0.5rem;margin-bottom:0.5rem}.mx-2{margin-left:0.5rem;margin-right:0.5rem}.my-3{margin-top:0.75rem;margin-bottom:0.75rem}.mx-auto{margin-left:auto;margin-right:auto}.mt-2{margin-top:0.5rem}.mr-2{margin-right:0.5rem}.mb-2{margin-bottom:0.5rem}.ml-2{margin-left:0.5rem}.ml-3{margin-left:0.75rem}.ml-5{margin-left:1.25rem}.ml-auto{margin-left:auto}.max-w-5xl{max-width:64rem}.max-w-full{max-width:100%}.object-left-top{-o-object-position:left top;object-position:left top}.opacity-50{opacity:0.5}.outline-none{outline:2px solid transparent;outline-offset:2px}.focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}.overflow-hidden{overflow:hidden}.p-0{padding:0px}.p-2{padding:0.5rem}.p-3{padding:0.75rem}.py-1{padding-top:0.25rem;padding-bottom:0.25rem}.px-2{padding-left:0.5rem;padding-right:0.5rem}.px-4{padding-left:1rem;padding-right:1rem}.py-1\\.5{padding-top:0.375rem;padding-bottom:0.375rem}.pb-2{padding-bottom:0.5rem}.pl-2{padding-left:0.5rem}.pr-4{padding-right:1rem}.pr-8{padding-right:2rem}.placeholder-on-background::-moz-placeholder{color:var(--atomic-on-background, #282829)}.placeholder-on-background:-ms-input-placeholder{color:var(--atomic-on-background, #282829)}.placeholder-on-background::placeholder{color:var(--atomic-on-background, #282829)}.pointer-events-none{pointer-events:none}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.top-0{top:0px}.left-0{left:0px}.right-3{right:0.75rem}.top-4{top:1rem}*{--tw-shadow:0 0 #0000}.shadow{--tw-shadow:0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.shadow-none{--tw-shadow:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}*{--tw-ring-inset:var(--tw-empty, );--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59, 130, 246, 0.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000}.fill-current{fill:currentColor}.text-left{text-align:left}.text-primary{color:var(--atomic-primary, #1372EC)}.text-on-primary{color:var(--atomic-on-primary, #FFFFFF)}.text-secondary{color:var(--atomic-secondary, #333357)}.text-on-background{color:var(--atomic-on-background, #282829)}.text-on-background-variant{color:var(--atomic-on-background-variant, #6b6b6b)}.hover\\:text-primary-variant:hover{color:var(--atomic-primary-variant, #215CD3)}.hover\\:text-on-primary:hover{color:var(--atomic-on-primary, #FFFFFF)}.hover\\:underline:hover{text-decoration:underline}.w-2{width:0.5rem}.w-3{width:0.75rem}.w-4{width:1rem}.w-5{width:1.25rem}.w-2\\.5{width:0.625rem}.w-3\\.5{width:0.875rem}.w-full{width:100%}.w-screen{width:100vw}.z-50{z-index:50}@-webkit-keyframes spin{to{transform:rotate(360deg)}}@keyframes spin{to{transform:rotate(360deg)}}@-webkit-keyframes ping{75%,100%{transform:scale(2);opacity:0}}@keyframes ping{75%,100%{transform:scale(2);opacity:0}}@-webkit-keyframes pulse{50%{opacity:.5}}@keyframes pulse{50%{opacity:.5}}@-webkit-keyframes bounce{0%,100%{transform:translateY(-25%);-webkit-animation-timing-function:cubic-bezier(0.8,0,1,1);animation-timing-function:cubic-bezier(0.8,0,1,1)}50%{transform:none;-webkit-animation-timing-function:cubic-bezier(0,0,0.2,1);animation-timing-function:cubic-bezier(0,0,0.2,1)}}@keyframes bounce{0%,100%{transform:translateY(-25%);-webkit-animation-timing-function:cubic-bezier(0.8,0,1,1);animation-timing-function:cubic-bezier(0.8,0,1,1)}50%{transform:none;-webkit-animation-timing-function:cubic-bezier(0,0,0.2,1);animation-timing-function:cubic-bezier(0,0,0.2,1)}}.submit-button{width:var(--atomic-submit-button-size, 48px)}.search-box,.suggestion{height:var(--atomic-search-box-height, 48px)}.suggestion{top:var(--atomic-search-box-height, 48px)}.suggestions:empty{border:none}@media (min-width: 1024px){.lg\\:block{display:block}.lg\\:hidden{display:none}.lg\\:flex-row{flex-direction:row}.lg\\:flex-col{flex-direction:column}.lg\\:h-auto{height:auto}.lg\\:mr-0{margin-right:0px}.lg\\:static{position:static}.lg\\:w-80{width:20rem}.lg\\:w-auto{width:auto}}";

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
const AtomicSearchBox = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.strings = {
      clear: () => this.bindings.i18n.t('clear'),
      search: () => this.bindings.i18n.t('search'),
      searchBox: () => this.bindings.i18n.t('searchBox'),
      querySuggestionList: () => this.bindings.i18n.t('querySuggestionList'),
    };
    /**
     * Maximum number of suggestions to display
     */
    this.numberOfSuggestions = 5;
    /**
     * The placeholder for the search box input
     */
    this.placeholder = '';
    /**
     * Whether the submit button should be placed before the input
     */
    this.leadingSubmitButton = false;
    this._id = randomID('atomic-search-box-');
    this.combobox = new Combobox({
      id: this._id,
      strings: this.strings,
      containerRef: () => this.containerRef,
      inputRef: () => this.inputRef,
      valuesRef: () => this.valuesRef,
      onChange: (value) => {
        this.searchBox.updateText(value);
      },
      onSubmit: () => {
        this.searchBox.submit();
        this.searchBox.hideSuggestions();
      },
      onSelectValue: (element) => {
        this.searchBox.selectSuggestion(this.searchBoxState.suggestions[element.value]
          .rawValue);
      },
      onBlur: () => {
        setTimeout(() => this.searchBox.hideSuggestions(), 100);
      },
      activeClass: 'bg-primary text-on-primary',
      activePartName: 'active-suggestion',
    });
  }
  componentDidRender() {
    this.combobox.updateAccessibilityAttributes();
  }
  initialize() {
    this.searchBox = Bu(this.bindings.engine, {
      options: {
        numberOfSuggestions: this.numberOfSuggestions,
        highlightOptions: {
          notMatchDelimiters: {
            open: '<strong>',
            close: '</strong>',
          },
          correctionDelimiters: {
            open: '<i>',
            close: '</i>',
          },
        },
      },
    });
  }
  onInputFocus() {
    this.searchBox.showSuggestions();
  }
  get submitButton() {
    let roundedClasses = this.leadingSubmitButton
      ? 'rounded-l-lg'
      : 'rounded-r-lg';
    if (this.searchBoxState.suggestions.length) {
      roundedClasses += ' rounded-bl-none rounded-br-none';
    }
    return (h("button", { type: "button", part: "submit-button", class: `submit-button border-0 focus:outline-none bg-primary p-0 ${roundedClasses}`, "aria-label": this.strings.search(), onClick: () => this.searchBox.submit() }, h("div", { innerHTML: SearchIcon, class: "search mx-auto w-3.5 h-3.5 text-on-primary fill-current" })));
  }
  get clearButton() {
    if (this.searchBoxState.value === '') {
      return;
    }
    return (h("button", { type: "button", part: "clear-button", class: "clear-button bg-transparent border-none outline-none mr-2", "aria-label": this.strings.clear(), onClick: () => {
        this.searchBox.clear();
        this.inputRef.focus();
      } }, h("div", { innerHTML: ClearIcon, class: "w-2.5 h-2.5 text-on-background fill-current" })));
  }
  get input() {
    return (h("input", { part: "input", ref: (el) => (this.inputRef = el), onFocus: () => this.onInputFocus(), onBlur: () => this.combobox.onInputBlur(), onInput: (e) => this.combobox.onInputChange(e), onKeyUp: (e) => this.combobox.onInputKeyup(e), onKeyDown: (e) => this.combobox.onInputKeydown(e), type: "text", class: 'input mx-2 my-0 text-base placeholder-on-background outline-none flex-grow flex-row items-center ', placeholder: this.placeholder, value: this.searchBoxState.value }));
  }
  get suggestions() {
    return this.searchBoxState.suggestions.map((suggestion, index) => {
      const id = `${this._id}-suggestion-${index}`;
      return (h("li", { onClick: () => {
          this.searchBox.selectSuggestion(suggestion.rawValue);
        }, onMouseDown: (e) => e.preventDefault(), part: "suggestion", id: id, class: "suggestion h-9 px-2 cursor-pointer text-left text-sm bg-transparent border-none shadow-none hover:bg-primary hover:text-on-primary flex flex-row items-center", innerHTML: suggestion.highlightedValue, value: index }));
    });
  }
  renderInputWrapper() {
    let roundedClasses = this.leadingSubmitButton
      ? 'border-l-0 rounded-r-lg'
      : 'border-r-0 rounded-l-lg';
    if (this.searchBoxState.suggestions.length) {
      roundedClasses += ' rounded-bl-none rounded-br-none';
    }
    return (h("div", { part: "input-wrapper", class: `input-wrapper flex flex-grow items-center border border-divider ${roundedClasses}`, ref: (el) => (this.containerRef = el) }, this.input, this.clearButton));
  }
  render() {
    return (h("div", { class: "relative" }, h("div", { class: "search-box box-border w-full flex" }, this.leadingSubmitButton && this.submitButton, this.renderInputWrapper(), !this.leadingSubmitButton && this.submitButton), h("ul", { part: "suggestions", class: "suggestions box-border w-full p-0 my-0 flex flex-col bg-background border border-divider border-t-0 rounded-b list-none absolute z-50", ref: (el) => (this.valuesRef = el) }, this.suggestions)));
  }
};
__decorate([
  InitializeBindings()
], AtomicSearchBox.prototype, "bindings", void 0);
__decorate([
  BindStateToI18n()
], AtomicSearchBox.prototype, "strings", void 0);
__decorate([
  BindStateToController('searchBox')
], AtomicSearchBox.prototype, "searchBoxState", void 0);
AtomicSearchBox.style = atomicSearchBoxCss;

export { AtomicSearchBox as atomic_search_box };

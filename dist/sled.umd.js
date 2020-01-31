(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["sled"] = factory();
	else
		root["sled"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "0bfb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__("cb7c");
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "0d58":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("ce10");
var enumBugKeys = __webpack_require__("e11e");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "11e9":
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__("52a7");
var createDesc = __webpack_require__("4630");
var toIObject = __webpack_require__("6821");
var toPrimitive = __webpack_require__("6a99");
var has = __webpack_require__("69a8");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__("9e1e") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "1495":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var anObject = __webpack_require__("cb7c");
var getKeys = __webpack_require__("0d58");

module.exports = __webpack_require__("9e1e") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "230e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var document = __webpack_require__("7726").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "2aba":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var has = __webpack_require__("69a8");
var SRC = __webpack_require__("ca5a")('src');
var $toString = __webpack_require__("fa5b");
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__("8378").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "2aeb":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("cb7c");
var dPs = __webpack_require__("1495");
var enumBugKeys = __webpack_require__("e11e");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("230e")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("fab2").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "2d00":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "2d95":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "2f21":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__("79e5");

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};


/***/ }),

/***/ "32e9":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");
module.exports = __webpack_require__("9e1e") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "3846":
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__("9e1e") && /./g.flags != 'g') __webpack_require__("86cc").f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__("0bfb")
});


/***/ }),

/***/ "4588":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "4630":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "4bf8":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "52a7":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "5537":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("8378");
var global = __webpack_require__("7726");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("2d00") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "55dd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__("5ca1");
var aFunction = __webpack_require__("d8e8");
var toObject = __webpack_require__("4bf8");
var fails = __webpack_require__("79e5");
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__("2f21")($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),

/***/ "5ca1":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var core = __webpack_require__("8378");
var hide = __webpack_require__("32e9");
var redefine = __webpack_require__("2aba");
var ctx = __webpack_require__("9b43");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "5dbc":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var setPrototypeOf = __webpack_require__("8b97").set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),

/***/ "613b":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5537")('keys');
var uid = __webpack_require__("ca5a");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "626a":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("2d95");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "6821":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("626a");
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "69a8":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "6a99":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("d3f4");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "6b54":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__("3846");
var anObject = __webpack_require__("cb7c");
var $flags = __webpack_require__("0bfb");
var DESCRIPTORS = __webpack_require__("9e1e");
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__("2aba")(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__("79e5")(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),

/***/ "7726":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "77f1":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "79e5":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "8378":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "86cc":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var toPrimitive = __webpack_require__("6a99");
var dP = Object.defineProperty;

exports.f = __webpack_require__("9e1e") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "8b97":
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__("d3f4");
var anObject = __webpack_require__("cb7c");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__("9b43")(Function.call, __webpack_require__("11e9").f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ "9093":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__("ce10");
var hiddenKeys = __webpack_require__("e11e").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "9b43":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("d8e8");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "9def":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("4588");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "9e1e":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("79e5")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "aa77":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("5ca1");
var defined = __webpack_require__("be13");
var fails = __webpack_require__("79e5");
var spaces = __webpack_require__("fdef");
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),

/***/ "be13":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "c366":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("6821");
var toLength = __webpack_require__("9def");
var toAbsoluteIndex = __webpack_require__("77f1");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "c5f6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("7726");
var has = __webpack_require__("69a8");
var cof = __webpack_require__("2d95");
var inheritIfRequired = __webpack_require__("5dbc");
var toPrimitive = __webpack_require__("6a99");
var fails = __webpack_require__("79e5");
var gOPN = __webpack_require__("9093").f;
var gOPD = __webpack_require__("11e9").f;
var dP = __webpack_require__("86cc").f;
var $trim = __webpack_require__("aa77").trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__("2aeb")(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__("9e1e") ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__("2aba")(global, NUMBER, $Number);
}


/***/ }),

/***/ "c69a":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("9e1e") && !__webpack_require__("79e5")(function () {
  return Object.defineProperty(__webpack_require__("230e")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "ca5a":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "cb7c":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "ce10":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("69a8");
var toIObject = __webpack_require__("6821");
var arrayIndexOf = __webpack_require__("c366")(false);
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "d3f4":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "d8e8":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "e11e":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "f6fd":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "fa5b":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("5537")('native-function-to-string', Function.toString);


/***/ }),

/***/ "fab2":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("7726").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("f6fd")
  }

  var i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"135f0336-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/sled.vue?vue&type=template&id=1d427f5e&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{style:({ 
    display: 'block',
    position: 'relative', 
    height: (_vm.height + "px") })},[(_vm.fileImage)?_c('svg-component',{attrs:{"image-width":_vm.width,"image-height":_vm.height,"image-data":_vm.fileImage,"h-lines":_vm.hLines,"v-lines":_vm.vLines,"scale":_vm.scale,"line-thickness":_vm.lineWeight},on:{"dragUL":function($event){return _vm.moveGrid($event)},"dragLR":function($event){return _vm.stretchGrid($event)},"dragHline":function($event){return _vm.moveHline($event)},"dragVline":function($event){return _vm.moveVline($event)}}}):_vm._e(),_vm._l((_vm.cells),function(cell,index){return _c('cell-component',{key:index,attrs:{"locked":_vm.locked,"metadata":_vm.metadataAssignment,"scale":_vm.scale,"cell":cell},on:{"onChange":function($event){return _vm.updateCell(index, $event)}}})})],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/sled.vue?vue&type=template&id=1d427f5e&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.sort.js
var es6_array_sort = __webpack_require__("55dd");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.constructor.js
var es6_number_constructor = __webpack_require__("c5f6");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"135f0336-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/svgComponent.vue?vue&type=template&id=76e7c9b4&
var svgComponentvue_type_template_id_76e7c9b4_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticStyle:{"z-index":"2","position":"absolute"},attrs:{"id":"svg_layer","width":_vm.imageWidth/_vm.scale,"height":_vm.imageHeight/_vm.scale}},[_c('image',{attrs:{"xmlns":"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","width":_vm.imageWidth/_vm.scale,"height":_vm.imageHeight/_vm.scale,"xlink:href":_vm.imageData}}),((_vm.hLines.length > 1) && (_vm.vLines.length > 1))?[_vm._l((_vm.hLines),function(item,index){return _c('svg-line',{key:_vm.generateRandomKey(index),attrs:{"x1":_vm.vLines[0],"y1":_vm.hLines[index],"x2":_vm.vLines[_vm.vLines.length - 1],"y2":_vm.hLines[index],"scale":_vm.scale,"line-thickness":_vm.lineThickness},on:{"dragging":function($event){_vm.dragging = true;  _vm.dragIndex = [-1, index]}}})}),_vm._l((_vm.vLines),function(item,index){return _c('svg-line',{key:_vm.generateRandomKey(index),attrs:{"x1":_vm.vLines[index],"y1":_vm.hLines[0],"x2":_vm.vLines[index],"y2":_vm.hLines[_vm.hLines.length - 1],"scale":_vm.scale,"line-thickness":_vm.lineThickness,"index":index,"dragging":_vm.dragging},on:{"dragging":function($event){_vm.dragging = true; _vm.dragIndex = [index, -1]},"mousemove":function($event){_vm.deltas = $event}}})}),_c('svg-circle',{staticStyle:{"cursor":"move"},attrs:{"ix":0,"iy":0,"h-lines":_vm.hLines,"v-lines":_vm.vLines,"scale":_vm.scale,"stroke-color":"red"},on:{"dragging":function($event){_vm.dragging = true; _vm.draggingCorner = 'dragUL'; _vm.dragIndex = $event}}}),_c('svg-circle',{staticStyle:{"cursor":"nwse-resize"},attrs:{"ix":_vm.vLines.length - 1,"iy":_vm.hLines.length - 1,"h-lines":_vm.hLines,"v-lines":_vm.vLines,"scale":_vm.scale,"stroke-color":"red"},on:{"dragging":function($event){_vm.dragging = true; _vm.draggingCorner = 'dragLR'; _vm.dragIndex = $event}}})]:_vm._e()],2)}
var svgComponentvue_type_template_id_76e7c9b4_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/svgComponent.vue?vue&type=template&id=76e7c9b4&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.to-string.js
var es6_regexp_to_string = __webpack_require__("6b54");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"135f0336-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/svgLine.vue?vue&type=template&id=47ea38f7&
var svgLinevue_type_template_id_47ea38f7_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('line',{class:{ 'line-horizontal': _vm.isHorizontal, 'line-vertical': !_vm.isHorizontal },style:(_vm.style),attrs:{"x1":_vm.x1 / _vm.scale,"y1":_vm.y1 / _vm.scale,"x2":_vm.x2 / _vm.scale,"y2":_vm.y2 / _vm.scale},on:{"mousedown":_vm.sendIndex}})}
var svgLinevue_type_template_id_47ea38f7_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/svgLine.vue?vue&type=template&id=47ea38f7&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/svgLine.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var svgLinevue_type_script_lang_js_ = ({
  props: {
    x1: {
      type: [Number, String],
      required: true
    },
    x2: {
      type: [Number, String],
      required: true
    },
    y1: {
      type: [Number, String],
      required: true
    },
    y2: {
      type: [Number, String],
      required: true
    },
    scale: {
      type: [Number, String],
      required: true
    },
    lineThickness: {
      type: [Number, String]
    }
  },
  computed: {
    isHorizontal: function isHorizontal() {
      return this.y1 === this.y2;
    },
    style: function style() {
      return "stroke:rgb(255,0,0);stroke-width:".concat(this.lineThickness, ";stroke-linecap:round;cursor:").concat(this.isHorizontal ? 'ns-resize' : 'ew-resize');
    }
  },
  // on mouseover, signal to add a bubble ?
  methods: {
    sendIndex: function sendIndex() {
      this.$emit('dragging');
    }
  }
});
// CONCATENATED MODULE: ./src/components/svgLine.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_svgLinevue_type_script_lang_js_ = (svgLinevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/components/svgLine.vue





/* normalize component */

var component = normalizeComponent(
  components_svgLinevue_type_script_lang_js_,
  svgLinevue_type_template_id_47ea38f7_render,
  svgLinevue_type_template_id_47ea38f7_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var svgLine = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"135f0336-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/svgCircle.vue?vue&type=template&id=32ec7363&
var svgCirclevue_type_template_id_32ec7363_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('circle',{style:(_vm.style),attrs:{"cx":_vm.vBubble,"cy":_vm.hBubble,"r":10},on:{"mousedown":_vm.sendIndex}})}
var svgCirclevue_type_template_id_32ec7363_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/svgCircle.vue?vue&type=template&id=32ec7363&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/svgCircle.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
/* harmony default export */ var svgCirclevue_type_script_lang_js_ = ({
  props: {
    hLines: {
      type: Array,
      required: true
    },
    vLines: {
      type: Array,
      required: true
    },
    scale: {
      type: Number,
      default: 1
    },
    ix: {
      type: Number,
      default: 0
    },
    iy: {
      type: Number,
      default: 0
    },
    strokeColor: {
      type: String,
      default: 'black'
    }
  },
  methods: {
    sendIndex: function sendIndex() {
      this.$emit('dragging', [this.ix, this.iy]);
    }
  },
  computed: {
    vBubble: function vBubble() {
      if (this.ix < 0) {
        return (0.7 * this.vLines[0] + 0.3 * this.vLines[this.vLines.length - 1]) / this.scale;
      } else {
        return this.vLines[this.ix] / this.scale;
      }
    },
    hBubble: function hBubble() {
      if (this.iy < 0) {
        return (0.7 * this.hLines[0] + 0.3 * this.hLines[this.hLines.length - 1]) / this.scale;
      } else {
        return this.hLines[this.iy] / this.scale;
      }
    },
    style: function style() {
      return "stroke:".concat(this.strokeColor, ";stroke-width:2;stroke-opacity=0.7;fill-opacity:0;z-index:3");
    }
  }
});
// CONCATENATED MODULE: ./src/components/svgCircle.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_svgCirclevue_type_script_lang_js_ = (svgCirclevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/svgCircle.vue





/* normalize component */

var svgCircle_component = normalizeComponent(
  components_svgCirclevue_type_script_lang_js_,
  svgCirclevue_type_template_id_32ec7363_render,
  svgCirclevue_type_template_id_32ec7363_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var svgCircle = (svgCircle_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/svgComponent.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var svgComponentvue_type_script_lang_js_ = ({
  components: {
    SvgLine: svgLine,
    SvgCircle: svgCircle
  },
  props: {
    imageData: {
      type: String,
      required: true
    },
    imageWidth: {
      type: Number,
      required: true
    },
    imageHeight: {
      type: Number,
      required: true
    },
    scale: {
      type: Number,
      default: 1
    },
    hLines: {
      type: Array,
      required: true
    },
    vLines: {
      type: Array,
      required: true
    },
    lineThickness: {
      type: Number
    }
  },
  data: function data() {
    return {
      hBubble: [0, 0, -1],
      vBubble: [0, 0, -1],
      // x, y, line index
      dragging: false,
      deltas: undefined,
      dragIndex: [],
      draggingCorner: undefined
    };
  },
  mounted: function mounted() {
    var _this = this;

    window.addEventListener('mouseup', function (e) {
      _this.dragging = false;
      _this.draggingCorner = undefined;
    });
    window.addEventListener('mousemove', function (e) {
      _this.mouseMove(e);
    });
  },
  methods: {
    generateRandomKey: function generateRandomKey() {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      return Math.random().toString(16).substr(2, 8) + index;
    },
    sendEventUL: function sendEventUL() {
      this.$emit('circleUL', true);
    },
    sendEventLR: function sendEventLR() {
      this.$emit('circleLR', true);
    },
    dragUL: function dragUL(deltas) {
      var dx = event.layerX * this.scale - this.vLines[deltas[0]];
      var dy = event.layerY * this.scale - this.hLines[deltas[1]];
      this.$emit('dragUL', [dx, dy]);
    },
    dragLR: function dragLR(deltas) {
      var dx = event.layerX * this.scale - this.vLines[deltas[0]];
      var dy = event.layerY * this.scale - this.hLines[deltas[1]];
      this.$emit('dragLR', [dx, dy]);
    },
    mouseMove: function mouseMove(event) {
      if (this.dragging) {
        var dx = event.clientX - (this.$el.getBoundingClientRect().left + document.body.scrollLeft) - this.vLines[this.dragIndex[0]] / this.scale;
        var dy = event.clientY - (this.$el.getBoundingClientRect().top + document.body.scrollTop) - this.hLines[this.dragIndex[1]] / this.scale;

        if (this.draggingCorner) {
          this.$emit(this.draggingCorner, [dx, dy]);
        } else {
          // dragging either vertical or horzontal line
          if (this.dragIndex[0] >= 0) {
            // so only one of the indices is semipositive
            this.$emit('dragVline', [dx, dy, this.dragIndex[0]]);
          } else {
            this.$emit('dragHline', [dx, dy, this.dragIndex[1]]);
          }
        }
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/svgComponent.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_svgComponentvue_type_script_lang_js_ = (svgComponentvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/svgComponent.vue





/* normalize component */

var svgComponent_component = normalizeComponent(
  components_svgComponentvue_type_script_lang_js_,
  svgComponentvue_type_template_id_76e7c9b4_render,
  svgComponentvue_type_template_id_76e7c9b4_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var svgComponent = (svgComponent_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"135f0336-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/cell.vue?vue&type=template&id=3b2247f2&
var cellvue_type_template_id_3b2247f2_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{style:(_vm.style)},[(_vm.cell['textfield'])?_c('span',{staticClass:"cell-textfield",staticStyle:{"position":"absolute","top":"4px%","background-color":"#FFF","border-radius":"3px","padding":"4px","opacity":"0.9"},domProps:{"innerHTML":_vm._s(_vm.cell.textfield)}}):_vm._e(),(!_vm.checked)?_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.cell.metadata),expression:"cell.metadata"}],staticClass:"cell-select",staticStyle:{"position":"absolute","top":"50%","left":"50%","transform":"translate(-50%, -50%)"},on:{"change":[function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.$set(_vm.cell, "metadata", $event.target.multiple ? $$selectedVal : $$selectedVal[0])},function($event){return _vm.$emit('onChange', _vm.cell)}]}},[_c('option',{domProps:{"value":null}},[_vm._v("\n      None\n    ")]),_vm._l((_vm.metadata),function(value,key){return _c('option',{key:key,domProps:{"value":key}},[_vm._v("\n      "+_vm._s(value)+"\n    ")])})],2):_vm._e(),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.checked),expression:"checked"}],staticClass:"cell-checkbox",staticStyle:{"position":"absolute","right":"10px","bottom":"10px"},attrs:{"disabled":_vm.locked,"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.checked)?_vm._i(_vm.checked,null)>-1:(_vm.checked)},on:{"change":[function($event){var $$a=_vm.checked,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.checked=$$a.concat([$$v]))}else{$$i>-1&&(_vm.checked=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{_vm.checked=$$c}},_vm.setCheckbox]}})])}
var cellvue_type_template_id_3b2247f2_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/cell.vue?vue&type=template&id=3b2247f2&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/cell.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var cellvue_type_script_lang_js_ = ({
  props: {
    cell: {
      type: Object,
      required: true
    },
    metadata: {
      type: Object,
      default: undefined
    },
    scale: {
      type: Number,
      default: 1
    },
    locked: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    style: function style() {
      return {
        position: 'absolute',
        top: "".concat(this.cell.upperCorner.y / this.scale + this.margin, "px"),
        left: "".concat(this.cell.upperCorner.x / this.scale + this.margin, "px"),
        width: "".concat((this.cell.lowerCorner.x - this.cell.upperCorner.x) / this.scale - this.margin * 2, "px"),
        height: "".concat((this.cell.lowerCorner.y - this.cell.upperCorner.y) / this.scale - this.margin * 2, "px"),
        'z-index': 2
      };
    }
  },
  data: function data() {
    return {
      margin: 5,
      checked: true
    };
  },
  watch: {
    checked: function checked(newVal) {
      if (newVal) {
        this.cell.metadata = null;
      }
    }
  },
  methods: {
    setCheckbox: function setCheckbox() {
      if (this.checked) {
        this.cell.metadata = null;
      }

      this.$emit('onChange', this.cell);
    }
  }
});
// CONCATENATED MODULE: ./src/components/cell.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_cellvue_type_script_lang_js_ = (cellvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/cell.vue





/* normalize component */

var cell_component = normalizeComponent(
  components_cellvue_type_script_lang_js_,
  cellvue_type_template_id_3b2247f2_render,
  cellvue_type_template_id_3b2247f2_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var cell = (cell_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/sled.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var sledvue_type_script_lang_js_ = ({
  name: 'vue-sled',
  components: {
    SvgComponent: svgComponent,
    CellComponent: cell
  },
  props: {
    metadataAssignment: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    imageWidth: {
      type: Number,
      required: true
    },
    imageHeight: {
      type: Number,
      required: true
    },
    fileImage: {
      type: String
    },
    verticalLines: {
      type: Array,
      required: true
    },
    horizontalLines: {
      type: Array,
      required: true
    },
    lineWeight: {
      type: [Number, String],
      default: 4
    },
    autosize: {
      type: Boolean,
      default: true
    },
    locked: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    vLinesInOrder: function vLinesInOrder() {
      return this.vLines.sort(function (a, b) {
        return a - b;
      });
    },
    hLinesInOrder: function hLinesInOrder() {
      return this.hLines.sort(function (a, b) {
        return a - b;
      });
    }
  },
  data: function data() {
    return {
      width: 0,
      // horizontal extent of image in pixels
      height: 0,
      // vertical extent of image
      hLines: [],
      // y pixel coord of line
      vLines: [],
      // x pixel coord of line
      cells: [],
      // pixel coord of upper left, lower right - derived, e.g.[[0, 0], [100, 150]]
      old_width: 0,
      old_height: 0,
      observeContainer: undefined,
      scale: 1
    };
  },
  watch: {
    hLines: {
      handler: function handler(newVal) {
        this.hLines = newVal;
        this.computeCells();
      },
      deep: true
    },
    vLines: {
      handler: function handler(newVal) {
        this.computeCells();
      },
      deep: true
    },
    imageHeight: {
      handler: function handler(newVal) {
        this.height = newVal;
        this.resizeImage();
      },
      immediate: true
    },
    imageWidth: {
      handler: function handler(newVal) {
        this.width = newVal;
        this.resizeImage();
      },
      immediate: true
    },
    verticalLines: {
      handler: function handler(newVal) {
        this.vLines = newVal;
      },
      immediate: true
    },
    horizontalLines: {
      handler: function handler(newVal) {
        this.hLines = newVal;
      },
      immediate: true
    },
    fileImage: function fileImage(newVal) {
      this.old_width = this.width;
      this.old_height = this.height;
      this.width = this.width;
      this.height = this.height;
      this.resizeImage();
    },
    autosize: {
      handler: function handler(newVal) {
        if (newVal) {
          this.observeContainer = new ResizeObserver(this.resizeSled);
          this.observeContainer.observe(this.$el);
        } else {
          this.observeContainer.disconnect();
        }

        this.scale = this.scaleForScreen();
      }
    }
  },
  mounted: function mounted() {
    this.computeCells();

    if (this.autosize) {
      this.observeContainer = new ResizeObserver(this.resizeSled);
      this.observeContainer.observe(this.$el);
    }
  },
  destroyed: function destroyed() {
    this.observeContainer.disconnect();
  },
  methods: {
    updateCell: function updateCell(index, cell) {
      this.$set(this.cells, index, cell);
      this.$emit('onComputeCells', this.cells);
    },
    moveX: function moveX(offset) {
      // move all vertical lines by x-offset
      for (var i = 0; i < this.vLines.length; i++) {
        this.moveV(i, offset);
      }
    },
    moveY: function moveY(offset) {
      // move all horizontal lines by y-offset
      for (var i = 0; i < this.hLines.length; i++) {
        this.moveH(i, offset);
      }
    },
    moveV: function moveV(index, offset) {
      // move a single vertical line by x-offset
      var value = Math.round(this.vLines[index] + offset);
      if (value < 0 || value > this.imageWidth) return;
      this.$set(this.vLines, index, value);
    },
    moveH: function moveH(index, offset) {
      // move a single horizontal line by y-offset
      var value = Math.round(this.hLines[index] + offset);
      if (value < 0 || value > this.imageHeight) return;
      this.$set(this.hLines, index, Math.round(this.hLines[index] + offset));
    },
    resizeImage: function resizeImage() {
      // if image size changes, recompute lines and cells
      if (this.old_width > 1) {
        // a previous presumably valid width
        var hScale = this.width / this.old_width;
        var h = 0;
        var n = this.vLines.length;

        for (h = 0; h < n; h++) {
          this.$set(this.vLines, h, Math.round(this.vLines[h] * hScale));
        }
      }

      if (this.old_height > 1) {
        // a previous presumably valid height
        var vScale = this.height / this.old_height;
        var v = 0;
        var m = this.hLines.length;

        for (v = 0; v < m; v++) {
          this.$set(this.hLines, v, Math.round(this.hLines[v] * vScale));
        }
      }

      this.old_width = this.width;
      this.old_height = this.height;
      this.computeCells();
    },
    equalizeLines: function equalizeLines() {
      if (this.hLines.length > 1 && this.vLines.length > 1) {
        // compute intersections
        this.cells = [];
        var i = 0; // horizontal (column) index

        var j = 0; // vertical (row) index

        var hRows = this.hLinesInOrder.length - 1; // only enumerate non-empty cells BETWEEN lines

        var vCols = this.vLinesInOrder.length - 1; // one less populated row/column than lines

        var hSize = (this.hLines[hRows] - this.hLines[0]) / hRows;
        var vSize = (this.vLines[vCols] - this.vLines[0]) / vCols;

        for (j = 0; j < hRows; j++) {
          this.$set(this.hLines, j, Math.round(this.hLines[0] + j * hSize));
        }

        for (i = 0; i < vCols; i++) {
          this.$set(this.vLines, i, Math.round(this.vLines[0] + i * vSize));
        }

        this.computeCells();
      }
    },
    computeCells: function computeCells() {
      if (this.hLines.length > 0 && this.vLines.length > 0) {
        // compute intersections
        // this.cells = []
        var i = 0; // horizontal (column) index

        var j = 0; // vertical (row) index

        var ul, lr; // upper left, lower right corners of cell

        var cellIndex = 0;
        var hRows = this.hLinesInOrder.length - 1; // only enumerate non-empty cells BETWEEN lines

        var vCols = this.vLinesInOrder.length - 1; // one less populated row/column than lines

        for (j = 0; j < hRows; j++) {
          for (i = 0; i < vCols; i++) {
            cellIndex = vCols * j + i;
            ul = {
              x: this.vLinesInOrder[i],
              y: this.hLinesInOrder[j]
            };
            lr = {
              x: this.vLinesInOrder[i + 1],
              y: this.hLinesInOrder[j + 1]
            };
            this.$set(this.cells, cellIndex, {
              index: cellIndex,
              upperCorner: ul,
              lowerCorner: lr,
              row: j,
              column: i,
              metadata: this.cells[cellIndex] ? this.cells[cellIndex].metadata : null,
              textfield: this.cells[cellIndex] ? this.cells[cellIndex].textfield : undefined,
              checked: this.cells[cellIndex] ? this.cells[cellIndex].checked : true
            });
          }
        }

        this.cells = cellIndex == 0 ? [] : this.cells.slice(0, cellIndex + 1);
        this.$emit('onComputeCells', this.cells.map(function (item) {
          delete item.checked;
          return item;
        }));
      }
    },
    generateJSON: function generateJSON() {
      return JSON.stringify(this.cells);
    },
    stretchGrid: function stretchGrid(deltas) {
      // compand the grid by the lower right corner change
      var dx = deltas[0];
      var dy = deltas[1];
      var vLast = this.vLines.length - 1; // number of cells

      var hLast = this.hLines.length - 1;
      var h = 0;
      var v = 0;

      for (h = 1; h < this.vLines.length; h++) {
        var value = Math.round(this.vLines[h] + h * dx / vLast);

        if (value > 0 && value < this.imageWidth) {
          this.$set(this.vLines, h, Math.round(this.vLines[h] + h * dx / vLast));
        }
      }

      for (v = 1; v < this.hLines.length; v++) {
        var _value = Math.round(this.hLines[v] + v * dy / hLast);

        if (_value > 0 && _value < this.imageHeight) {
          this.$set(this.hLines, v, Math.round(this.hLines[v] + v * dy / hLast));
        }
      }
    },
    moveGrid: function moveGrid(deltas) {
      var dx = deltas[0];
      var dy = deltas[1];
      this.moveX(dx);
      this.moveY(dy);
    },
    moveHline: function moveHline(deltas) {
      var dy = deltas[1];
      var iy = deltas[2];
      this.moveH(iy, dy); // effect line change through common function
    },
    moveVline: function moveVline(deltas) {
      var dx = deltas[0];
      var ix = deltas[2];
      this.moveV(ix, dx);
    },
    scaleForScreen: function scaleForScreen() {
      if (this.autosize) {
        var scaleHeight = this.$el.getBoundingClientRect().height < this.height ? this.height / this.$el.getBoundingClientRect().height : 1;
        var scaleWidth = this.$el.getBoundingClientRect().width < this.width ? this.width / this.$el.getBoundingClientRect().width : 1;
        return scaleHeight > scaleWidth ? scaleHeight : scaleWidth;
      } else {
        return 1;
      }
    },
    resizeSled: function resizeSled(mutationsList, observer) {
      var element = this.$el.getBoundingClientRect();
      this.scale = this.scaleForScreen();
      this.$emit('resize', {
        x: element.x,
        y: element.y,
        top: element.top,
        left: element.left,
        right: element.right,
        bottom: element.bottom,
        width: element.width,
        height: element.height,
        scale: this.scale
      });
    }
  }
});
// CONCATENATED MODULE: ./src/components/sled.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_sledvue_type_script_lang_js_ = (sledvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/sled.vue





/* normalize component */

var sled_component = normalizeComponent(
  components_sledvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var sled = (sled_component.exports);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (sled);



/***/ }),

/***/ "fdef":
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ })

/******/ })["default"];
});
//# sourceMappingURL=sled.umd.js.map
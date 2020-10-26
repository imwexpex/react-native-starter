'use strict';

Object.defineProperty(exports, '__esModule', {value: true});

var mobxStateTree = require('mobx-state-tree');

function _extends() {
  _extends =
    Object.assign ||
    function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

  return _extends.apply(this, arguments);
}

// using istanbul ignore on portions of code that are not currently used internally
var AsyncLocalStorage = {
  // must use wrapper functions when passing localStorage functions (https://github.com/agilgur5/mst-persist/issues/18)
  clear:
    /* istanbul ignore next */
    function clear() {
      return callWithPromise(function () {
        return window.localStorage.clear();
      });
    },
  getItem: function getItem(key) {
    return callWithPromise(function () {
      return window.localStorage.getItem(key);
    });
  },
  removeItem:
    /* istanbul ignore next */
    function removeItem(key) {
      return callWithPromise(function () {
        return window.localStorage.removeItem(key);
      });
    },
  setItem: function setItem(key, value) {
    return callWithPromise(function () {
      return window.localStorage.setItem(key, value);
    });
  },
};

function callWithPromise(func) {
  try {
    for (
      var _len = arguments.length,
        args = new Array(_len > 1 ? _len - 1 : 0),
        _key = 1;
      _key < _len;
      _key++
    ) {
      args[_key - 1] = arguments[_key];
    }

    return Promise.resolve(func.apply(void 0, args));
  } catch (err) {
    /* istanbul ignore next */
    return Promise.reject(err);
  }
}

var persist = function persist(name, store, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
    storage = _options.storage,
    _options$jsonify = _options.jsonify,
    jsonify = _options$jsonify === void 0 ? true : _options$jsonify,
    whitelist = _options.whitelist,
    blacklist = _options.blacklist; // use AsyncLocalStorage by default (or if localStorage was passed in)

  if (
    typeof window !== 'undefined' &&
    typeof window.localStorage !== 'undefined' &&
    (!storage || storage === window.localStorage)
  ) {
    storage = AsyncLocalStorage;
  }

  if (!storage) {
    return Promise.reject(
      'localStorage (the default storage engine) is not ' +
        'supported in this environment. Please configure a different storage ' +
        'engine via the `storage:` option.',
    );
  }

  var whitelistDict = arrToDict(whitelist);
  var blacklistDict = arrToDict(blacklist);

  mobxStateTree.onSnapshot(store, function (_snapshot) {
    // need to shallow clone as otherwise properties are non-configurable (https://github.com/agilgur5/mst-persist/pull/21#discussion_r348105595)
    var snapshot = _extends({}, _snapshot);

    Object.keys(snapshot).forEach(function (key) {
      if (whitelist && !whitelistDict[key]) {
        delete snapshot[key];
      }

      if (blacklist && blacklistDict[key]) {
        delete snapshot[key];
      }
    });

    var data = !jsonify ? snapshot : JSON.stringify(snapshot);

    storage.setItem(name, data);
  });
  return storage.getItem(name).then(function (data) {
    var snapshot = !isString(data) ? data : JSON.parse(data); // don't apply falsey (which will error), leave store in initial state

    if (!snapshot) {
      return;
    }

    mobxStateTree.applySnapshot(store, {
      ...mobxStateTree.getSnapshot(store),
      ...snapshot,
    });
  });
};

function arrToDict(arr) {
  if (!arr) {
    return {};
  }

  return arr.reduce(function (dict, elem) {
    dict[elem] = true;
    return dict;
  }, {});
}

function isString(value) {
  return typeof value === 'string';
}

exports.default = persist;
exports.persist = persist;
//# sourceMappingURL=mst-persist.cjs.development.js.map

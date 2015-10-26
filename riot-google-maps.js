(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Code refactored from Mozilla Developer Network:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 */

'use strict';

function assign(target, firstSource) {
  if (target === undefined || target === null) {
    throw new TypeError('Cannot convert first argument to object');
  }

  var to = Object(target);
  for (var i = 1; i < arguments.length; i++) {
    var nextSource = arguments[i];
    if (nextSource === undefined || nextSource === null) {
      continue;
    }

    var keysArray = Object.keys(Object(nextSource));
    for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
      var nextKey = keysArray[nextIndex];
      var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
      if (desc !== undefined && desc.enumerable) {
        to[nextKey] = nextSource[nextKey];
      }
    }
  }
  return to;
}

function polyfill() {
  if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: assign
    });
  }
}

module.exports = {
  assign: assign,
  polyfill: polyfill
};

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ["bounds_changed", "center_changed", "click", "dblclick", "drag", "dragend", "dragstart", "heading_changed", "idle", "maptypeid_changed", "mousemove", "mouseout", "mouseover", "projection_changed", "resize", "rightclick", "tilesloaded", "tilt_changed", "zoom_changed"];
module.exports = exports["default"];

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ["animation_changed", "click", "clickable_changed", "cursor_changed", "dblclick", "drag", "dragend", "draggable_changed", "dragstart", "flat_changed", "icon_changed", "mousedown", "mouseout", "mouseover", "mouseup", "position_changed", "rightclick", "shape_changed", "title_changed", "visible_changed", "zindex_changed"];
module.exports = exports["default"];

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ["places_changed"];
module.exports = exports["default"];

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

var _GoogleMapEventsJs = require('./GoogleMapEvents.js');

exports.googleMapEvents = _interopRequire(_GoogleMapEventsJs);

var _MarkerEventsJs = require('./MarkerEvents.js');

exports.markerEvents = _interopRequire(_MarkerEventsJs);

var _SearchBoxEventsJs = require('./SearchBoxEvents.js');

exports.searchBoxEvents = _interopRequire(_SearchBoxEventsJs);

},{"./GoogleMapEvents.js":2,"./MarkerEvents.js":3,"./SearchBoxEvents.js":4}],6:[function(require,module,exports){
'use strict';

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _mixins = require('./mixins');

var _tagsGoogleMapTag = require('./tags/GoogleMap.tag');

var GoogleMapTag = _interopRequireWildcard(_tagsGoogleMapTag);

var _tagsMarkerTag = require('./tags/Marker.tag');

var MarkerTag = _interopRequireWildcard(_tagsMarkerTag);

var _tagsSearchBoxTag = require('./tags/SearchBox.tag');

var SearchBoxTag = _interopRequireWildcard(_tagsSearchBoxTag);

riot.mixin('GoogleMapMixin', new _mixins.GoogleMapMixin());
riot.mixin('MarkerMixin', new _mixins.MarkerMixin());
riot.mixin('SearchBoxMixin', new _mixins.SearchBoxMixin());
riot.mixin('StateMixin', new _mixins.StateMixin());

},{"./mixins":11,"./tags/GoogleMap.tag":12,"./tags/Marker.tag":13,"./tags/SearchBox.tag":14}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = GoogleMapMixin;

var _events = require('../events');

var _utils = require('../utils');

var MAP_OPTIONS = ['center', 'heading', 'mapTypeId', 'options', 'streetview', 'tilt', 'zoom'];

var updaters = {
  center: function center(_center, tag) {
    tag.map.setCenter(_center);
  },
  heading: function heading(_heading, tag) {
    tag.map.setHeading(_heading);
  },
  mapTypeId: function mapTypeId(_mapTypeId, tag) {
    tag.map.setMapTypeId(_mapTypeId);
  },
  options: function options(_options, tag) {
    tag.map.setOptions(_options);
  },
  streetView: function streetView(_streetView, tag) {
    tag.map.setStreetView(_streetView);
  },
  tilt: function tilt(_tilt, tag) {
    tag.map.setTilt(_tilt);
  },
  zoom: function zoom(_zoom, tag) {
    tag.map.setZoom(_zoom);
  }
};

function GoogleMapMixin() {

  this.init = function () {
    this.on('mount', this.onMount);
    this.on('unmount', this.onUnmount);
    this.on('update', this.onUpdate);
  };

  this.onMount = function () {
    var mapOptions = (0, _utils.composeOptions)(MAP_OPTIONS, this.opts);
    this.map = this.createMap(this.mapelem, mapOptions);
    this.registeredEvents = (0, _utils.registerEvents)(_events.googleMapEvents, this.opts, this.map);
  };

  this.onUnmount = function () {
    (0, _utils.unregisterEvents)(this.registeredEvents);
    this.registeredEvents = undefined;
  };

  this.onUpdate = function () {
    var _this = this;

    Object.keys(this.opts).forEach(function (optionName) {
      var opt = _this.opts[optionName];
      var prevOpt = _this.prevOpts[optionName];
      var updater = updaters[optionName];

      if (opt !== prevOpt && updater) {
        updater(opt, _this);
      }
    });
  };

  this.createMap = function (elem, options) {
    return new google.maps.Map(elem, options);
  };
}

module.exports = exports['default'];

},{"../events":5,"../utils":16}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = MarkerMixin;

var _events = require('../events');

var _utils = require('../utils');

var MARKER_OPTIONS = ['animation', 'attribution', 'clickable', 'cursor', 'draggable', 'icon', 'label', 'opacity', 'options', 'place', 'position', 'shape', 'title', 'visible', 'zIndex'];

var updaters = {
  animation: function animation(_animation, tag) {
    tag.marker.setAnimation(_animation);
  },
  attribution: function attribution(_attribution, tag) {
    tag.marker.setAttribution(_attribution);
  },
  clickable: function clickable(_clickable, tag) {
    tag.marker.setClickable(_clickable);
  },
  cursor: function cursor(_cursor, tag) {
    tag.marker.setCursor(_cursor);
  },
  draggable: function draggable(_draggable, tag) {
    tag.marker.setDraggable(_draggable);
  },
  icon: function icon(_icon, tag) {
    tag.marker.setIcon(_icon);
  },
  label: function label(_label, tag) {
    tag.marker.setLabel(_label);
  },
  opacity: function opacity(_opacity, tag) {
    tag.marker.setOpacity(_opacity);
  },
  options: function options(_options, tag) {
    tag.marker.setOptions(_options);
  },
  place: function place(_place, tag) {
    tag.marker.setPlace(_place);
  },
  position: function position(_position, tag) {
    tag.marker.setPosition(_position);
  },
  shape: function shape(_shape, tag) {
    tag.marker.setShape(_shape);
  },
  title: function title(_title, tag) {
    tag.marker.setTitle(_title);
  },
  visible: function visible(_visible, tag) {
    tag.marker.setVisible(_visible);
  },
  zIndex: function zIndex(_zIndex, tag) {
    tag.marker.setZIndex(_zIndex);
  }
};

function MarkerMixin() {

  this.init = function () {
    this.on('mount', this.onMount);
    this.on('unmount', this.onUnmount);
    this.on('update', this.onUpdate);
  };

  this.onMount = function () {
    var mapref = this.parent.map;
    var markerOptions = (0, _utils.composeOptions)(MARKER_OPTIONS, this.opts);
    this.marker = this.createMarker(mapref, markerOptions);
    this.registeredEvents = (0, _utils.registerEvents)(_events.markerEvents, this.opts, mapref);
  };

  this.onUnmount = function () {
    this.marker.setMap(null);
    (0, _utils.unregisterEvents)(this.registeredEvents);
    this.registeredEvents = undefined;
  };

  this.onUpdate = function () {
    var _this = this;

    Object.keys(this.opts).forEach(function (optionName) {
      var opt = _this.opts[optionName];
      var prevOpt = _this.prevOpts[optionName];
      var updater = updaters[optionName];

      if (opt !== prevOpt && updater) {
        updater(opt, _this);
      }
    });
  };

  this.createMarker = function (mapInstance, options) {
    var marker = new google.maps.Marker(options);
    marker.setMap(mapInstance);
    return marker;
  };
}

module.exports = exports['default'];

},{"../events":5,"../utils":16}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = SearchBoxMixin;

var _events = require('../events');

var _utils = require('../utils');

var SEARCH_BOX_OPTIONS = ['bounds'];

var updaters = {
  bounds: function bounds(_bounds, tag) {
    tag.searchBox.setBounds(_bounds);
  }
};

function SearchBoxMixin() {

  this.init = function () {
    this.on('mount', this.onMount);
    this.on('unmount', this.onUnmount);
    this.on('update', this.onUpdate);
  };

  this.onMount = function () {
    var controlposition = this.opts.controlposition;

    var mapref = this.parent.map;
    var searchBoxOptions = (0, _utils.composeOptions)(SEARCH_BOX_OPTIONS, this.opts);
    this.searchBox = this.createSearchBox(this.search, searchBoxOptions);
    this.registeredEvents = (0, _utils.registerEvents)(_events.searchBoxEvents, this.opts, this.searchBox);
    this.addToMap(this.search, controlposition, mapref);
  };

  this.onUnmount = function () {
    var _opts = this.opts;
    var mapref = _opts.mapref;
    var controlPosition = _opts.controlPosition;

    this.removeFromMap(this.search, controlPosition, mapref);
    (0, _utils.unregisterEvents)(this.registeredEvents);
    this.registeredEvents = undefined;
  };

  this.onUpdate = function () {
    var _this = this;

    Object.keys(this.opts).forEach(function (optionName) {
      var opt = _this.opts[optionName];
      var prevOpt = _this.prevOpts[optionName];
      var updater = updaters[optionName];

      if (opt !== prevOpt && updater) {
        updater(opt, _this);
      }
    });
  };

  this.createSearchBox = function (searchInput, options) {
    return new google.maps.places.SearchBox(searchInput, options);
  };

  this.addToMap = function (searchInput, controlPosition, mapInstance) {
    mapInstance.controls[controlPosition].push(searchInput);
  };

  this.removeFromMap = function (searchInput, controlPosition, mapInstance) {
    var index = mapInstance.controls[controlPosition].getArray().indexOf(searchInput);
    mapInstance.controls[controlPosition].removeAt(index);
  };
}

module.exports = exports['default'];

},{"../events":5,"../utils":16}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = StateMixin;

var _es6ObjectAssign = require('es6-object-assign');

function StateMixin() {

  this.init = function () {
    this.prevOpts = {};
    this.on('updated', storeState.bind(this));
  };
}

function storeState() {
  this.tagState = (0, _es6ObjectAssign.assign)({}, this.opts);
}
module.exports = exports['default'];

},{"es6-object-assign":1}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

var _GoogleMapMixin = require('./GoogleMapMixin');

exports.GoogleMapMixin = _interopRequire(_GoogleMapMixin);

var _MarkerMixin = require('./MarkerMixin');

exports.MarkerMixin = _interopRequire(_MarkerMixin);

var _SearchBoxMixin = require('./SearchBoxMixin');

exports.SearchBoxMixin = _interopRequire(_SearchBoxMixin);

var _StateMixin = require('./StateMixin');

exports.StateMixin = _interopRequire(_StateMixin);

},{"./GoogleMapMixin":7,"./MarkerMixin":8,"./SearchBoxMixin":9,"./StateMixin":10}],12:[function(require,module,exports){
(function (global){
var riot = (typeof window !== "undefined" ? window['riot'] : typeof global !== "undefined" ? global['riot'] : null);
module.exports = riot.tag('google-map', '<div name="mapelem"></div> <yield ></yield>', function(opts) {
this.mixin('GoogleMapMixin', 'StateMixin');
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],13:[function(require,module,exports){
(function (global){
var riot = (typeof window !== "undefined" ? window['riot'] : typeof global !== "undefined" ? global['riot'] : null);
module.exports = riot.tag('marker', '<yield ></yield>', function(opts) {
this.mixin('MarkerMixin', 'StateMixin');
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],14:[function(require,module,exports){
(function (global){
var riot = (typeof window !== "undefined" ? window['riot'] : typeof global !== "undefined" ? global['riot'] : null);
module.exports = riot.tag('search-box', '<input class="search-box-input" type="text" name="search">', function(opts) {
this.mixin('SearchBoxMixin', 'StateMixin');
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports["default"] = composeOptions;

function composeOptions(optionNames, opts) {
  var options = opts.options;

  var composition = optionNames.reduce(function (acc, name) {
    if (name === 'options') {
      return acc;
    }

    var value = opts[name];
    if (typeof value !== "undefined") {
      acc[name] = value;
    }

    return acc;
  }, {});

  return _extends({}, composition, options);
}

module.exports = exports["default"];

},{}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

var _registerEventsJs = require('./registerEvents.js');

exports.registerEvents = _interopRequire(_registerEventsJs);

var _unregisterEventsJs = require('./unregisterEvents.js');

exports.unregisterEvents = _interopRequire(_unregisterEventsJs);

var _composeOptionsJs = require('./composeOptions.js');

exports.composeOptions = _interopRequire(_composeOptionsJs);

},{"./composeOptions.js":15,"./registerEvents.js":17,"./unregisterEvents.js":18}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = registerEvents;
var addListener = google.maps.event.addListener;

function registerEvents(eventList, handlers, instance) {
  var registeredEvents = eventList.reduce(function (acc, eventName) {
    var onEventName = "on" + eventName;

    if (handlers.hasOwnProperty(onEventName)) {
      acc.push(addListener(instance, eventName, handlers[onEventName]));
    }

    return acc;
  }, []);

  return registeredEvents;
}

module.exports = exports["default"];

},{}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = unregisterEvents;
var removeListener = google.maps.event.removeListener;

function unregisterEvents(registeredEvents) {
  registeredEvents.forEach(function (registeredEvent) {
    return removeListener(registeredEvent);
  });
}

module.exports = exports["default"];

},{}]},{},[6]);

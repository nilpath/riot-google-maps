(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ["bounds_changed", "center_changed", "click", "dblclick", "drag", "dragend", "dragstart", "heading_changed", "idle", "maptypeid_changed", "mousemove", "mouseout", "mouseover", "projection_changed", "resize", "rightclick", "tilesloaded", "tilt_changed", "zoom_changed"];
module.exports = exports["default"];

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ["animation_changed", "click", "clickable_changed", "cursor_changed", "dblclick", "drag", "dragend", "draggable_changed", "dragstart", "flat_changed", "icon_changed", "mousedown", "mouseout", "mouseover", "mouseup", "position_changed", "rightclick", "shape_changed", "title_changed", "visible_changed", "zindex_changed"];
module.exports = exports["default"];

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ["places_changed"];
module.exports = exports["default"];

},{}],4:[function(require,module,exports){
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

},{"./GoogleMapEvents.js":1,"./MarkerEvents.js":2,"./SearchBoxEvents.js":3}],5:[function(require,module,exports){
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

},{"./mixins":9,"./tags/GoogleMap.tag":10,"./tags/Marker.tag":11,"./tags/SearchBox.tag":12}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = GoogleMapMixin;

var _events = require('../events');

var _utils = require('../utils');

var MAP_OPTIONS = ['center', 'heading', 'mapTypeId', 'options', 'streetview', 'tilt', 'zoom'];

function GoogleMapMixin() {

  this.init = function () {
    //console.log('init GoogleMapMixin');
  };

  this.onMount = function () {
    var mapOptions = (0, _utils.composeOptions)(MAP_OPTIONS, this.opts);
    this.map = this.createMap(this.root, mapOptions);
    this.registeredEvents = (0, _utils.registerEvents)(_events.googleMapEvents, this.opts, this.map);
  };

  this.onUnmount = function () {
    (0, _utils.unregisterEvents)(this.registeredEvents);
    this.registeredEvents = undefined;
  };

  this.createMap = function (elem, options) {
    return new google.maps.Map(elem, options);
  };
}

module.exports = exports['default'];

},{"../events":4,"../utils":14}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = MarkerMixin;

var _events = require('../events');

var _utils = require('../utils');

var MARKER_OPTIONS = ['animation', 'attribution', 'clickable', 'cursor', 'draggable', 'icon', 'label', 'opacity', 'options', 'place', 'position', 'shape', 'title', 'visible', 'zIndex'];

function MarkerMixin() {

  this.init = function () {};

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

  this.createMarker = function (mapInstance, options) {
    var marker = new google.maps.Marker(options);
    marker.setMap(mapInstance);
    return marker;
  };
}

module.exports = exports['default'];

},{"../events":4,"../utils":14}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = SearchBoxMixin;

var _events = require('../events');

var _utils = require('../utils');

var SEARCH_BOX_OPTIONS = ['bounds'];

function SearchBoxMixin() {

  this.init = function () {};

  this.onMount = function () {
    var _opts = this.opts;
    var mapref = _opts.mapref;
    var controlPosition = _opts.controlPosition;

    var searchBoxOptions = (0, _utils.composeOptions)(SEARCH_BOX_OPTIONS, this.opts);
    this.searchBox = this.createSearchBox(this.search, searchBoxOptions);
    this.registeredEvents = (0, _utils.registerEvents)(_events.searchBoxEvents, this.opts, this.searchBox);
    this.addToMap(this.search, controlPosition, mapref);
  };

  this.onUnmount = function () {
    var _opts2 = this.opts;
    var mapref = _opts2.mapref;
    var controlPosition = _opts2.controlPosition;

    this.removeFromMap(this.search, controlPosition, mapref);
    (0, _utils.unregisterEvents)(this.registeredEvents);
    this.registeredEvents = undefined;
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

},{"../events":4,"../utils":14}],9:[function(require,module,exports){
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

},{"./GoogleMapMixin":6,"./MarkerMixin":7,"./SearchBoxMixin":8}],10:[function(require,module,exports){
(function (global){
var riot = (typeof window !== "undefined" ? window['riot'] : typeof global !== "undefined" ? global['riot'] : null);
module.exports = riot.tag('google-map', '<yield ></yield>', function(opts) {
this.mixin('GoogleMapMixin');
this.on('mount', this.onMount);
this.on('unmount', this.onUnmount);
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],11:[function(require,module,exports){
(function (global){
var riot = (typeof window !== "undefined" ? window['riot'] : typeof global !== "undefined" ? global['riot'] : null);
module.exports = riot.tag('marker', '<yield ></yield>', function(opts) {
this.mixin('MarkerMixin');
this.on('mount', this.onMount);
this.on('unmount', this.onUnmount);
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],12:[function(require,module,exports){
(function (global){
var riot = (typeof window !== "undefined" ? window['riot'] : typeof global !== "undefined" ? global['riot'] : null);
module.exports = riot.tag('search-box', '<input type="text" name="search">', function(opts) {
this.mixin('SearchBoxMixin');
this.on('mount', this.onMount);
this.on('unmount', this.onUnmount);
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
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

},{"./composeOptions.js":13,"./registerEvents.js":15,"./unregisterEvents.js":16}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
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

},{}]},{},[5]);

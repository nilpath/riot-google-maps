import {googleMapEvents} from '../events';
import {
  composeOptions,
  registerEvents,
  unregisterEvents,
  applyUpdaters
} from '../utils';

const MAP_OPTIONS = [
  'center',
  'heading',
  'maptypeid',
  'options',
  'streetview',
  'tilt',
  'zoom'
];

export const googleMapUpdaters = {
  center      (center, tag) { tag.map.setCenter(center); },
  heading     (heading, tag) { tag.map.setHeading(heading); },
  maptypeid   (mapTypeId, tag) { tag.map.setMapTypeId(mapTypeId); },
  options     (options, tag) { tag.map.setOptions(options); },
  streetview  (streetView, tag) { tag.map.setStreetView(streetView); },
  tilt        (tilt, tag) { tag.map.setTilt(tilt); },
  zoom        (zoom, tag) { tag.map.setZoom(zoom); }
};

export default function GoogleMapMixin() {

  this.init = function () {
    this.on('before-mount', this.onBeforeMount);
    this.on('mount', this.onMount);
    this.on('unmount', this.onUnmount);
    this.on('update', this.onUpdate);
  };

  this.onBeforeMount = function() {
    const mapOptions = composeOptions(MAP_OPTIONS, this.opts);
    this.map = this.createMap(this.mapelem, mapOptions);
  };

  this.onMount = function () {
    this.registeredEvents = registerEvents(googleMapEvents, this.opts, this.map);
  };

  this.onUnmount = function () {
    unregisterEvents(this.registeredEvents);
    this.registeredEvents = undefined;
  };

  this.onUpdate = function () {
    if(!this.map) return;
    applyUpdaters(this.opts, this.prevOpts, googleMapUpdaters, this);
  };

  this.createMap = function (elem, options) {
    return new google.maps.Map(elem, options);
  };

  this.getMapId = function () {
    return this.opts.mapId;
  };

}

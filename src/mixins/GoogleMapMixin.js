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
  'mapTypeId',
  'options', 
  'streetview', 
  'tilt',
  'zoom'
];

const updaters = {
  center      (center, tag) { tag.map.setCenter(center); },
  heading     (heading, tag) { tag.map.setHeading(heading); },
  mapTypeId   (mapTypeId, tag) { tag.map.setMapTypeId(mapTypeId); },
  options     (options, tag) { tag.map.setOptions(options); },
  streetView  (streetView, tag) { tag.map.setStreetView(streetView); },
  tilt        (tilt, tag) { tag.map.setTilt(tilt); },
  zoom        (zoom, tag) { tag.map.setZoom(zoom); }
};

export default function GoogleMapMixin() {
    
  this.init = function () {
    this.on('mount', this.onMount);
    this.on('unmount', this.onUnmount);
    this.on('update', this.onUpdate);
  };
  
  this.onMount = function () {
    const mapOptions = composeOptions(MAP_OPTIONS, this.opts);
    this.map = this.createMap(this.mapelem, mapOptions);
    this.registeredEvents = registerEvents(googleMapEvents, this.opts, this.map);
  };
  
  this.onUnmount = function () {
    unregisterEvents(this.registeredEvents);
    this.registeredEvents = undefined;
  };
  
  this.onUpdate = function () {
    if(!this.map) return;
    applyUpdaters(this.opts, this.prevOpts, updaters, this);
  };
  
  this.createMap = function (elem, options) {
    return new google.maps.Map(elem, options);
  };

}


import {markerEvents} from '../events';
import {composeOptions, registerEvents, unregisterEvents} from '../utils';

const MARKER_OPTIONS = [
  'animation', 
  'attribution', 
  'clickable', 
  'cursor',
  'draggable', 
  'icon', 
  'label', 
  'opacity', 
  'options',
  'place', 
  'position', 
  'shape', 
  'title', 
  'visible',
  'zIndex'
];

export default function MarkerMixin() {
  
  this.init = function () {
    
  };
  
  this.onMount = function () {
    const mapref = this.parent.map;
    const markerOptions = composeOptions(MARKER_OPTIONS, this.opts);
    this.marker = this.createMarker(mapref, markerOptions);
    this.registeredEvents = registerEvents(markerEvents, this.opts, mapref);
  };
  
  this.onUnmount = function () {
    this.marker.setMap(null);
    unregisterEvents(this.registeredEvents);
    this.registeredEvents = undefined;
  };
  
  this.createMarker = function (mapInstance, options) {
    const marker = new google.maps.Marker(options);
    marker.setMap(mapInstance);
    return marker;
  };
  
}
import {directionsRendererEvents} from '../events';
import {
  composeOptions, 
  registerEvents, 
  unregisterEvents, 
  applyUpdaters
} from '../utils';

const DIRECTIONS_RENDERER_OPTIONS = [
  'directions',
  'options',
  'panel',
  'routeindex'
];

export const directionsRendererUpdaters = {
  directions  (directions, tag) { tag.directionsRenderer.setDirections(directions); },
  options     (options, tag) { tag.directionsRenderer.setOptions(options); },
  panel       (panel, tag) { tag.directionsRenderer.setPanel(panel); },
  routeindex  (routeIndex, tag) { tag.directionsRenderer.setRouteIndex(routeIndex); },
};

export default function DirectionsRendererMixin() {
  
  this.init = function () {
    this.on('mount', this.onMount);
    this.on('unmount', this.onUnmount);
    this.on('update', this.onUpdate);
  };
  
  this.onMount = function () {
    const mapref = this.parent.map;
    const options = composeOptions(DIRECTIONS_RENDERER_OPTIONS, this.opts);
    this.directionsRenderer = this.createDirectionsRenderer(options, mapref);
    this.registeredEvents = registerEvents(directionsRendererEvents, this.opts, this.directionsRenderer);
  };
  
  this.onUnmount = function () {
    unregisterEvents(this.registeredEvents);
    this.directionsRenderer.setMap(null);
    this.registeredEvents = undefined;
  };
  
  this.onUpdate = function () {
    if(!this.directionsRenderer) return;
    applyUpdaters(this.opts, this.prevOpts, directionsRendererUpdaters, this);
  };
  
  this.createDirectionsRenderer = function (options, mapInstance) {
    const renderer = new google.maps.DirectionsRenderer(options);
    renderer.setMap(mapInstance);
    return renderer;
  };
  
}
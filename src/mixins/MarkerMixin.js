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

const updaters = {
  animation   (animation, tag) { tag.marker.setAnimation(animation); },
  attribution (attribution, tag) { tag.marker.setAttribution(attribution); },
  clickable   (clickable, tag) { tag.marker.setClickable(clickable); },
  cursor      (cursor, tag) { tag.marker.setCursor(cursor); },
  draggable   (draggable, tag) { tag.marker.setDraggable(draggable); },
  icon        (icon, tag) { tag.marker.setIcon(icon); },
  label       (label, tag) { tag.marker.setLabel(label); },
  opacity     (opacity, tag) { tag.marker.setOpacity(opacity); },
  options     (options, tag) { tag.marker.setOptions(options); },
  place       (place, tag) { tag.marker.setPlace(place); },
  position    (position, tag) { tag.marker.setPosition(position); },
  shape       (shape, tag) { tag.marker.setShape(shape); },
  title       (title, tag) { tag.marker.setTitle(title); },
  visible     (visible, tag) { tag.marker.setVisible(visible); },
  zIndex      (zIndex, tag) { tag.marker.setZIndex(zIndex); }
};

export default function MarkerMixin() {
  
  this.init = function () {
    this.on('mount', this.onMount);
    this.on('unmount', this.onUnmount);
    this.on('update', this.onUpdate);
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
  
  this.onUpdate = function () {
    if(!this.marker) return;
    Object.keys(this.opts).forEach((optionName) => {
      const opt = this.opts[optionName];
      const prevOpt = this.prevOpts[optionName];
      const updater = updaters[optionName];
      
      if(opt !== prevOpt && updater) {
        updater(opt, this);
      }
    });
  };
  
  this.createMarker = function (mapInstance, options) {
    const marker = new google.maps.Marker(options);
    marker.setMap(mapInstance);
    return marker;
  };
  
}
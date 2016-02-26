import { infoWindowEvents } from '../events';
import {
  composeOptions,
  registerEvents,
  unregisterEvents,
  applyUpdaters
} from '../utils';

const INFO_WINDOW_OPTIONS = [
  'content',
  'options',
  'position',
  'zIndex'
];

export const infoWindowUpdaters = {
  //children(children, tag) { setContentForOptionalReactElement(children, component.getInfoWindow()); },
  content(content, tag) { tag.infoWindow.setContent(content); },
  options(options, tag) { tag.infoWindow.setOptions(options); },
  position(position, tag) { tag.infoWindow.setPosition(position); },
  zIndex(zIndex, tag) { tag.infoWindow.setZIndex(zIndex); }
}

function setChildrenAsContent(children, infoWindow) {
  const domEl = children[0].cloneNode(true);
  infoWindow.setContent(domEl);
}

function isVisible(opts) {
  return opts.if === true || opts.show === true || opts.hide === false;
}

function showInfoWindow(infoWindow, mapInstance, anchorInstance) {
  if(anchorInstance) {
    infoWindow.open(mapInstance, anchorInstance);
  } else {
    infoWindow.setMap(mapInstance);
  }
}

export default function InfoWindowMixin() {

  this.init = function () {
    this.on('mount', this.onMount);
    this.on('unmount', this.onUnmount);
    this.on('update', this.onUpdate);
  };

  this.onMount = function() {
    const mapref = this.parent.getMap();
    const anchorref = this.parent.anchorRef;
    const infoWindowOptions = composeOptions(INFO_WINDOW_OPTIONS, this.opts);
    this.infoWindow = this.createInfoWindow(infoWindowOptions);
    this.registeredEvents = registerEvents(infoWindowEvents, this.opts, this.infoWindow);
    showInfoWindow(this.infoWindow, mapref, anchorref);
  };

  this.onUnmount = function() {
    this.infoWindow.setMap(null);
    unregisterEvents(this.registeredEvents);
    this.registeredEvents = undefined;
  };

  this.onUpdate = function() {
    if(!this.infoWindow) { return; }
    const mapref = this.parent.getMap();
    const anchorref = this.parent.anchorRef;

    applyUpdaters(this.opts, this.prevOpts, infoWindowUpdaters, this);
    setChildrenAsContent(this.root.children, this.infoWindow);

    if(isVisible(this.opts)) {
      showInfoWindow(this.infoWindow, mapref, anchorref);
    }
  };

  this.createInfoWindow = function(options) {
    const infoWindow = new google.maps.InfoWindow(options);

    if(this.root.children.length > 0) {
      setChildrenAsContent(this.root.children, infoWindow);
    }

    return infoWindow;
  }
}

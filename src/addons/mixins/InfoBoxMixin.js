import { default as GoogleInfoBox } from 'google-maps-infobox';
import { infoBoxEvents } from '../events';
import {
  composeOptions,
  registerEvents,
  unregisterEvents,
  applyUpdaters
} from '../../utils';

const INFO_BOX_OPTIONS = [
  'content',
  'options',
  'position',
  'zIndex',
  'visible'
];

export const infoBoxUpdaters = {
  content(content, tag) { tag.infoBox.setContent(content); },
  options(options, tag) { tag.infoBox.setOptions(options); },
  position(position, tag) { tag.infoBox.setPosition(position); },
  zIndex(zIndex, tag) { tag.infoBox.setZIndex(zIndex); },
  visibile(visible, tag) { tag.infoBox.setVisible(visible); }
}

function setChildrenAsContent(children, infoBox) {
  const domEl = children[0].cloneNode(true);
  infoBox.setContent(domEl);
}

function isVisible(opts) {
  return opts.if === true || opts.show === true || opts.hide === false;
}

function showInfoBox(infoBox, mapInstance, anchorInstance) {
  if(anchorInstance) {
    infoBox.open(mapInstance, anchorInstance);
  } else {
    infoBox.open(mapInstance);
  }
}

export default function InfoBoxMixin() {

  this.init = function () {
    this.on('mount', this.onMount);
    this.on('unmount', this.onUnmount);
    this.on('update', this.onUpdate);
  };

  this.onMount = function() {
    const mapref = this.parent.getMap();
    const anchorref = this.parent.anchorRef;
    const infoBoxOptions = composeOptions(INFO_BOX_OPTIONS, this.opts);
    this.infoBox = this.createInfoBox(infoBoxOptions);
    this.registeredEvents = registerEvents(infoBoxEvents, this.opts, this.infoBox);
    showInfoBox(this.infoBox, mapref, anchorref);
  };

  this.onUnmount = function() {
    this.infoBox.setMap(null);
    unregisterEvents(this.registeredEvents);
    this.registeredEvents = undefined;
  };

  this.onUpdate = function() {
    if(!this.infoBox) { return; }
    const mapref = this.parent.getMap();
    const anchorref = this.parent.anchorRef;

    applyUpdaters(this.opts, this.prevOpts, infoBoxUpdaters, this);
    setChildrenAsContent(this.root.children, this.infoBox);
    
    if(isVisible(this.opts)) {
      showInfoBox(this.infoBox, mapref, anchorref);
    } else {
      this.infoBox.close();
    }
  };

  this.createInfoBox = function(options) {
    const infoBox = new GoogleInfoBox(options);

    if(this.root.children.length > 0) {
      setChildrenAsContent(this.root.children, infoBox);
    }
    return infoBox;
  }
}

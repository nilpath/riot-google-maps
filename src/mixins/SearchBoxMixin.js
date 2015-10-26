import {searchBoxEvents} from '../events';
import {composeOptions, registerEvents, unregisterEvents} from '../utils';

const SEARCH_BOX_OPTIONS = ['bounds'];

const updaters = {
  bounds(bounds, tag) { tag.searchBox.setBounds(bounds); }
};

export default function SearchBoxMixin() {
  
  this.init = function () {
    this.on('mount', this.onMount);
    this.on('unmount', this.onUnmount);
    this.on('update', this.onUpdate);
  };
  
  this.onMount = function () {
    const {controlposition} = this.opts;
    const mapref = this.parent.map;
    const searchBoxOptions = composeOptions(SEARCH_BOX_OPTIONS, this.opts);
    this.searchBox = this.createSearchBox(this.search, searchBoxOptions);
    this.registeredEvents = registerEvents(searchBoxEvents, this.opts, this.searchBox);
    this.addToMap(this.search, controlposition, mapref);
  };
  
  this.onUnmount = function () {
    const {mapref, controlPosition} = this.opts;
    this.removeFromMap(this.search, controlPosition, mapref);
    unregisterEvents(this.registeredEvents);
    this.registeredEvents = undefined;
  };
  
  this.onUpdate = function () {
    if(!this.searchBox) return;
    Object.keys(this.opts).forEach((optionName) => {
      const opt = this.opts[optionName];
      const prevOpt = this.prevOpts[optionName];
      const updater = updaters[optionName];
      
      if(opt !== prevOpt && updater) {
        updater(opt, this);
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
    const index = mapInstance.controls[controlPosition].getArray().indexOf(searchInput);
    mapInstance.controls[controlPosition].removeAt(index);
  };
  
}
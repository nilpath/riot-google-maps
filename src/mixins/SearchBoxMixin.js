import {searchBoxEvents} from '../events';
import {composeOptions, registerEvents, unregisterEvents} from '../utils';

const SEARCH_BOX_OPTIONS = ['bounds'];

export default function SearchBoxMixin() {
  
  this.init = function () {
    
  };
  
  this.onMount = function () {
    const {mapref, controlPosition} = this.opts;
    const searchBoxOptions = composeOptions(SEARCH_BOX_OPTIONS, this.opts);
    this.searchBox = this.createSearchBox(this.search, searchBoxOptions);
    this.registeredEvents = registerEvents(searchBoxEvents, this.opts, this.searchBox);
    this.addToMap(this.search, controlPosition, mapref);
  };
  
  this.onUnmount = function () {
    const {mapref, controlPosition} = this.opts;
    this.removeFromMap(this.search, controlPosition, mapref);
    unregisterEvents(this.registeredEvents);
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
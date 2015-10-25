import {googleMapEvents} from '../events';
import {composeOptions, registerEvents, unregisterEvents} from '../utils';

const MAP_OPTIONS = [
  'center', 
  'heading', 
  'mapTypeId',
  'options', 
  'streetview', 
  'tilt',
  'zoom'
];

export default function GoogleMapMixin() {
    
  this.init = function () {
    //console.log('init GoogleMapMixin');
  };
  
  this.onMount = function () {
    const mapOptions = composeOptions(MAP_OPTIONS, this.opts);
    this.map = this.createMap(this.root, mapOptions);
    this.registeredEvents = registerEvents(googleMapEvents, this.opts, this.map);
  };
  
  this.onUnmount = function () {
    unregisterEvents(this.registeredEvents);
  };
  
  this.createMap = function (elem, options) {
    return new google.maps.Map(elem, options);
  };

}


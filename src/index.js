import {
  RiotMapsMixin,
  GoogleMapMixin,
  MarkerMixin,
  SearchBoxMixin,
  DirectionsRendererMixin,
  InfoWindowMixin,
  StateMixin
} from './mixins';

riot.mixin('RiotMapsMixin', new RiotMapsMixin());
riot.mixin('GoogleMapMixin', new GoogleMapMixin());
riot.mixin('MarkerMixin', new MarkerMixin());
riot.mixin('SearchBoxMixin', new SearchBoxMixin());
riot.mixin('DirectionsRendererMixin', new DirectionsRendererMixin());
riot.mixin('InfoWindowMixin', new InfoWindowMixin());
riot.mixin('StateMixin', new StateMixin());

export { default as GoogleMapTag } from './tags/GoogleMap.tag';
export { default as MarkerTag } from './tags/Marker.tag';
export { default as SearchBoxTag } from './tags/SearchBox.tag';
export { default as InfoWindowTag } from './tags/InfoWindow.tag';

if(!window.google && !!window.console) { console.warn('could not find google maps.'); }

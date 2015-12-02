import {
  RiotMapsMixin,
  GoogleMapMixin,
  MarkerMixin,
  SearchBoxMixin,
  DirectionsRendererMixin,
  StateMixin
} from './mixins';

riot.mixin('RiotMapsMixin', new RiotMapsMixin());
riot.mixin('GoogleMapMixin', new GoogleMapMixin());
riot.mixin('MarkerMixin', new MarkerMixin());
riot.mixin('SearchBoxMixin', new SearchBoxMixin());
riot.mixin('DirectionsRendererMixin', new DirectionsRendererMixin());
riot.mixin('StateMixin', new StateMixin());

export { default as GoogleMapTag } from './tags/GoogleMap.tag';
export { default as MarkerTag } from './tags/Marker.tag';
export { default as SearchBoxTag } from './tags/SearchBox.tag';
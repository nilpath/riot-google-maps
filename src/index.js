import {
  GoogleMapMixin,
  MarkerMixin,
  SearchBoxMixin,
  DirectionsRendererMixin,
  StateMixin
} from './mixins';

riot.mixin('GoogleMapMixin', new GoogleMapMixin());
riot.mixin('MarkerMixin', new MarkerMixin());
riot.mixin('SearchBoxMixin', new SearchBoxMixin());
riot.mixin('DirectionsRendererMixin', new DirectionsRendererMixin());
riot.mixin('StateMixin', new StateMixin());

import * as GoogleMapTag from './tags/GoogleMap.tag';
import * as MarkerTag from './tags/Marker.tag';
import * as SearchBoxTag from './tags/SearchBox.tag';
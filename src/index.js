import {
  GoogleMapMixin,
  MarkerMixin,
  SearchBoxMixin,
  StateMixin
} from './mixins';

riot.mixin('GoogleMapMixin', new GoogleMapMixin());
riot.mixin('MarkerMixin', new MarkerMixin());
riot.mixin('SearchBoxMixin', new SearchBoxMixin());
riot.mixin('StateMixin', new StateMixin());

import * as GoogleMapTag from './tags/GoogleMap.tag';
import * as MarkerTag from './tags/Marker.tag';
import * as SearchBoxTag from './tags/SearchBox.tag';
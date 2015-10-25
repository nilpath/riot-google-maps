import {
  GoogleMapMixin,
  MarkerMixin,
  SearchBoxMixin
} from './mixins';

riot.mixin('GoogleMapMixin', new GoogleMapMixin());
riot.mixin('MarkerMixin', new MarkerMixin());
riot.mixin('SearchBoxMixin', new SearchBoxMixin());

import * as GoogleMapTag from './tags/GoogleMap.tag';
import * as MarkerTag from './tags/Marker.tag';
import * as SearchBoxTag from './tags/SearchBox.tag';
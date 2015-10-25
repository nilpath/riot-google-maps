import {
  GoogleMapMixin,
  MarkerMixin,
  SearchBoxMixin
} from './mixins';

riot.mixin('GoogleMapMixin', new GoogleMapMixin());
riot.mixin('MarkerMixin', new MarkerMixin());
riot.mixin('SearchBoxMixin', new SearchBoxMixin());

require('./tags/GoogleMap.tag');
require('./tags/Marker.tag');
require('./tags/SearchBox.tag');
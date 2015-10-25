import {
  GoogleMapMixin,
  MarkerMixin
} from './mixins';

riot.mixin('GoogleMapMixin', new GoogleMapMixin());
riot.mixin('MarkerMixin', new MarkerMixin());

require('./tags/GoogleMap.tag');
require('./tags/Marker.tag');
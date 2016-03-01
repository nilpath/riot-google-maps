import {
  InfoBoxMixin
} from './mixins';

//http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/docs/reference.html

riot.mixin('InfoBoxMixin', new InfoBoxMixin());
export { default as InfoBoxTag } from './tags/InfoBox.tag';

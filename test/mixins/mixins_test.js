import {
  GoogleMapMixin,
  MarkerMixin,
  SearchBoxMixin
} from '../../src/mixins';

describe('mixins: ', () => {
  
  it('should export GoogleMapMixin', () => {
    expect(GoogleMapMixin).to.be.a('function');
  });
  
  it('should export MarkerMixin', () => {
    expect(MarkerMixin).to.be.a('function');
  });
  
  it('should export SearchBoxMixin', () => {
    expect(SearchBoxMixin).to.be.a('function');
  });
  
});

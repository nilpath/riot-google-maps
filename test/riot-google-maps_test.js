import {
  GoogleMap,
  Marker,
  SearchBox
} from '../src/index.js';

describe('riot-google-maps: ', () => {
  
  it('should export GoogleMap', () => {
    expect(GoogleMap).to.be.ok();
  });
  
  it('should export Marker', () => {
    expect(Marker).to.be.ok();
  });
  
  it('should export SearchBox', () => {
    expect(SearchBox).to.be.ok();
  });
  
});

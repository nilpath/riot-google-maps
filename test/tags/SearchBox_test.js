describe('SearchBox Tag: ', () => {
  
  var tag, SearchBoxMixinStub;
  
  beforeEach(() => {
    var html = document.createElement('search-box');
    document.body.appendChild(html);
    
    SearchBoxMixinStub = {
      onMount: sinon.stub(),
      onUnmount: sinon.stub()
    };
    
    riot.mixin('SearchBoxMixin', SearchBoxMixinStub);
  });
  
  afterEach(() => {
    tag.unmount();
    tag = undefined;
  });
  
  it('mounts SearchBox tag', () => {
    tag = riot.mount('search-box')[0];
    expect(tag).to.be.an(Object);
  });
  
  it('should call MarkerMixin.onMount when mounting', () => {
    tag = riot.mount('search-box')[0];
    expect(SearchBoxMixinStub.onMount.called).to.be(true);
  });
  
  it('should call MarkerMixin.onUnmount when unmounting', () => {
    tag = riot.mount('search-box')[0];
    
    tag.unmount();
    
    expect(SearchBoxMixinStub.onUnmount.called).to.be(true);
  });
  
});
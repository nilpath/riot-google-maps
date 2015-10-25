describe('GoogleMap: ', () => {
  
  var tag;
  
  beforeEach(() => {
    var html = document.createElement('google-map');
    document.body.appendChild(html);
  });
  
  afterEach(() => {
    tag.unmount();
    tag = undefined;
  });
  
  it('mounts GoogleMap tag', () => {
    tag = riot.mount('google-map')[0];
    expect(tag).to.be.an(Object);
  });
  
  it('should call GoogleMapMixin.onMount when mounting', () => {
    let GoogleMapMixinStub = {onMount: sinon.stub()};
    riot.mixin('GoogleMapMixin', GoogleMapMixinStub);
    
    tag = riot.mount('google-map')[0];
    
    expect(GoogleMapMixinStub.onMount.called).to.be(true);
  });
  
  it('should call GoogleMapMixin.onUnmount when unmounting', () => {
    let GoogleMapMixinStub = {onUnmount: sinon.stub()};
    riot.mixin('GoogleMapMixin', GoogleMapMixinStub);
    
    tag = riot.mount('google-map')[0];
    tag.unmount();
    
    expect(GoogleMapMixinStub.onUnmount.called).to.be(true);
  });
  
});
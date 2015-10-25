describe('GoogleMap Tag: ', () => {
  
  var tag, GoogleMapMixinStub;
  
  beforeEach(() => {
    var html = document.createElement('google-map');
    document.body.appendChild(html);
    
    GoogleMapMixinStub = {
      onMount: sinon.stub(),
      onUnmount: sinon.stub()
    };
    
    riot.mixin('GoogleMapMixin', GoogleMapMixinStub);
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
    tag = riot.mount('google-map')[0];
    expect(GoogleMapMixinStub.onMount.called).to.be(true);
  });
  
  it('should call GoogleMapMixin.onUnmount when unmounting', () => {
    tag = riot.mount('google-map')[0];
    tag.unmount();
    expect(GoogleMapMixinStub.onUnmount.called).to.be(true);
  });
  
});
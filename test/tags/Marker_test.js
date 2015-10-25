describe('Marker: ', () => {
  
  var tag, MarkerMixinStub;
  
  beforeEach(() => {
    var html = document.createElement('marker');
    document.body.appendChild(html);
    
    MarkerMixinStub = {
      onMount: sinon.stub(),
      onUnmount: sinon.stub()
    };
    
    riot.mixin('MarkerMixin', MarkerMixinStub);
  });
  
  afterEach(() => {
    tag.unmount();
    tag = undefined;
  });
  
  it('mounts Marker tag', () => {
    tag = riot.mount('marker')[0];
    expect(tag).to.be.an(Object);
  });
  
  it('should call MarkerMixin.onMount when mounting', () => {
    tag = riot.mount('marker')[0];
    expect(MarkerMixinStub.onMount.called).to.be(true);
  });
  
  it('should call MarkerMixin.onUnmount when unmounting', () => {
    tag = riot.mount('marker')[0];
    
    tag.unmount();
    
    expect(MarkerMixinStub.onUnmount.called).to.be(true);
  });
  
});
describe('GoogleMap Tag: ', () => {
  
  var tag, mixinStub;
  
  beforeEach(() => {
    var html = document.createElement('google-map');
    document.body.appendChild(html);
    
    function GoogleMapMixinStub() {
      this.init = function() {
        this.on('mount', this.onMount);
        this.on('unmount', this.onUnmount);
        this.on('update', this.onUpdate);
      };
      this.onMount = sinon.stub();
      this.onUnmount = sinon.stub();
      this.onUpdate = sinon.stub();
    }
    
    mixinStub = new GoogleMapMixinStub();
    riot.mixin('GoogleMapMixin', mixinStub);
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
    
    expect(mixinStub.onMount.called).to.be(true);
  });
  
  it('should call GoogleMapMixin.onUnmount when unmounting', () => {
    tag = riot.mount('google-map')[0];
    tag.unmount();
    expect(mixinStub.onUnmount.called).to.be(true);
  });
  
  it('should call GoogleMapMixin.onUpdate when updating', () => {
    tag = riot.mount('google-map')[0];
    
    tag.update();
    
    expect(mixinStub.onUpdate.called).to.be(true);
  });
  
});
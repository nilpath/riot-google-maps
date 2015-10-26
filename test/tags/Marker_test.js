describe('Marker Tag: ', () => {
  
  var tag, mixinStub;
  
  beforeEach(() => {
    var html = document.createElement('marker');
    document.body.appendChild(html);
    
    function MarkerMixinStub() {
      this.init = function() {
        this.on('mount', this.onMount);
        this.on('unmount', this.onUnmount);
        this.on('update', this.onUpdate);
      };
      this.onMount = sinon.stub();
      this.onUnmount = sinon.stub();
      this.onUpdate = sinon.stub();
    }
    
    mixinStub = new MarkerMixinStub();
    riot.mixin('MarkerMixin', mixinStub);
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
    expect(mixinStub.onMount.called).to.be(true);
  });
  
  it('should call MarkerMixin.onUnmount when unmounting', () => {
    tag = riot.mount('marker')[0];
    
    tag.unmount();
    
    expect(mixinStub.onUnmount.called).to.be(true);
  });
  
  it('should call MarkerMixin.onUpdate when updating', () => {
    tag = riot.mount('marker')[0];
    
    tag.update();
    
    expect(mixinStub.onUpdate.called).to.be(true);
  });
  
});
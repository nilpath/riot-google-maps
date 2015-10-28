describe('DirectionsRenderer Tag: ', () => {
  
  var tag, mixinStub;
  
  beforeEach(() => {
    var html = document.createElement('directions-renderer');
    document.body.appendChild(html);
    
    function DirectionsRendererMixinStub() {
      this.init = function() {
        this.on('mount', this.onMount);
        this.on('unmount', this.onUnmount);
        this.on('update', this.onUpdate);
      };
      this.onMount = sinon.stub();
      this.onUnmount = sinon.stub();
      this.onUpdate = sinon.stub();
    }
    
    mixinStub = new DirectionsRendererMixinStub();
    riot.mixin('DirectionsRendererMixin', mixinStub);
  });
  
  afterEach(() => {
    tag.unmount();
    tag = undefined;
  });
  
  it('mounts DirectionsRenderer tag', () => {
    tag = riot.mount('directions-renderer')[0];
    expect(tag).to.be.an(Object);
  });
  
  it('should call DirectionsRendererMixin.onMount when mounting', () => {
    tag = riot.mount('directions-renderer')[0];
    expect(mixinStub.onMount.called).to.be(true);
  });
  
  it('should call DirectionsRendererMixin.onUnmount when unmounting', () => {
    tag = riot.mount('directions-renderer')[0];
    
    tag.unmount();
    
    expect(mixinStub.onUnmount.called).to.be(true);
  });
  
  it('should call DirectionsRendererMixin.onUpdate when updating', () => {
    tag = riot.mount('directions-renderer')[0];
    
    tag.update();
    
    expect(mixinStub.onUpdate.called).to.be(true);
  });
  
  it('should update prevOpts when updated', () => {
    tag = riot.mount('directions-renderer')[0];
    tag.opts = {key: 'value'};
    expect(tag.prevOpts).to.eql({});
    
    tag.update();
    expect(tag.prevOpts).to.eql(tag.opts);
  });
  
});
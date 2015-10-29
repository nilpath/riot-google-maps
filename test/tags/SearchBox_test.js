describe('SearchBox Tag: ', () => {
  
  var tag, mixinStub;
  
  beforeEach(() => {
    var html = document.createElement('search-box');
    document.body.appendChild(html);
    
    function SearchBoxMixinStub() {
      this.init = function() {
        this.on('mount', this.onMount);
        this.on('unmount', this.onUnmount);
        this.on('update', this.onUpdate);
      };
      this.onMount = sinon.stub();
      this.onUnmount = sinon.stub();
      this.onUpdate = sinon.stub();
    }
    
    mixinStub = new SearchBoxMixinStub();
    riot.mixin('SearchBoxMixin', mixinStub);
  });
  
  afterEach(() => {
    tag.unmount();
    tag = undefined;
  });
  
  it('mounts SearchBox tag', () => {
    tag = riot.mount('search-box')[0];
    expect(tag).to.be.an(Object);
  });
  
  it('should call SearchBoxMixin.onMount when mounting', () => {
    tag = riot.mount('search-box')[0];
    expect(mixinStub.onMount.called).to.be(true);
  });
  
  it('should call SearchBoxMixin.onUnmount when unmounting', () => {
    tag = riot.mount('search-box')[0];
    
    tag.unmount();
    
    expect(mixinStub.onUnmount.called).to.be(true);
  });
  
  it('should call SearchBoxMixin.onUpdate when updating', () => {
    tag = riot.mount('search-box')[0];
    
    tag.update();
    
    expect(mixinStub.onUpdate.called).to.be(true);
  });
  
  it('should update prevOpts when updated', () => {
    tag = riot.mount('search-box')[0];
    tag.opts = {key: 'value'};
    expect(tag.prevOpts).to.eql({});
    
    tag.update();
    expect(tag.prevOpts).to.eql(tag.opts);
  });
  
});
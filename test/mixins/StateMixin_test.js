import {default as StateMixin} from '../../src/mixins/StateMixin';

describe('StateMixin: ', () => {
  
  describe('#init', () => {
    let mixin;
    
    beforeEach(() => {
      mixin = new StateMixin();
      mixin.on = sinon.stub();
    });
    
    afterEach(() => {
      mixin.on.reset();
    });
    
    it('should set prevOpts to an empty object', () => {
      mixin.init();
      expect(mixin.prevOpts).to.eql({});
    });
    
    it('should register an event listener for the updated event', () => {
      mixin.init();
      expect(mixin.on.calledWithMatch('updated')).to.be(true);
    });
    
  });
  
});
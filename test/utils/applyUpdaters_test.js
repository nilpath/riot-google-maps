import {default as applyUpdaters} from '../../src/utils/applyUpdaters';
import {default as equals} from 'equals';
import {assign} from 'es6-object-assign';

describe('applyUpdaters: ', function () {
  
  var prevOpts;
  
  beforeEach(() => {
    prevOpts = {
      option_one: 'one',
      option_two: 2,
      option_three: ['three']
    };
  });
  
  it('should call the updater if the option has been updated', () => {
    const opts = assign({}, prevOpts, {option_one: 'three'});
    const updaters = {option_one: sinon.stub()};
    const tag = 'tag';
    
    applyUpdaters(opts, prevOpts, updaters, tag);
    
    expect(updaters.option_one.calledWith(opts.option_one, tag)).to.be(true);
  });
  
  it('should not call the update if the option have not changed', () => {
    const opts = assign({}, prevOpts);
    const updaters = {option_one: sinon.stub()};
    const tag = 'tag';
    
    applyUpdaters(opts, prevOpts, updaters, tag);
    
    expect(updaters.option_one.calledWith(opts.option_one, tag)).not.to.be(true);
    expect(equals(opts, prevOpts)).to.be(true);
  });
  
  it('should deep compare objects', () => {
    prevOpts.option_three = { a : [ 2, 'three' ], b : [ 4 ] };
    const updaters = {option_three: sinon.stub()};
    const tag = 'tag';
    const opts = assign({}, prevOpts, {
      option_three: { a : [ 2, 3 ], b : [ 4 ] }
    });
    
    applyUpdaters(opts, prevOpts, updaters, tag);
    
    expect(updaters.option_three.calledWith(opts.option_three, tag)).to.be(true);
  });
  
  it('should deep compare functional objects', () => {
    function myValue(value) {
      this.value = value;
    }
    
    prevOpts.option_three = new myValue({ a : [ 2, 'three' ], b : [ 4 ] });
    const updaters = {option_three: sinon.stub()};
    const tag = 'tag';
    const opts = assign({}, prevOpts, {
      option_three: new myValue({ a : [ 2, 3 ], b : [ 4 ] })
    });
    
    applyUpdaters(opts, prevOpts, updaters, tag);
    
    expect(updaters.option_three.calledWith(opts.option_three, tag)).to.be(true);
  });
  
});
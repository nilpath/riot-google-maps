import {default as composeOptions} from '../../src/utils/composeOptions';

describe('composeOptions: ', function () {
  
  it('should compose a new object from an old object', () => {
    const opts = {key: 'value'};
    const newObj = composeOptions(['key'], {});
    expect(newObj).not.to.equal(opts);
  });
  
  it('should selectivly choose which values to compose the options from', () => {
    const opts = {option_one: 1, option_two: '2', skipped_key: 'skipped'};
    const optionNames = ['option_one', 'option_two'];
    const expected = {option_one: 1, option_two: '2'};
    
    const optionObj = composeOptions(optionNames, opts);
    
    expect(optionObj).to.eql(expected);
  });
  
  it('should flatten out any object with optionName options', () => {
    const expected = {option_one: 1, option_two: '2', option_three: 3, option_four: 4};
    const optionNames = ['option_one', 'option_two', 'options'];
    const opts = {
      option_one: 1, 
      option_two: '2', 
      options: {option_three: 3, option_four: 4}
    };
    
    const optionObj = composeOptions(optionNames, opts);
    
    expect(optionObj).to.eql(expected);
  });
  
});
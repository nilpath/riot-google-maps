import {
  registerEvents,
  unregisterEvents,
  composeOptions
} from '../../src/utils';

describe('utils: ', () => {
  
  it('should export registerEvents', () => {
    expect(registerEvents).to.be.a('function');
  });
  
  it('should export unregisterEvents', () => {
    expect(unregisterEvents).to.be.a('function');
  });
  
  it('should export composeOptions', () => {
    expect(composeOptions).to.be.a('function');
  });
  
});

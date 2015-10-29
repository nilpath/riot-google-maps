import { default as unregisterEvents } from '../../src/utils/unregisterEvents';

describe('unregisterEvents: ', () => {
  
  afterEach(() => {
    google.maps.event.removeListener.reset();
  });
  
  it('should call removeListener for all registered events that have been supplied', () => {
    const registeredEvents = ['array', 'of', 'registered', 'events'];
    
    unregisterEvents(registeredEvents);
    
    expect(google.maps.event.removeListener.called).to.be(true);
    expect(google.maps.event.removeListener.callCount).to.be(4);
  });
  
  it('should give the registered event as a parameter to removeListener', () => {
    const registeredEvents = ['registered'];
    
    unregisterEvents(registeredEvents);
    
    expect(google.maps.event.removeListener.calledWith(registeredEvents[0])).to.be(true);
  });
  
});

import { default as registerEvents } from '../../src/utils/registerEvents';

describe('registerEvents: ', () => {
  
  afterEach(() => {
    google.maps.event.addListener.reset();
  });
  
  it('should add an eventListener for each event that have an handler', () => {
    const eventList = ['click', 'change'];
    const handlers = {onclick: () => {}, onchange: () => {}};
    const instanceObj = {};
    
    registerEvents(eventList, handlers, instanceObj);
    
    expect(google.maps.event.addListener.called).to.be(true);
    expect(google.maps.event.addListener.callCount).to.be(Object.keys(handlers).length);
  });
  
  it('should not add an eventListener if the handler is missing', () => {
    const eventList = ['click'];
    const handlers = {};
    const instanceObj = {};
    
    registerEvents(eventList, handlers, instanceObj);
    
    expect(google.maps.event.addListener.callCount).to.be(0);
  });
  
  it('should register the event on the given instance', () => {
    const eventList = ['click'];
    const handlers = {onclick: () => {}};
    const instanceObj = {};
    
    registerEvents(eventList, handlers, instanceObj);
    
    expect(google.maps.event.addListener.calledWith(
      instanceObj, 
      'click', 
      handlers.onclick
    )).to.be(true);
  });
  
  it('should return an array of registeredEvents', () => {
    const eventList = ['click'];
    const handlers = {onclick: () => {}};
    const instanceObj = {};
    
    const registeredEvents = registerEvents(eventList, handlers, instanceObj);
    
    expect(registeredEvents).to.be.a('array');
    expect(registeredEvents.length).to.be(1);
  });
  
});

import {default as DirectionsRendererMixin, directionsRendererUpdaters} from '../../src/mixins/DirectionsRendererMixin';
import {directionsRendererEvents} from '../../src/events';

describe('DirectionsRendererMixin: ', () => {
  
  describe('#onMount', () => {
    var mixin;
    
    beforeEach(() => {
      let eventHandlers = directionsRendererEvents.reduce((acc, ev) => {
        const key = `on${ev}`;
        acc[key] = function() {};
        return acc;
      }, {});
      
      const map = new window.google.maps.Map();
      
      mixin = new DirectionsRendererMixin();
      mixin.parent = {map};
      mixin.opts = {...eventHandlers};
      
      sinon.stub(mixin, 'createDirectionsRenderer').returns('rendererInstance');
    });
    
    afterEach(() => {
      google.maps.event.addListener.reset();
    });
    
    it('should call createDirectionsRenderer', () => {
      mixin.onMount();
      expect(mixin.createDirectionsRenderer.calledWith({}, mixin.parent.map)).to.be(true);  
    });
    
    it('should store the directionsRenderer instance on this', () => {
      mixin.onMount();
      expect(mixin.directionsRenderer).to.be('rendererInstance');  
    });
    
    it('should registerEvents on the SearchBox', () => {
      mixin.onMount();
      directionsRendererEvents.forEach(ev => {
        let handler = mixin.opts[`on${ev}`];
        expect(google.maps.event.addListener.calledWith(mixin.directionsRenderer, ev, handler)).to.be(true);
      });
    });
    
    it('should store registerEvents on this', () => {
      mixin.onMount();
      expect(mixin.registeredEvents).to.be.a(Array);
      expect(mixin.registeredEvents.length).to.be(directionsRendererEvents.length);
    });
    
  });
  
  describe('#onUnmount', () => {
    
    var mixin;
    
    beforeEach(() => {
      mixin = new DirectionsRendererMixin();
      mixin.registeredEvents = ['list', 'of', 'registered', 'events'];
      mixin.directionsRenderer = new window.google.maps.DirectionsRenderer();
    });
    
    afterEach(() => {
      google.maps.event.removeListener.reset();
    });
    
    it('should unregister all this.registeredEvents', () => {
      mixin.onUnmount();
      expect(google.maps.event.removeListener.callCount).to.be(4);
    });
    
    it('should set this.registeredEvents to undefined', () => {
      mixin.onUnmount();
      expect(mixin.registeredEvents).to.be(undefined);
    });
    
    it('should dereference the map from the directionsRenderer', () => {
      sinon.stub(mixin.directionsRenderer, 'setMap');
      mixin.onUnmount();
      expect(mixin.directionsRenderer.setMap.calledWith(null)).to.be(true);
      mixin.directionsRenderer.setMap.reset();
    });
    
  });
  
  describe('#onUpdate', () => {
    let mixin;
    const updaterNames = Object.keys(directionsRendererUpdaters);
    const updaterSpies = updaterNames.map(name => sinon.spy(directionsRendererUpdaters, name));
    
    beforeEach(() => {
      mixin = new DirectionsRendererMixin();
      mixin.directionsRenderer = new window.google.maps.DirectionsRenderer();
      
      mixin.prevOpts = updaterNames.reduce((acc, name) => {
        acc[name] = 10;
        return acc;
      }, {});
      
      mixin.opts = updaterNames.reduce((acc, name) => {
        acc[name] = 12;
        return acc;
      }, {});
      
    });
    
    afterEach(() => {
      updaterSpies.forEach(spy => spy.reset());
    });
    
    it('do nothing if the directionsRenderer instance is missing', () => {
      mixin.directionsRenderer = undefined;
      mixin.onUpdate();
      updaterSpies.forEach(spy => {
        expect(spy.called).not.to.be(true);
      });
    });
    
    it('should call updater if values changed', () => {
      mixin.onUpdate();
      updaterSpies.forEach(spy => {
        expect(spy.called).to.be(true);
      });
    });
  });
  
  describe('#createDirectionsRenderer', () => {
    var mixin;
    
    beforeEach(() => {
      mixin = new DirectionsRendererMixin();
    });
    
    afterEach(() => {
      google.maps.DirectionsRenderer.reset();
    });
    
    it('should return a DirectionsRenderer instance', () => {
      const options = {option: 'value'};
      const DirectionsRendererInstance = mixin.createDirectionsRenderer(options);
      
      expect(google.maps.DirectionsRenderer.calledWithNew()).to.be(true);
      expect(google.maps.DirectionsRenderer.calledWith(options)).to.be(true);
      expect(DirectionsRendererInstance).not.to.be(undefined);
    });
    
    it('should set a reference to the mapInstance on the rederer', () => {
      const options = {option: 'value'};
      const mapInstance = 'mapInstance';
      const renderer = new google.maps.DirectionsRenderer();
      const DirectionsRendererInstance = mixin.createDirectionsRenderer(options, mapInstance);
    
      expect(renderer.setMap.calledWith(mapInstance)).to.be(true);
      renderer.setMap.reset();
    });
    
  });
});

describe('directionsRendererUpdaters: ', () => {
  
  let directionsRenderer, tag;
  
  beforeEach(() => {
    directionsRenderer = new window.google.maps.DirectionsRenderer();
    tag = {directionsRenderer};
  });
  
  it('directions updater should call setDirections on directionsRendererInstance', () => {
    const spy = sinon.spy(directionsRenderer, 'setDirections');
    directionsRendererUpdaters.directions('value', tag);
    expect(directionsRenderer.setDirections.calledWith('value')).to.be(true);
  });
  
  it('options updater should call setOptions on directionsRendererInstance', () => {
    const spy = sinon.spy(directionsRenderer, 'setOptions');
    directionsRendererUpdaters.options('value', tag);
    expect(directionsRenderer.setOptions.calledWith('value')).to.be(true);
  });
  
  it('panel updater should call setPanel on directionsRendererInstance', () => {
    const spy = sinon.spy(directionsRenderer, 'setPanel');
    directionsRendererUpdaters.panel('value', tag);
    expect(directionsRenderer.setPanel.calledWith('value')).to.be(true);
  });
  
  it('routeindex updater should call setRouteIndex on directionsRendererInstance', () => {
    const spy = sinon.spy(directionsRenderer, 'setRouteIndex');
    directionsRendererUpdaters.routeindex('value', tag);
    expect(directionsRenderer.setRouteIndex.calledWith('value')).to.be(true);
  });
  
});
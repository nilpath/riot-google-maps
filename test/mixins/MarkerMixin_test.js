import {default as MarkerMixin} from '../../src/mixins/MarkerMixin';
import {markerEvents} from '../../src/events';

describe('MarkerMixin: ', () => {
  
  describe('#onMount', () => {
    var mixin;
    
    beforeEach(() => {
      let eventHandlers = markerEvents.reduce((acc, ev) => {
        const key = `on${ev}`;
        acc[key] = function() {};
        return acc;
      }, {});
      
      mixin = new MarkerMixin();
      mixin.parent = {map: 'mapInstance'};
      mixin.opts = { ...eventHandlers };
      
      sinon.stub(mixin, 'createMarker').returns('markerInstance');
    });
    
    afterEach(() => {
      google.maps.event.addListener.reset();
    });
    
    it('should call createMarker', () => {
      mixin.onMount();
      expect(mixin.createMarker.calledWith(mixin.parent.map, {})).to.be(true);  
    });
    
    it('should store the marker instance on this', () => {
      mixin.onMount();
      expect(mixin.marker).to.be('markerInstance');  
    });
    
    it('should registerEvents on the mapInstance', () => {
      mixin.onMount();
      markerEvents.forEach(ev => {
        let handler = mixin.opts[`on${ev}`];
        expect(google.maps.event.addListener.calledWith(mixin.parent.map, ev, handler)).to.be(true);
      });
    });
    
    it('should store registerEvents on this', () => {
      mixin.onMount();
      expect(mixin.registeredEvents).to.be.a(Array);
      expect(mixin.registeredEvents.length).to.be(markerEvents.length);
    });
    
  });
  
  describe('#onUnmount', () => {
    
    var mixin;
    
    beforeEach(() => {
      mixin = new MarkerMixin();
      mixin.registeredEvents = ['list', 'of', 'registered', 'events'];
      
      mixin.marker = {setMap: sinon.stub()};
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
    
    it('should dereference the map from the marker', () => {
      mixin.onUnmount();
      expect(mixin.marker.setMap.calledWith(null)).to.be(true);
    });
    
  });
  
  describe('#createMarker', () => {
    var mixin;
    
    beforeEach(() => {
      mixin = new MarkerMixin();
    });
    
    afterEach(() => {
      google.maps.Marker.reset();
    });
    
    it('should return a Marker instance', () => {
      var markerInstance = mixin.createMarker();
      
      expect(google.maps.Marker.calledWithNew()).to.be(true);
      expect(markerInstance).not.to.be(undefined);
    });
    
  });
  
});
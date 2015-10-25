import {default as GoogleMapMixin} from '../../src/mixins/GoogleMapMixin';
import {googleMapEvents} from '../../src/events';
import {composeOptions} from '../../src/utils';

describe('GoogleMapMixin: ', () => {
  
  describe('#onMount', () => {
    var mixin;
    
    beforeEach(() => {
      mixin = new GoogleMapMixin();
      mixin.root = '<google-map />';
      mixin.opts = googleMapEvents.reduce((acc, ev) => {
        const key = `on${ev}`;
        acc[key] = function() {};
        return acc;
      }, {});
      
      sinon.stub(mixin, 'createMap').returns('mapInstance');
    });
    
    afterEach(() => {
      google.maps.event.addListener.reset();
    });
    
    it('should call createMap', () => {
      mixin.onMount();
      expect(mixin.createMap.calledWith(mixin.root, {})).to.be(true);  
    });
    
    it('should store the map instance on this', () => {
      mixin.onMount();
      expect(mixin.map).to.be('mapInstance');  
    });
    
    it('should registerEvents on the mapInstance', () => {
      mixin.onMount();
      googleMapEvents.forEach(ev => {
        let handler = mixin.opts[`on${ev}`];
        expect(google.maps.event.addListener.calledWith(mixin.map, ev, handler)).to.be(true);
      });
    });
    
    it('should store registerEvents on this', () => {
      mixin.onMount();
      expect(mixin.registeredEvents).to.be.a(Array);
      expect(mixin.registeredEvents.length).to.be(googleMapEvents.length);
    });
    
  });
  
  describe('#onUnmount', () => {
    
    var mixin;
    
    beforeEach(() => {
      mixin = new GoogleMapMixin();
      mixin.registeredEvents = ['list', 'of', 'registered', 'events'];
      
      sinon.stub(mixin, 'createMap').returns('mapInstance');
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
    
  });
  
  describe('#createMap', () => {
    var mixin;
    
    beforeEach(() => {
      mixin = new GoogleMapMixin();
    });
    
    afterEach(() => {
      google.maps.Map.reset();
    });
    
    it('should return a google map instance', () => {
      var mapInstance = mixin.createMap();
      
      expect(google.maps.Map.calledWithNew()).to.be(true);
      expect(mapInstance).not.to.be(undefined);
    });
    
  });
  
});
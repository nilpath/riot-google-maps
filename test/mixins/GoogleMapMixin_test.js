import {default as GoogleMapMixin, googleMapUpdaters} from '../../src/mixins/GoogleMapMixin';
import {googleMapEvents} from '../../src/events';

describe('GoogleMapMixin: ', () => {


  describe('#onBeforeMount', () => {
    var mixin;

    beforeEach(() => {
      mixin = new GoogleMapMixin();
      mixin.mapelem = '<google-map />';
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
      mixin.onBeforeMount();
      expect(mixin.createMap.calledWith(mixin.mapelem, {})).to.be(true);
    });

    it('should store the map instance on this', () => {
      mixin.onBeforeMount();
      expect(mixin.map).to.be('mapInstance');
    });

  });

  describe('#onMount', () => {
    var mixin;

    beforeEach(() => {
      mixin = new GoogleMapMixin();
      mixin.mapelem = '<google-map />';
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

  describe('#onUpdate', () => {
    let mixin;
    const updaterNames = Object.keys(googleMapUpdaters);
    const updaterSpies = updaterNames.map(name => sinon.spy(googleMapUpdaters, name));

    beforeEach(() => {

      mixin = new GoogleMapMixin();

      mixin.map = new window.google.maps.Map();

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

    it('do noting if the map instance is missing', () => {
      mixin.map = undefined;
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

describe('GoogleMapUpdaters: ', () => {

  let map, tag;

  beforeEach(() => {
    map = new window.google.maps.Map();
    tag = {map};
  });

  it('center updater should call setCenter on mapInstance', () => {
    const spy = sinon.spy(map, 'setCenter');
    googleMapUpdaters.center('value', tag);
    expect(map.setCenter.calledWith('value')).to.be(true);
  });

  it('heading updater should call setCenter on mapInstance', () => {
    const spy = sinon.spy(map, 'setHeading');
    googleMapUpdaters.heading('value', tag);
    expect(map.setHeading.calledWith('value')).to.be(true);
  });

  it('maptypeid updater should call setCenter on mapInstance', () => {
    const spy = sinon.spy(map, 'setMapTypeId');
    googleMapUpdaters.maptypeid('value', tag);
    expect(map.setMapTypeId.calledWith('value')).to.be(true);
  });

  it('options updater should call setCenter on mapInstance', () => {
    const spy = sinon.spy(map, 'setOptions');
    googleMapUpdaters.options({}, tag);
    expect(map.setOptions.calledWith({})).to.be(true);
  });

  it('streetview updater should call setStreetView on mapInstance', () => {
    const spy = sinon.spy(map, 'setStreetView');
    googleMapUpdaters.streetview('value', tag);
    expect(map.setStreetView.calledWith('value')).to.be(true);
  });

  it('tilt updater should call setCenter on mapInstance', () => {
    const spy = sinon.spy(map, 'setTilt');
    googleMapUpdaters.tilt('value', tag);
    expect(map.setTilt.calledWith('value')).to.be(true);
  });

  it('zoom updater should call setZoom on mapInstance', () => {
    const spy = sinon.spy(map, 'setZoom');
    googleMapUpdaters.zoom('value', tag);
    expect(map.setZoom.calledWith('value')).to.be(true);
  });

});

import {default as MarkerMixin, markerUpdaters} from '../../src/mixins/MarkerMixin';
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
  
  describe('#onUpdate', () => {
    let mixin;
    const updaterNames = Object.keys(markerUpdaters);
    const updaterSpies = updaterNames.map(name => sinon.spy(markerUpdaters, name));
    
    beforeEach(() => {
      
      mixin = new MarkerMixin();
      
      mixin.marker = new window.google.maps.Marker();
      
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
    
    it('do nothing if the marker instance is missing', () => {
      mixin.marker = undefined;
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

describe('MarkerUpdaters: ', () => {
  
  let marker, tag;
  
  beforeEach(() => {
    marker = new window.google.maps.Marker();
    tag = {marker};
  });
  
  it('animation updater should call setAnimation on markerInstance', () => {
    const spy = sinon.spy(marker, 'setAnimation');
    markerUpdaters.animation('value', tag);
    expect(marker.setAnimation.calledWith('value')).to.be(true);
  });
  
  it('attribution updater should call setAttribution on markerInstance', () => {
    const spy = sinon.spy(marker, 'setAttribution');
    markerUpdaters.attribution('value', tag);
    expect(marker.setAttribution.calledWith('value')).to.be(true);
  });
  
  it('clickable updater should call setClickable on markerInstance', () => {
    const spy = sinon.spy(marker, 'setClickable');
    markerUpdaters.clickable('value', tag);
    expect(marker.setClickable.calledWith('value')).to.be(true);
  });
  
  it('cursor updater should call setCursor on markerInstance', () => {
    const spy = sinon.spy(marker, 'setCursor');
    markerUpdaters.cursor({}, tag);
    expect(marker.setCursor.calledWith({})).to.be(true);
  });
  
  it('draggable updater should call setDraggable on markerInstance', () => {
    const spy = sinon.spy(marker, 'setDraggable');
    markerUpdaters.draggable('value', tag);
    expect(marker.setDraggable.calledWith('value')).to.be(true);
  });
  
  it('icon updater should call setIcon on markerInstance', () => {
    const spy = sinon.spy(marker, 'setIcon');
    markerUpdaters.icon('value', tag);
    expect(marker.setIcon.calledWith('value')).to.be(true);
  });
  
  it('label updater should call setLabel on markerInstance', () => {
    const spy = sinon.spy(marker, 'setLabel');
    markerUpdaters.label('value', tag);
    expect(marker.setLabel.calledWith('value')).to.be(true);
  });
  
  it('opacity updater should call setOpacity on markerInstance', () => {
    const spy = sinon.spy(marker, 'setOpacity');
    markerUpdaters.opacity('value', tag);
    expect(marker.setOpacity.calledWith('value')).to.be(true);
  });
  
  it('options updater should call setOptions on markerInstance', () => {
    const spy = sinon.spy(marker, 'setOptions');
    markerUpdaters.options('value', tag);
    expect(marker.setOptions.calledWith('value')).to.be(true);
  });
  
  it('place updater should call setPlace on markerInstance', () => {
    const spy = sinon.spy(marker, 'setPlace');
    markerUpdaters.place('value', tag);
    expect(marker.setPlace.calledWith('value')).to.be(true);
  });
  
  it('position updater should call setPosition on markerInstance', () => {
    const spy = sinon.spy(marker, 'setPosition');
    markerUpdaters.position('value', tag);
    expect(marker.setPosition.calledWith('value')).to.be(true);
  });
  
  it('shape updater should call setShape on markerInstance', () => {
    const spy = sinon.spy(marker, 'setShape');
    markerUpdaters.shape('value', tag);
    expect(marker.setShape.calledWith('value')).to.be(true);
  });
  
  it('title updater should call setTitle on markerInstance', () => {
    const spy = sinon.spy(marker, 'setTitle');
    markerUpdaters.title('value', tag);
    expect(marker.setTitle.calledWith('value')).to.be(true);
  });
  
  it('zindex updater should call setZIndex on markerInstance', () => {
    const spy = sinon.spy(marker, 'setZIndex');
    markerUpdaters.zindex('value', tag);
    expect(marker.setZIndex.calledWith('value')).to.be(true);
  });
  
});
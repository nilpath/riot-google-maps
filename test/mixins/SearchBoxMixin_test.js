import {default as SearchBoxMixin, searchBoxUpdaters} from '../../src/mixins/SearchBoxMixin';
import {searchBoxEvents} from '../../src/events';

describe('SearchBoxMixin: ', () => {
  
  describe('#onMount', () => {
    var mixin;
    
    beforeEach(() => {
      let eventHandlers = searchBoxEvents.reduce((acc, ev) => {
        const key = `on${ev}`;
        acc[key] = function() {};
        return acc;
      }, {});
      
      const map = {
        controls: [[]]
      };
      
      mixin = new SearchBoxMixin();
      mixin.search = '<input name="search" />';
      mixin.parent = {map};
      mixin.opts = { 
        controlposition: 0,
        ...eventHandlers 
      };
      
      sinon.stub(mixin, 'createSearchBox').returns('searchBoxInstance');
    });
    
    afterEach(() => {
      google.maps.event.addListener.reset();
    });
    
    it('should call createSearchBox', () => {
      mixin.onMount();
      expect(mixin.createSearchBox.calledWith(mixin.search, {})).to.be(true);  
    });
    
    it('should store the searchBox instance on this', () => {
      mixin.onMount();
      expect(mixin.searchBox).to.be('searchBoxInstance');  
    });
    
    it('should registerEvents on the SearchBox', () => {
      mixin.onMount();
      searchBoxEvents.forEach(ev => {
        let handler = mixin.opts[`on${ev}`];
        expect(google.maps.event.addListener.calledWith(mixin.searchBox, ev, handler)).to.be(true);
      });
    });
    
    it('should store registerEvents on this', () => {
      mixin.onMount();
      expect(mixin.registeredEvents).to.be.a(Array);
      expect(mixin.registeredEvents.length).to.be(searchBoxEvents.length);
    });
    
  });
  
  describe('#onUnmount', () => {
    
    var mixin;
    
    beforeEach(() => {
      const map = {
        controls: [[]]
      };
      
      mixin = new SearchBoxMixin();
      mixin.registeredEvents = ['list', 'of', 'registered', 'events'];
      mixin.search = '<input name="search" />';
      mixin.parent = {map};
      mixin.opts = { 
        controlPosition: 0
      };
      
      sinon.stub(mixin, 'removeFromMap');
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
    
    it('should remove searchbox from map', () => {
      const {mapref, controlPosition} = mixin.opts;
      mixin.onUnmount();
      expect(mixin.removeFromMap.calledWith(
        mixin.search, controlPosition, mapref
      )).to.be(true);
    });
    
  });
  
  describe('#onUpdate', () => {
    let mixin;
    const updaterNames = Object.keys(searchBoxUpdaters);
    const updaterSpies = updaterNames.map(name => sinon.spy(searchBoxUpdaters, name));
    
    beforeEach(() => {
      mixin = new SearchBoxMixin();
      mixin.searchBox = new window.google.maps.places.SearchBox();
      
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
    
    it('do nothing if the searchBox instance is missing', () => {
      mixin.searchBox = undefined;
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
  
  describe('#createSearchBox', () => {
    var mixin;
    
    beforeEach(() => {
      mixin = new SearchBoxMixin();
    });
    
    afterEach(() => {
      google.maps.places.SearchBox.reset();
    });
    
    it('should return a SearchBox instance', () => {
      var SearchBoxInstance = mixin.createSearchBox();
      
      expect(google.maps.places.SearchBox.calledWithNew()).to.be(true);
      expect(SearchBoxInstance).not.to.be(undefined);
    });
    
  });
  
  describe('#addToMap', () => {
    var mixin;
    
    beforeEach(() => {
      const map = {
        controls: [[]]
      };
      
      mixin = new SearchBoxMixin();
      mixin.search = '<input name="search" />';
      mixin.opts = { 
        controlPosition: 0,
        mapref: map 
      };
    });
    
    it('should push the input to the specified controlPosition on the map', () => {
      const {mapref, controlPosition} = mixin.opts;
      mixin.addToMap(mixin.search, controlPosition, mapref);
      
      expect(mapref.controls[controlPosition][0]).to.be(mixin.search);
    });
    
  });
  
  describe('#removeFromMap', () => {
    var mixin;
    
    beforeEach(() => {
      const arr = ['<input name="search" />'];
      const ControlPos = {
        push: sinon.stub(),
        getArray: sinon.stub().returns(arr),
        removeAt: function(idx){
          arr.splice(idx, 1);
        }
      };
      
      const map = {
        controls: [ControlPos]
      };
      
      mixin = new SearchBoxMixin();
      mixin.search = '<input name="search" />';
      mixin.opts = { 
        controlPosition: 0,
        mapref: map 
      };
    });
    
    it('should remove the input to the specified controlPosition on the map', () => {
      const {mapref, controlPosition} = mixin.opts;
      
      mixin.removeFromMap(mixin.search, controlPosition, mapref);
      expect(mapref.controls[controlPosition].getArray()[0]).not.to.be(mixin.search);
    });
    
  });
});

describe('SearchBoxUpdaters: ', () => {
  
  let searchBox, tag;
  
  beforeEach(() => {
    searchBox = new window.google.maps.places.SearchBox();
    tag = {searchBox};
  });
  
  it('bounds updater should call setBounds on searchBoxInstance', () => {
    const spy = sinon.spy(searchBox, 'setBounds');
    searchBoxUpdaters.bounds('value', tag);
    expect(searchBox.setBounds.calledWith('value')).to.be(true);
  });
  
});
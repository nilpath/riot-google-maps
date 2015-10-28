let MarkerMock = {
  setMap: function() {},
  setAnimation: function() {},
  setAttribution: function() {},
  setClickable: function() {},
  setCursor: function() {},
  setDraggable: function() {},
  setIcon: function() {},
  setLabel: function() {},
  setOpacity: function() {},
  setOptions: function() {},
  setPlace: function() {},
  setPosition: function() {},
  setShape: function() {},
  setTitle: function() {},
  setVisible: function() {},
  setZIndex: function() {}
};

let MapMock = {
  setCenter: function() {},
  setHeading: function() {},
  setMapTypeId: function() {},
  setOptions: function() {},
  setStreetView: function() {},
  setTilt: function() {},
  setZoom: function() {}
};

let googleApi = {
  maps: {
    event: {
      addListener: sinon.stub(),
      removeListener: sinon.stub()
    },
    places: {
      SearchBox: sinon.stub()
    },
    Map: sinon.stub().returns(MapMock),
    Marker: sinon.stub().returns(MarkerMock)
  }
};

window.google = googleApi;
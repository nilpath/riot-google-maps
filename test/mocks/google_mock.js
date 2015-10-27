let MarkerMock = {
  setMap: function() {}
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
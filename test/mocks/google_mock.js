let MarkerMock = {
  setMap: function() {}
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
    Map: sinon.stub(),
    Marker: sinon.stub().returns(MarkerMock)
  }
};

window.google = googleApi;
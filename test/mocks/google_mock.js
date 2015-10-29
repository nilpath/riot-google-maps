let MarkerMock = {
  setMap() {},
  setAnimation() {},
  setAttribution() {},
  setClickable() {},
  setCursor() {},
  setDraggable() {},
  setIcon() {},
  setLabel() {},
  setOpacity() {},
  setOptions() {},
  setPlace() {},
  setPosition() {},
  setShape() {},
  setTitle() {},
  setVisible() {},
  setZIndex() {}
};

let MapMock = {
  setCenter() {},
  setHeading() {},
  setMapTypeId() {},
  setOptions() {},
  setStreetView() {},
  setTilt() {},
  setZoom() {},
};

let DirectionsRendererMock = {
  setMap() {},
  setDirections() {},
  setOptions() {},
  setPanel() {},
  setRouteIndex() {},
};

let SearchBoxMock = {
  setBounds() {}
};

let googleApi = {
  maps: {
    event: {
      addListener: sinon.stub(),
      removeListener: sinon.stub()
    },
    places: {
      SearchBox: sinon.stub().returns(SearchBoxMock)
    },
    Map: sinon.stub().returns(MapMock),
    Marker: sinon.stub().returns(MarkerMock),
    DirectionsRenderer: sinon.stub().returns(DirectionsRendererMock)
  }
};

window.google = googleApi;
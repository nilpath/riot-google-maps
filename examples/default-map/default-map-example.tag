<default-map-example>
  <google-map 
    zoom={this.mapData.zoom} 
    center={this.mapData.center} 
    options={this.mapOptions}
  >
    <search-box controlPosition={this.parent.searchData.controlPosition} />
    <marker each={this.parent.mapData.markers} position={this.position} />
  </google-map>
  
  <script type="es6">
    this.mapData = {
      zoom: 12,
      center: new google.maps.LatLng(59.32932349, 18.06858080),
      markers: [{
        position: new google.maps.LatLng(59.32932349, 18.06858080)
      }]
    };
    
    this.searchData = {
      controlPosition: google.maps.ControlPosition.TOP_LEFT
    }
    
    this.mapOptions = {
      zoomControl: false
    };
    
  </script>
</default-map-example>
<default-map-example>
  <google-map 
    zoom={this.mapData.zoom} 
    maptypeid={this.mapData.mapTypeId}
    center={this.mapData.center} 
    options={this.mapOptions}
    onbounds_changed={this.handleBoundsChanged} >
    
    <search-box 
      bounds={this.parent.searchData.bounds}
      controlposition={this.parent.searchData.controlPosition} />
    <marker each={this.parent.mapData.markers} position={this.position} />
  </google-map>
  
  <script type="es6">
    this.mapData = {
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
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
    
    this.handleBoundsChanged = () => {
      this.searchData.bounds = this.tags['google-map'].map.getBounds();
      this.update();
    };
    
  </script>
</default-map-example>
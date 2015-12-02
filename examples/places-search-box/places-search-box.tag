<places-search-box>
  <google-map map-id="my-map" zoom={this.data.zoom} 
    center={this.data.center}
    mapTypeId={this.data.mapTypeId}
    onbounds_changed={this.handleBoundsChanged}
  >
    <search-box controlposition={this.parent.search.controlposition} 
      bounds={this.parent.search.bounds}
      onplaces_changed={this.parent.handlePlacesChanged}
      placeholder="custom placeholder text"
    />
    <marker each={this.parent.markers} 
      position={position} 
      title={title} 
      icon={icon}  />
  </google-map>
  
  <script type="es6">
    
    this.mixin('RiotMapsMixin');
    
    this.data = {
      center: {lat: -33.8688, lng: 151.2195},
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    this.search = {
      controlposition: google.maps.ControlPosition.TOP_LEFT,
      bounds: undefined
    };
    
    this.markers = [];
    
    this.handleBoundsChanged = () => {
      this.search.bounds = this.getMap('my-map').getBounds();
      this.update();
    };
    
    this.handlePlacesChanged = () => {
      var places = this.getSearchBox('my-map').getPlaces();
      
      if (places.length == 0) {
        return;
      }
      
      // Clear out the old markers.
      this.markers = [];
      
      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach((place) => {
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        this.markers.push({
          icon: icon,
          title: place.name,
          position: place.geometry.location
        });

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      
      this.data.center = bounds.getCenter();
      this.update();
    };
    
  </script>
</places-search-box>
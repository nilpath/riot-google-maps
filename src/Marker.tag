<marker>
  <yield />
  
  <script type="es6">
    import {markerEvents} from './events';
    import {registerEvents, unregisterEvents} from './utils';
    const {mapref} = this.opts
    
    this.on('mount', () => {
      var markerOptions = this.composeMarkerOptions(this.opts);
      this.marker = this.createMarker(mapref, markerOptions);
      this.registeredEvents = registerEvents(
        markerEvents, 
        this.opts,
        mapref
      );
    });
    
    this.on('unmount', () => {
      this.marker.setMap(null);
      unregisterEvents(this.registeredEvents);
    });
    
    this.composeMarkerOptions = (opts) => {
      const { animation, attribution, clickable, cursor,
              draggable, icon, label, opacity, options,
              place, position, shape, title, visible,
              zIndex } = opts;
      
      return { animation, attribution, clickable, cursor,
              draggable, icon, label, opacity, place, 
              position, shape, title, visible, zIndex,
              ...options };
    };
    
    this.createMarker = (mapInstance, options) => {
      const marker = new google.maps.Marker(options);
      marker.setMap(mapInstance);
      return marker;
    };
    
  </script>
</marker>
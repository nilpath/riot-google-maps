<marker>
  <yield />
  
  <script type="es6">
    import {markerEvents} from '../events';
    import {composeOptions, registerEvents, unregisterEvents} from '../utils';
    
    const MARKER_OPTIONS = [
      'animation', 
      'attribution', 
      'clickable', 
      'cursor',
      'draggable', 
      'icon', 
      'label', 
      'opacity', 
      'options',
      'place', 
      'position', 
      'shape', 
      'title', 
      'visible',
      'zIndex'
    ];
    
    this.on('mount', () => {
      const {mapref} = this.opts;
      const markerOptions = composeOptions(MARKER_OPTIONS, this.opts);
      this.marker = this.createMarker(mapref, markerOptions);
      this.registeredEvents = registerEvents(markerEvents, this.opts, mapref);
    });
    
    this.on('unmount', () => {
      this.marker.setMap(null);
      unregisterEvents(this.registeredEvents);
    });
    
    this.createMarker = (mapInstance, options) => {
      const marker = new google.maps.Marker(options);
      marker.setMap(mapInstance);
      return marker;
    };
    
  </script>
</marker>
<google-map>
  <yield />
  
  <script type="es6">
    import {googleMapEvents} from './events';
    import {registerEvents, unregisterEvents} from './utils';
    
    this.on('mount', function() {
      const mapOptions = this.composeMapOptions(this.opts);
      this.map = this.createMap(this.root, mapOptions);
      this.registeredEvents = registerEvents(
        googleMapEvents, 
        this.opts,
        this.map
      );
    });
    
    this.on('unmount', function() {
      unregisterEvents(this.registeredEvents);
    });
    
    this.composeMapOptions = (opts) => {
      const { center, heading, mapTypeId, options, streetview, tilt, zoom } = this.opts;
      return { center, heading, mapTypeId, streetview, tilt, zoom, ...options };
    };
    
    this.createMap = (elem, options) => {
      return new google.maps.Map(elem, options);
    }
  </script>
</google-map>
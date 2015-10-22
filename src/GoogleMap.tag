<google-map>
  <yield />
  
  <script type="es6">
    import {googleMapEvents} from './events';
    import {composeOptions, registerEvents, unregisterEvents} from './utils';
    
    const MAP_OPTIONS = [
      'center', 
      'heading', 
      'mapTypeId',
      'options', 
      'streetview', 
      'tilt',
      'zoom'
    ];
    
    this.on('mount', function() {
      const mapOptions = composeOptions(MAP_OPTIONS, this.opts);
      this.map = this.createMap(this.root, mapOptions);
      this.registeredEvents = registerEvents(googleMapEvents, this.opts, this.map);
    });
    
    this.on('unmount', function() {
      unregisterEvents(this.registeredEvents);
    });
    
    this.createMap = (elem, options) => {
      return new google.maps.Map(elem, options);
    };
  </script>
</google-map>
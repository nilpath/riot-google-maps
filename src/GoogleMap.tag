<google-map>
  <yield />
  
  <script type="es6">
    const {zoom, center, mapTypeId} = this.opts;
    
    this.on('mount', function() {
      const options = {zoom, center, mapTypeId};
      this.map = this.createMap(this.root, options);
    });
    
    this.createMap = (elem, options) => {
      return new google.maps.Map(elem, options);
    }
  </script>
</google-map>
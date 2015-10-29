<simple-map>
  <google-map 
    zoom={this.data.zoom}
    center={this.data.center}>
  </google-map>
  
  <script type="es6">
  
    this.data = {
      zoom: 8,
      center: {lat: -34.397, lng: 150.644}
    };
    
  </script>
</simple-map>
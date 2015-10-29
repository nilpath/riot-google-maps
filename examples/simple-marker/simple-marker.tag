<simple-map>
  <google-map zoom={this.data.zoom} center={this.data.center}>
    <marker position={this.parent.marker.position} title={this.parent.marker.title} />
  </google-map>
  
  <script type="es6">
    
    let myLatLng = {lat: -25.363, lng: 131.044};
    
    this.data = {
      zoom: 4,
      center: myLatLng
    };
    
    this.marker = {
      position: myLatLng,
      title: 'Hello World!'
    };
    
  </script>
</simple-map>
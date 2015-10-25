<google-map>
  <yield />
  
  <script type="es6">
    this.mixin('GoogleMapMixin');
    this.on('mount', this.onMount);
    this.on('unmount', this.onUnmount);
  </script>
</google-map>
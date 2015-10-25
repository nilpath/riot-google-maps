<marker>
  <yield />
  
  <script type="es6">
    this.mixin('MarkerMixin');
    this.on('mount', this.onMount);
    this.on('unmount', this.onUnmount);
  </script>
</marker>
<search-box>
  <input type="text" name="search" />
  
  <script type="es6">
    this.mixin('SearchBoxMixin');
    this.on('mount', this.onMount);
    this.on('unmount', this.onUnmount);
  </script>
</search-box>
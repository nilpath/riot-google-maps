<google-map style="overflow: hidden;">
  <div name="mapelem"></div>
  <yield />

  <script>
    this.mixin('GoogleMapMixin', 'StateMixin');
  </script>
</google-map>

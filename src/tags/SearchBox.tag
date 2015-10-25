<search-box>
  <input type="text" name="search" />
  
  <script type="es6">
    import {searchBoxEvents} from '../events';
    import {composeOptions, registerEvents, unregisterEvents} from '../utils';
    
    const SEARCH_BOX_OPTIONS = ['bounds'];
    
    this.on('mount', () => {
      const {mapref, controlPosition} = this.opts;
      const searchBoxOptions = composeOptions(SEARCH_BOX_OPTIONS, this.opts);
      this.searchBox = this.createSearchBox(this.search, searchBoxOptions);
      this.registeredEvents = registerEvents(searchBoxEvents, this.opts, this.searchBox);
      this.addToMap(this.search, controlPosition, mapref);
    });
    
    this.on('unmount', () => {
      const {mapref, controlPosition} = this.opts;
      this.removeFromMap(this.search, controlPosition, mapref);
      unregisterEvents(this.registeredEvents);
    });
    
    this.createSearchBox = (searchInput, options) => {
      return new google.maps.places.SearchBox(searchInput, options);
    };
    
    this.addToMap = (searchInput, controlPosition, mapInstance) => {
      mapInstance.controls[controlPosition].push(searchInput);
    };
    
    this.removeFromMap = (searchInput, controlPosition, mapInstance) => {
      const index = mapInstance.controls[controlPosition].getArray().indexOf(searchInput);
      mapInstance.controls[controlPosition].removeAt(index);
    };
    
  </script>
</search-box>
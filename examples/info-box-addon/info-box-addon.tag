<info-box-addon>
  <google-map zoom={this.data.zoom} center={this.data.center}>
    <marker position={this.parent.marker.position} title={this.parent.marker.title} onclick={this.parent.showInfo}>
      <info-box if={this.parent.parent.marker.showInfo}
        options={this.parent.parent.infoBoxOptions}
        oncloseclick={this.parent.parent.hideInfo}>
          <div id="content">
            <div id="siteNotice">
            </div>
            <h1 id="firstHeading" class="firstHeading">Uluru</h1>
            <div id="bodyContent">
              <p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large
              sandstone rock formation in the southern part of the
              Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi)
              south west of the nearest large town, Alice Springs; 450&#160;km
              (280&#160;mi) by road. Kata Tjuta and Uluru are the two major
              features of the Uluru - Kata Tjuta National Park. Uluru is
              sacred to the Pitjantjatjara and Yankunytjatjara, the
              Aboriginal people of the area. It has many springs, waterholes,
              rock caves and ancient paintings. Uluru is listed as a World
              Heritage Site.</p>
              <p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">
              https://en.wikipedia.org/w/index.php?title=Uluru</a>
              (last visited June 22, 2009).</p>
            </div>
          </div>
      </info-box>
    </marker>
  </google-map>

  <script type="es6">

    let myLatLng = {lat: -25.363, lng: 131.044};

    this.data = {
      zoom: 4,
      center: myLatLng
    };

    this.infoBoxOptions = {
      alignBottom: true,
      pixelOffset: new google.maps.Size(-140, -50),
      boxStyle: {
        background: '#FFF',
        border: '1px solid #000',
        width: '280px',
        padding: '20px',
        boxSizing: 'border-box'
      }
    }

    this.marker = {
      position: myLatLng,
      title: 'Hello World!',
      showInfo: false
    };

    this.showInfo = () => {
      this.marker.showInfo = true;
      this.update();
    };

    this.hideInfo = () => {
      this.marker.showInfo = false;
      this.update();
    };

  </script>
</info-box-addon>


const MapInstances = [];

function googleMapParser(tag) {
  if(tag instanceof Array) {
    tag.forEach(instance => MapInstances.push(instance));
  } else {
    MapInstances.push(tag);
  }
}

export default function RiotMapsMixin() {
  
  this.init = function () {
    googleMapParser(this.tags['google-map']);
  };
  
  this.getMap = function (mapId) {
    const matchingTags = MapInstances.filter(tag => tag.getMapId() === mapId);
    return matchingTags[0].map;
  };
  
  this.getSearchBox = function (mapId) {
    const matchingTags = MapInstances.filter(tag => tag.getMapId() === mapId);
    const searchTag = matchingTags[0].tags['search-box'];
    return searchTag ? searchTag.searchBox : undefined;
  };
  
}
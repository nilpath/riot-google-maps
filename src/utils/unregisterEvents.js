let removeListener = function() {};
if(!!window.google) { removeListener = google.maps.event.removeListener };

export default function unregisterEvents(registeredEvents) {
  registeredEvents.forEach(registeredEvent => removeListener(registeredEvent));
}

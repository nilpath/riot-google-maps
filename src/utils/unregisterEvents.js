const {removeListener} = google.maps.event;

export default function(registeredEvents) {
  registeredEvents.forEach(registeredEvent => removeListener(registeredEvent));
}
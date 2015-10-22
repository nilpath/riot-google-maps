const {removeListener} = google.maps.event;

export default function unregisterEvents(registeredEvents) {
  registeredEvents.forEach(registeredEvent => removeListener(registeredEvent));
}
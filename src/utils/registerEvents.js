
let addListener = function() {};
if(!!window.google) { addListener = google.maps.event.addListener };

export default function registerEvents(eventList, handlers, instance) {
  const registeredEvents = eventList.reduce((acc, eventName) => {
    const onEventName = `on${eventName}`;

    if (handlers.hasOwnProperty(onEventName)) {
      acc.push(addListener(instance, eventName, handlers[onEventName]));
    }

    return acc;
  }, []);

  return registeredEvents;
}

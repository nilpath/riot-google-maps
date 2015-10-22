const {addListener} = google.maps.event;

export default function registerEvents(eventList, handlers, instance) {
  const registeredEvents = eventList.reduce((acc, eventName) => {
    const onEventName = `on${eventName}`;
    
    if (handlers.hasOwnProperty(onEventName)) {
      acc.push(addListener(instance, eventName, onEventName));
    }
    
    return acc;
  }, []);
  
  return registeredEvents;
}
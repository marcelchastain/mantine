import { useEffect } from 'react';

function dispatchEvent<T>(type: string, detail?: T) {
  window.dispatchEvent(new CustomEvent(type, { detail }));
}

export function createUseExternalEvents<Handlers extends Record<string, (detail: any) => void>>(
  prefix: string
) {
  function _useExternalEvents(events: Handlers) {
    const handlers = Object.keys(events).reduce((acc, eventKey) => {
      acc[`${prefix}:${eventKey}`] = (event: CustomEvent) => events[eventKey](event.detail);
      return acc;
    }, {});

    useEffect(() => {
      Object.keys(handlers).forEach((eventKey) => {
        window.addEventListener(eventKey, handlers[eventKey]);
      });

      return () => {
        Object.keys(handlers).forEach((eventKey) => {
          window.removeEventListener(eventKey, handlers[eventKey]);
        });
      };
    }, []);
  }

  function createEvent<EventKey extends keyof Handlers>(event: EventKey) {
    return (payload: Parameters<Handlers[EventKey]>[0]) =>
      dispatchEvent(`${prefix}:${event}`, payload);
  }

  return [_useExternalEvents, createEvent] as const;
}
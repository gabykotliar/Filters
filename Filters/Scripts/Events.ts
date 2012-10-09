module Filters.Events {

    interface Listener {
        callback: (event: any) => any;
        context: any;
    }

    export class Observable {

        listeners: any;

        constructor () {
            this.listeners = {}
        }

        on(eventType: string, callback: (event: any) => any, context?: any) {

            if (this.listeners[eventType] === undefined)
                this.listeners[eventType] = new Listener[]();

            this.listeners[eventType].push({ context: context, callback: callback });
        }

        trigger(eventType: string, parameters?: any) {

            if (this.listeners[eventType] instanceof Array) {
                var listeners = this.listeners[eventType];

                for (var i = 0, len = listeners.length; i < len; i++) {
                    var listener: Listener;
                    listener = listeners[i];

                    var ctx = listener.context || this;
                    listener.callback.call(ctx, { eventType: eventType, data: parameters });
                }

            }
        }
    }
}

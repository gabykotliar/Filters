var Filters;
(function (Filters) {
    (function (Events) {
        var Observable = (function () {
            function Observable(initialListeners) {
                this.listeners = {};

                if (initialListeners === undefined || initialListeners == null)
                    return;

                for (var i = 0, len = initialListeners.length; i < len; i++) {
                    this.on(initialListeners[i].type, initialListeners[i].listener.callback, initialListeners[i].listener.context);
                }
            }
            Observable.prototype.on = function (eventType, callback, context) {
                if (this.listeners[eventType] === undefined)
                    this.listeners[eventType] = new Array();

                this.listeners[eventType].push({ context: context, callback: callback });
            };

            Observable.prototype.trigger = function (eventType, parameters) {
                if (this.listeners[eventType] instanceof Array) {
                    var listeners = this.listeners[eventType];

                    for (var i = 0, len = listeners.length; i < len; i++) {
                        var listener;
                        listener = listeners[i];

                        var ctx = listener.context || this;
                        listener.callback.call(ctx, { eventType: eventType, data: parameters });
                    }
                }
            };
            return Observable;
        })();
        Events.Observable = Observable;
    })(Filters.Events || (Filters.Events = {}));
    var Events = Filters.Events;
})(Filters || (Filters = {}));
//# sourceMappingURL=Events.js.map

var Filters;
(function (Filters) {
    (function (ServiceClients) {
        var LogoService = (function () {
            function LogoService(serviceUrl, onSuccess) {
                this.serviceUrl = serviceUrl;
                this.onSuccess = onSuccess;
            }
            LogoService.prototype.getAll = function () {
                var r = $.ajax(this.serviceUrl, {
                    type: 'GET',
                    accepts: 'JSON',
                    context: this,
                    success: this.getAllSucces,
                    error: this.handleError
                });
            };
            LogoService.prototype.getAllSucces = function (data, textStatus, jqXHR) {
                this.onSuccess(data);
            };
            LogoService.prototype.handleError = function (jqXHR, textStatus, errorThrow) {
                alert(errorThrow);
            };
            return LogoService;
        })();
        ServiceClients.LogoService = LogoService;        
    })(Filters.ServiceClients || (Filters.ServiceClients = {}));
    var ServiceClients = Filters.ServiceClients;

})(Filters || (Filters = {}));


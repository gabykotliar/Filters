var LogoList = (function () {
    function LogoList() {
        this.LoadLogos();
        this.filtered = [];
    }
    LogoList.prototype.LoadLogos = function () {
        var _this = this;
        var client = new Filters.ServiceClients.LogoService('/api/logo', function (data) {
            _this.filtered.concat(data);
            var ko;
            ko.observableArray(_this.filtered);
            ko.applyBindings(_this);
        });
        client.getAll();
    };
    return LogoList;
})();

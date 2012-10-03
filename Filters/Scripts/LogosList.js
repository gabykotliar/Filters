var ko;
var LogoList = (function () {
    function LogoList() {
        this.LoadLogos();
        this.filtered = ko.observableArray([]);
    }
    LogoList.prototype.LoadLogos = function () {
        var _this = this;
        var client = new Filters.ServiceClients.LogoService('/api/logo', function (data) {
            console.log(Date.now().toString());
            data.forEach(function (value, index) {
                _this.filtered.push(value);
            });
            console.log(Date.now().toString());
        });
        client.getAll();
    };
    return LogoList;
})();

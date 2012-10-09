var Filters;
(function (Filters) {
    (function (Views) {
        var Index = (function () {
            function Index() { }
            Index.prototype.Init = function () {
                this.LoadDataAsync();
            };
            Index.prototype.LoadDataAsync = function () {
                var service = new Filters.ServiceClients.LogoService('/api/logo');
                service.getAll(this.LoadDataCompleted);
            };
            Index.prototype.LoadDataCompleted = function (data) {
                var model = new IndexModel(data);
                var pipeline = new Filters.Pipeline.FiltersPipeline(model);
                pipeline.updateResults();
                ko.applyBindings(model);
            };
            return Index;
        })();
        Views.Index = Index;        
        var IndexModel = (function () {
            function IndexModel(logos) {
                this.logos = logos;
                this.filtered = ko.observableArray([]);
            }
            return IndexModel;
        })();
        Views.IndexModel = IndexModel;        
    })(Filters.Views || (Filters.Views = {}));
    var Views = Filters.Views;

})(Filters || (Filters = {}));


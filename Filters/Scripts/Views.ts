/// <reference path="ServiceClient.ts" />
/// <reference path="Model.ts" />
/// <reference path="FiltersPipeline.ts" />
/// <reference path="typings/knockout/knockout.d.ts" />

module Filters.Views {

    export class Index {

        Init() {
            this.LoadDataAsync();
        }

        LoadDataAsync() {
            var service = new ServiceClients.LogoService('/api/logo');

            service.getAll(this.LoadDataCompleted);
        }

        LoadDataCompleted(data: Model.Logo[]) {
            var model = new IndexModel(data);

            var pipeline = new Pipeline.FiltersPipeline(model);
            pipeline.updateResults();

            ko.applyBindings(model);
        }
    }

    export class IndexModel {

        filtered: KnockoutObservableArray<Model.Logo>;

        constructor(public logos: Model.Logo[]) {

            this.filtered = ko.observableArray([]);
        }
    }
}
/// <reference path="jquery.d.ts" />
/// <reference path="Knockout.d.ts" />
/// <reference path="ServiceClient.ts" />
/// <reference path="Model.ts" />
/// <reference path="FiltersPipeline.ts" />

module Filters.Views {    

    declare var ko: Knockout;

    export class Index {
        
        Init() 
        {            
            this.LoadDataAsync();
        }

        LoadDataAsync() 
        {
            var service = new ServiceClients.LogoService('/api/logo');            

            service.getAll(this.LoadDataCompleted);
        }

        LoadDataCompleted(data: Model.Logo[]) 
        {
            var model = new IndexModel(data);

            var pipeline = new Pipeline.FiltersPipeline();
            pipeline.filters.push(new Pipeline.CategoriesFilter());

            ko.applyBindings(model);
        }
    }

    export class IndexModel {

        filtered: Model.Logo[];        

        constructor (public logos: Model.Logo[]) {
            
            this.filtered = ko.observableArray(logos);
        }
    }
}
/// <reference path="jquery.d.ts" />
/// <reference path="Events.ts" />
/// <reference path="Model.ts" />

module Filters.Pipeline {

    export class FiltersPipeline { 

        filters: Filter[];

        constructor () { 
            this.filters = new Filter[]();
        }
    }

    interface Filter {
        execute(input: Model.Logo[]): Model.Logo[];
    }

    export class CategoriesFilter
        extends Events.Observable
        implements Filter
    { 
        currentCategory: string;

        constructor() {
            super();

            this.currentCategory = 'All';

            $('#categories li').click(this.onCategoryChanged);
        }

        onCategoryChanged(event: JQueryEventObject) { 

            this.currentCategory = (<any>event.currentTarget).innerText;
         
            //this.trigger('changed');
        }

        execute(input: Model.Logo[])
        {
            if (this.currentCategory == 'All') return input;

            var filtered: Model.Logo[];
            filtered = [];
            
            for (var i = 0, len = input.length; i < len; i++)
            { 
                if (input[i].Category == this.currentCategory)
                    filtered.push(input[i]);
            }
            
            return filtered;
        }
    }
}
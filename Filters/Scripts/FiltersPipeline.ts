/// <reference path="jquery.d.ts" />
/// <reference path="Events.ts" />
/// <reference path="Model.ts" />
/// <reference path="Views.ts" />

module Filters.Pipeline {

    export class FiltersPipeline { 

        filters: Filter[];        

        constructor (public model: Views.IndexModel) { 

            var cf = new Pipeline.CategoriesFilter();
            cf.on('changed', () => {            
                this.updateResults();
            });

            this.filters = [cf];
        }

        updateResults() { 

            var temp = this.model.logos;

            for (var i = 0, len = this.filters.length; i < len; i++)
            { 
                temp = this.filters[i].execute(temp);
            }

            this.model.filtered.splice(0);
            for (var i = 0, len = temp.length; i < len; i++)
            { 
                this.model.filtered.push(temp[i]);
            }                 
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

            $('#categories li').click((e: JQueryEventObject) => { this.onCategoryChanged(e) });
        }

        onCategoryChanged(event: JQueryEventObject) { 

            this.currentCategory = (<any>event.currentTarget).innerText;
         
            this.trigger('changed');
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
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

            var sf = new Pipeline.StateFilter();
            sf.on('changed', () => {
                this.updateResults();
            });

            this.filters = [cf,sf];

            this.filters = [new Pipeline.CategoriesFilter(),
                            new Pipeline.StateFilter()];

            for (var i = 0, len = this.filters.length; i < len; i++)
            { 
                this.filters[i].on('changed', () => {
                    this.updateResults();
                });
            }
        }

        updateResults() { 

            var temp = this.model.logos;

            for (var i = 0, len = this.filters.length; i < len; i++)
            { 
                temp = this.filters[i].execute(temp);
            }

            // mover a updatedFilteredWith(temp)
            this.model.filtered.splice(0);
            for (var i = 0, len = temp.length; i < len; i++)
            { 
                this.model.filtered.push(temp[i]);
            }                 
        }
    }

    interface Filter  {
        execute(input: Model.Logo[]): Model.Logo[];
        on(eventType: string, callback: (event: any) => any, context?: any): any;
    }



    export class StateFilter
        extends Events.Observable
        implements Filter {
        currentStateBool: bool; 
        
        constructor () {
            super();
            this.currentStateBool = undefined; 

            $('.radioButton').click((e: JQueryEventObject) => { this.onStateChanged(e) }); 
        }

        onStateChanged(event: JQueryEventObject) {
            
            this.setCurrentStateBool((<any>event.currentTarget).value); 
            this.trigger('changed');
        }

        
        setCurrentStateBool(currentState: string) {
            this.currentStateBool = this.parseBool(currentState);
        }

        execute(input: Model.Logo[])
        {
            if (this.currentStateBool == undefined) return input;         

            var filtered: Model.Logo[];
            filtered = [];
            
            for (var i = 0, len = input.length; i < len; i++)
            { 
                if (input[i].Available == this.currentStateBool) 
                    filtered.push(input[i]);   
            }
            return filtered;
        }

        private parseBool(value) {
            if (typeof value === "string") {
                value = value.replace(/^\s+|\s+$/g, "").toLowerCase();
                if (value === "true" || value === "false")
                    return value === "true";
            }
            return; // returns undefined
        };


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
/// <reference path="jquery.d.ts" />
/// <reference path="Events.ts" />
/// <reference path="Model.ts" />
/// <reference path="Views.ts" />


module Filters.Pipeline {

    //interface PagingPlugin
    //{ 
    //    pagination(number, any): any;
    //}
    export class FiltersPipeline {

        filters: Filter[];
        listeners: { };

        constructor (public model: Views.IndexModel) {

            var cf = new Pipeline.CategoriesFilter();
            cf.on('changed', () => {
                this.updateResults();
            });

            var sf = new Pipeline.StateFilter();
            sf.on('changed', () => {
                this.updateResults();
            });

            var bf = new Pipeline.SearchFilter();
            bf.on('changed', () => {
                this.updateResults();
            });

            var pf = new Pipeline.PagingFilter(11);
            pf.on('changed', () => { 
                this.updateResults();
            });

            this.filters = [cf, sf, bf, pf];           

            for (var i = 0, len = this.filters.length; i < len; i++) {
                this.filters[i].on('changed', () => {
                    this.updateResults();
                });
            }
        }

        //fire(event) {
        //    if (typeof event == "string")
        //        event = { type: event };

        //    if (!event.target)
        //        event.target = this;

        //    if (!event.type)
        //        throw new Error("Event object missing 'type' property.");

        //    if (this.listeners[event.type] instanceof Array) {
        //        var list = this.listeners[event.type];

        //        for (var i = 0, len = list.length; i < len; i++) {
        //            var ctx = list[i].context || this;
        //            list[i].func.call(ctx, event);
        //        }
        //    }
        //}

        updateResults() {

            var temp = this.model.logos;
            
            for (var i = 0, len = this.filters.length; i < len; i++) {
                temp = this.filters[i].execute(temp);
            }

            //mover a updatedFilteredWith(temp)
            //this.updatedFilteredWith(temp);
            this.model.filtered.splice(0);
            for (var i = 0, len = temp.length; i < len; i++) {
                this.model.filtered.push(temp[i]);
            }
        }
    }

    interface Filter {
        execute(input: Model.Logo[]): Model.Logo[];
        on(eventType: string, callback: (event: any) => any, context?: any): any;
    }


    // Filtro de Paginacion

    export class PagingFilter
        extends Events.Observable
        implements Filter {
            pageSize: number;
            pageIndex: number;
            prevButtonText: string;
            nextButtonText: string;
            paginationContainer: any;
            startingElement: number;
            lastElement: number;    

        constructor (public totalItems:number) {
            super();
            this.startingElement = 0;
            this.lastElement = 0;
            this.pageSize = 9;
            this.pageIndex = 1;
            this.prevButtonText = '<<';
            this.nextButtonText = '>>';
            this.paginationContainer = $('#pagination');
        }

        onPageSelected(pageIndex, pager, ctx) {
             ctx.startingElement = pageIndex * ctx.pageSize;
             ctx.lastElement = Math.min((pageIndex + 1) * ctx.pageSize, ctx.totalItems);
             ctx.trigger('changed');
            
            return false;
        }
        
        getOptionsForPagingPlugin() { 

            return {
                    callback: this.onPageSelected,
                    callbackContext: this,
                    items_per_page: this.pageSize, //Number of items per page
                    num_display_entries: 2, //Number of pagination links shown
                    num_edge_entries: 1, //Number of start and end points
                    prev_text: this.prevButtonText,
                    next_text: this.nextButtonText
                  };
        }

        createPager() {

            var opt = this.getOptionsForPagingPlugin();
            //var x = <PagingPlugin> $(this.paginationContainer);
            //x.pagination(this.totalItems, opt);
            $(this.paginationContainer).pagination(this.totalItems, opt);

        }

        UpdateTotalItemsIfChanged(input)
        {
            if (this.totalItems == input.length) return;
            this.totalItems = input.length;
            this.createPager();    
        };

        execute(input: Model.Logo[])
        {
             this.UpdateTotalItemsIfChanged(input);
             return input.slice(this.startingElement, this.lastElement);
        } 
    }

    ///////////////////////////////////////////////////////

    export class SearchFilter
        extends Events.Observable
        implements Filter { 
        currentSearchText: string;

        constructor () {
            super();

            this.currentSearchText = $('.search').val();
            $('#searchButton').click((e: JQueryEventObject) => { this.onSearchTextBoxChanged(e) });
        }

       
        onSearchTextBoxChanged(event: JQueryEventObject) { 
            this.currentSearchText =  $('.search').val();
            this.trigger('changed');
            
        }

        execute(input: Model.Logo[])
        {
            if (this.currentSearchText == '') return input;

            var filtered: Model.Logo[];
            filtered = [];
            

            for (var i = 0, len = input.length; i < len; i++)
            { 
                if (input[i].Description.indexOf(this.currentSearchText) != -1  || input[i].Name.indexOf(this.currentSearchText) != -1  ) 
                    filtered.push(input[i]);   
            }
            return filtered;
        }
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
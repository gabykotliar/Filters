/// <reference path="jquery.d.ts" />
/// <reference path="Events.ts" />
/// <reference path="Model.ts" />
/// <reference path="Views.ts" />

module Filters.Pipeline {

    class Filter
        extends Events.Observable {

        constructor (onChangeCallback: () => void) { 
            super();

            this.on('changed', onChangeCallback);
        }

        execute (input: Model.Logo[]): Model.Logo[]
        {
            return input;
        }
    }

    export class FiltersPipeline {

        filters: Filter[];

        constructor (public model: Views.IndexModel) {
            
            this.filters = new Filter[];

            this.filters.push(new CategoriesFilter(() => { this.updateResults() }));
            this.filters.push(new StatusFilter(() => { this.updateResults ()}));
            this.filters.push(new SearchFilter(() => { this.updateResults ()})); 
            this.filters.push(new PagingFilter(() => { this.updateResults ()}, model.logos.length));
        }

        updateResults() {

            var temp = this.model.logos;
            
            for (var i = 0, len = this.filters.length; i < len; i++) {
                temp = this.filters[i].execute(temp);
            }

            this.updateModel(temp);
        }

        updateModel(filteted: Model.Logo[])
        { 
            this.model.filtered.splice(0);

            for (var i = 0, len = filteted.length; i < len; i++) {
                this.model.filtered.push(filteted[i]);
            }
        }
    }

    class CategoriesFilter
        extends Filter
    { 
        currentCategory: string;
        
        constructor(onChangeCallback: () => void) {
            super(onChangeCallback);

            this.currentCategory = undefined;
           
            $('#categories li').click((e: JQueryEventObject) => { this.onCategoryChanged(e) });
        }

        onCategoryChanged(event: JQueryEventObject) { 

            this.currentCategory = (<any>event.currentTarget).innerText;

            this.trigger('changed');
        }

        execute(input: Model.Logo[])
        {
            if (this.currentCategory == 'All'  || this.currentCategory === undefined) return input;

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

    class StatusFilter
        extends Filter {

        currentStatus: bool; 
        
        constructor (onChangeCallback: () => void) {
            super(onChangeCallback);

            this.currentStatus = undefined; 

            $('.radioButton').click((e: JQueryEventObject) => { this.onStatusChanged(e) }); 
        }

        onStatusChanged(event: JQueryEventObject) {
            
            var statusLabel = (<any>event.currentTarget).value;
            this.currentStatus = this.parseBool(statusLabel);
            
            this.trigger('changed');
        }

        execute(input: Model.Logo[])
        {
            if (this.currentStatus === undefined) return input;         

            var filtered: Model.Logo[];
            filtered = [];
            
            for (var i = 0, len = input.length; i < len; i++)
            { 
                if (input[i].Available == this.currentStatus) 
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
            return; 
        };
    }

    class SearchFilter
        extends Filter { 

        searchBox: JQuery;
        currentSearchText: string;

        constructor (onChangeCallback: () => void) {

            super(onChangeCallback);

            this.currentSearchText = '';

            this.searchBox = $('.search');
            $('#searchButton').click((e: JQueryEventObject) => { this.onSearchTextBoxChanged(e) });
        }
       
        onSearchTextBoxChanged(event: JQueryEventObject) { 

            this.currentSearchText =  this.searchBox.val();
            this.trigger('changed');
        }

        execute(input: Model.Logo[])
        {
            if (this.currentSearchText === '') return input;

            var filtered: Model.Logo[];
            filtered = [];

            for (var i = 0, len = input.length; i < len; i++)
            { 
                if (this.matchSearchValue(input[i]))
                    filtered.push(input[i]);   
            }

            return filtered;
        }

        matchSearchValue(logo: Model.Logo)
        { 
            return this.containsSearchValue(logo.Description)
                || this.containsSearchValue(logo.Name);
        }

        containsSearchValue(property: string)
        { 
            return property.indexOf(this.currentSearchText) != -1
        }
    }


    class PagingFilter
        extends Filter {

        pageSize: number;
        pageIndex: number;
        prevButtonText: string;
        nextButtonText: string;
        paginationContainer: any;
        startingElement: number;
        lastElement: number;    

        constructor (onChangeCallback: () => void, public totalItems:number) {
            super(onChangeCallback);

            this.startingElement = 0;
            this.lastElement = 0;
            this.pageSize = 10;
            this.pageIndex = 1;
            this.prevButtonText = '<<';
            this.nextButtonText = '>>';
            this.paginationContainer = $('#pagination');
            this.createPager();
        }

        onPageSelected(pageIndex, pager, ctx) {
             ctx.startingElement = pageIndex * ctx.pageSize;
             ctx.lastElement = Math.min((pageIndex + 1) * ctx.pageSize, ctx.totalItems);
             ctx.trigger('changed');
            
            return false;
        }
        
        createPager() {

            var opt = this.getOptionsForPagingPlugin();

            $(this.paginationContainer).pagination(this.totalItems, opt);
        }

        getOptionsForPagingPlugin() { 

            return {
                    callback: this.onPageSelected,
                    callbackContext: this,
                    items_per_page: this.pageSize, 
                    num_display_entries: 2, 
                    num_edge_entries: 1, 
                    prev_text: this.prevButtonText,
                    next_text: this.nextButtonText
                  };
        }

        execute(input: Model.Logo[])
        {
             this.updateTotalItemsIfChanged(input);
             return input.slice(this.startingElement, this.lastElement);
        } 
        
        updateTotalItemsIfChanged(input)
        {
            if (this.totalItems == input.length) return;

            this.totalItems = input.length;
            this.createPager();    
        }
    }
}
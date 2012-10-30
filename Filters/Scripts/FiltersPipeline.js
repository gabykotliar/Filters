var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
var Filters;
(function (Filters) {
    (function (Pipeline) {
        var FiltersPipeline = (function () {
            function FiltersPipeline(model) {
                this.model = model;
                var _this = this;
                var cf = new Pipeline.CategoriesFilter();
                cf.on('changed', function () {
                    _this.updateResults();
                });
                var sf = new Pipeline.StateFilter();
                sf.on('changed', function () {
                    _this.updateResults();
                });
                var bf = new Pipeline.SearchFilter();
                bf.on('changed', function () {
                    _this.updateResults();
                });
                var pf = new Pipeline.PagingFilter(11);
                pf.on('changed', function () {
                    _this.updateResults();
                });
                this.filters = [
                    cf, 
                    sf, 
                    bf, 
                    pf
                ];
                for(var i = 0, len = this.filters.length; i < len; i++) {
                    this.filters[i].on('changed', function () {
                        _this.updateResults();
                    });
                }
            }
            FiltersPipeline.prototype.updateResults = function () {
                var temp = this.model.logos;
                for(var i = 0, len = this.filters.length; i < len; i++) {
                    temp = this.filters[i].execute(temp);
                }
                this.model.filtered.splice(0);
                for(var i = 0, len = temp.length; i < len; i++) {
                    this.model.filtered.push(temp[i]);
                }
            };
            return FiltersPipeline;
        })();
        Pipeline.FiltersPipeline = FiltersPipeline;        
        var PagingFilter = (function (_super) {
            __extends(PagingFilter, _super);
            function PagingFilter(totalItems) {
                        _super.call(this);
                this.totalItems = totalItems;
                this.startingElement = 0;
                this.lastElement = 0;
                this.pageSize = 10;
                this.pageIndex = 1;
                this.prevButtonText = '<<';
                this.nextButtonText = '>>';
                this.paginationContainer = $('#pagination');
            }
            PagingFilter.prototype.onPageSelected = function (pageIndex, pager, ctx) {
                ctx.startingElement = pageIndex * ctx.pageSize;
                ctx.lastElement = Math.min((pageIndex + 1) * ctx.pageSize, ctx.totalItems);
                ctx.trigger('changed');
                return false;
            };
            PagingFilter.prototype.getOptionsForPagingPlugin = function () {
                return {
                    callback: this.onPageSelected,
                    callbackContext: this,
                    items_per_page: this.pageSize,
                    num_display_entries: 2,
                    num_edge_entries: 1,
                    prev_text: this.prevButtonText,
                    next_text: this.nextButtonText
                };
            };
            PagingFilter.prototype.createPager = function () {
                var opt = this.getOptionsForPagingPlugin();
                $(this.paginationContainer).pagination(this.totalItems, opt);
            };
            PagingFilter.prototype.UpdateTotalItemsIfChanged = function (input) {
                if(this.totalItems == input.length) {
                    return;
                }
                this.totalItems = input.length;
                this.createPager();
            };
            PagingFilter.prototype.execute = function (input) {
                this.UpdateTotalItemsIfChanged(input);
                return input.slice(this.startingElement, this.lastElement);
            };
            return PagingFilter;
        })(Filters.Events.Observable);
        Pipeline.PagingFilter = PagingFilter;        
        var SearchFilter = (function (_super) {
            __extends(SearchFilter, _super);
            function SearchFilter() {
                var _this = this;
                        _super.call(this);
                this.currentSearchText = $('.search').val();
                $('#searchButton').click(function (e) {
                    _this.onSearchTextBoxChanged(e);
                });
            }
            SearchFilter.prototype.onSearchTextBoxChanged = function (event) {
                this.currentSearchText = $('.search').val();
                this.trigger('changed');
            };
            SearchFilter.prototype.execute = function (input) {
                if(this.currentSearchText == '') {
                    return input;
                }
                var filtered;
                filtered = [];
                for(var i = 0, len = input.length; i < len; i++) {
                    if(input[i].Description.indexOf(this.currentSearchText) != -1 || input[i].Name.indexOf(this.currentSearchText) != -1) {
                        filtered.push(input[i]);
                    }
                }
                return filtered;
            };
            return SearchFilter;
        })(Filters.Events.Observable);
        Pipeline.SearchFilter = SearchFilter;        
        var StateFilter = (function (_super) {
            __extends(StateFilter, _super);
            function StateFilter() {
                var _this = this;
                        _super.call(this);
                this.currentStateBool = undefined;
                $('.radioButton').click(function (e) {
                    _this.onStateChanged(e);
                });
            }
            StateFilter.prototype.onStateChanged = function (event) {
                this.setCurrentStateBool((event.currentTarget).value);
                this.trigger('changed');
            };
            StateFilter.prototype.setCurrentStateBool = function (currentState) {
                this.currentStateBool = this.parseBool(currentState);
            };
            StateFilter.prototype.execute = function (input) {
                if(this.currentStateBool == undefined) {
                    return input;
                }
                var filtered;
                filtered = [];
                for(var i = 0, len = input.length; i < len; i++) {
                    if(input[i].Available == this.currentStateBool) {
                        filtered.push(input[i]);
                    }
                }
                return filtered;
            };
            StateFilter.prototype.parseBool = function (value) {
                if(typeof value === "string") {
                    value = value.replace(/^\s+|\s+$/g, "").toLowerCase();
                    if(value === "true" || value === "false") {
                        return value === "true";
                    }
                }
                return;
            };
            return StateFilter;
        })(Filters.Events.Observable);
        Pipeline.StateFilter = StateFilter;        
        var CategoriesFilter = (function (_super) {
            __extends(CategoriesFilter, _super);
            function CategoriesFilter() {
                var _this = this;
                        _super.call(this);
                this.currentCategory = 'All';
                $('#categories li').click(function (e) {
                    _this.onCategoryChanged(e);
                });
            }
            CategoriesFilter.prototype.onCategoryChanged = function (event) {
                this.currentCategory = (event.currentTarget).innerText;
                this.trigger('changed');
            };
            CategoriesFilter.prototype.execute = function (input) {
                if(this.currentCategory == 'All') {
                    return input;
                }
                var filtered;
                filtered = [];
                for(var i = 0, len = input.length; i < len; i++) {
                    if(input[i].Category == this.currentCategory) {
                        filtered.push(input[i]);
                    }
                }
                return filtered;
            };
            return CategoriesFilter;
        })(Filters.Events.Observable);
        Pipeline.CategoriesFilter = CategoriesFilter;        
    })(Filters.Pipeline || (Filters.Pipeline = {}));
    var Pipeline = Filters.Pipeline;

})(Filters || (Filters = {}));


/// <reference path="Events.ts" />
/// <reference path="Model.ts" />
/// <reference path="Views.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Filters;
(function (Filters) {
    (function (Pipeline) {
        var Filter = (function (_super) {
            __extends(Filter, _super);
            function Filter(onChangeCallback) {
                _super.call(this);

                this.on('changed', onChangeCallback);
            }
            Filter.prototype.execute = function (input) {
                return input;
            };
            return Filter;
        })(Filters.Events.Observable);
        Pipeline.Filter = Filter;

        var FiltersPipeline = (function () {
            function FiltersPipeline(model) {
                var _this = this;
                this.model = model;
                this.filters = new Array();

                this.filters.push(new CategoriesFilter(function () {
                    _this.updateResults();
                }));
                this.filters.push(new StatusFilter(function () {
                    _this.updateResults();
                }));
                this.filters.push(new SearchFilter(function () {
                    _this.updateResults();
                }));
                this.filters.push(new PagingFilter(function () {
                    _this.updateResults();
                }, model.logos.length));
            }
            FiltersPipeline.prototype.updateResults = function () {
                var temp = this.model.logos;

                for (var i = 0, len = this.filters.length; i < len; i++) {
                    temp = this.filters[i].execute(temp);
                }

                this.updateModel(temp);
            };

            FiltersPipeline.prototype.updateModel = function (filteted) {
                this.model.filtered.splice(0);

                for (var i = 0, len = filteted.length; i < len; i++) {
                    this.model.filtered.push(filteted[i]);
                }
            };
            return FiltersPipeline;
        })();
        Pipeline.FiltersPipeline = FiltersPipeline;

        var CategoriesFilter = (function (_super) {
            __extends(CategoriesFilter, _super);
            function CategoriesFilter(onChangeCallback) {
                var _this = this;
                _super.call(this, onChangeCallback);

                this.currentCategory = undefined;

                $('#categories li').click(function (e) {
                    _this.onCategoryChanged(e);
                });
            }
            CategoriesFilter.prototype.onCategoryChanged = function (event) {
                this.currentCategory = event.currentTarget.innerText;

                this.trigger('changed');
            };

            CategoriesFilter.prototype.execute = function (input) {
                if (this.currentCategory == 'All' || this.currentCategory === undefined)
                    return input;

                var filtered;
                filtered = [];

                for (var i = 0, len = input.length; i < len; i++) {
                    if (input[i].Category == this.currentCategory)
                        filtered.push(input[i]);
                }

                return filtered;
            };
            return CategoriesFilter;
        })(Filter);

        var StatusFilter = (function (_super) {
            __extends(StatusFilter, _super);
            function StatusFilter(onChangeCallback) {
                var _this = this;
                _super.call(this, onChangeCallback);

                this.currentStatus = undefined;

                $('.radioButton').click(function (e) {
                    _this.onStatusChanged(e);
                });
            }
            StatusFilter.prototype.onStatusChanged = function (event) {
                var statusLabel = event.currentTarget.value;
                this.currentStatus = this.parseBool(statusLabel);

                this.trigger('changed');
            };

            StatusFilter.prototype.execute = function (input) {
                if (this.currentStatus === undefined)
                    return input;

                var filtered;
                filtered = [];

                for (var i = 0, len = input.length; i < len; i++) {
                    if (input[i].Available == this.currentStatus)
                        filtered.push(input[i]);
                }

                return filtered;
            };

            StatusFilter.prototype.parseBool = function (value) {
                if (typeof value === "string") {
                    value = value.replace(/^\s+|\s+$/g, "").toLowerCase();
                    if (value === "true" || value === "false")
                        return value === "true";
                }
                return;
            };
            return StatusFilter;
        })(Filter);

        var SearchFilter = (function (_super) {
            __extends(SearchFilter, _super);
            function SearchFilter(onChangeCallback) {
                var _this = this;
                _super.call(this, onChangeCallback);

                this.currentSearchText = '';

                this.searchBox = $('.search');
                $('#searchButton').click(function (e) {
                    _this.onSearchTextBoxChanged(e);
                });
            }
            SearchFilter.prototype.onSearchTextBoxChanged = function (event) {
                this.currentSearchText = this.searchBox.val();
                this.trigger('changed');
            };

            SearchFilter.prototype.execute = function (input) {
                if (this.currentSearchText === '')
                    return input;

                var filtered;
                filtered = [];

                for (var i = 0, len = input.length; i < len; i++) {
                    if (this.matchSearchValue(input[i]))
                        filtered.push(input[i]);
                }

                return filtered;
            };

            SearchFilter.prototype.matchSearchValue = function (logo) {
                return this.containsSearchValue(logo.Description) || this.containsSearchValue(logo.Name);
            };

            SearchFilter.prototype.containsSearchValue = function (property) {
                return property.indexOf(this.currentSearchText) != -1;
            };
            return SearchFilter;
        })(Filter);

        var PagingFilter = (function (_super) {
            __extends(PagingFilter, _super);
            function PagingFilter(onChangeCallback, totalItems) {
                _super.call(this, onChangeCallback);
                this.totalItems = totalItems;

                this.startingElement = 0;
                this.lastElement = 0;
                this.pageSize = 10;
                this.pageIndex = 1;
                this.prevButtonText = '<<';
                this.nextButtonText = '>>';
                this.paginationContainer = $('#pagination');
                this.createPager();
            }
            PagingFilter.prototype.onPageSelected = function (pageIndex, pager, ctx) {
                ctx.startingElement = pageIndex * ctx.pageSize;
                ctx.lastElement = Math.min((pageIndex + 1) * ctx.pageSize, ctx.totalItems);
                ctx.trigger('changed');

                return false;
            };

            PagingFilter.prototype.createPager = function () {
                var opt = this.getOptionsForPagingPlugin();

                $(this.paginationContainer).pagination(this.totalItems, opt);
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

            PagingFilter.prototype.execute = function (input) {
                this.updateTotalItemsIfChanged(input);
                return input.slice(this.startingElement, this.lastElement);
            };

            PagingFilter.prototype.updateTotalItemsIfChanged = function (input) {
                if (this.totalItems == input.length)
                    return;

                this.totalItems = input.length;
                this.createPager();
            };
            return PagingFilter;
        })(Filter);
    })(Filters.Pipeline || (Filters.Pipeline = {}));
    var Pipeline = Filters.Pipeline;
})(Filters || (Filters = {}));
//# sourceMappingURL=FiltersPipeline.js.map

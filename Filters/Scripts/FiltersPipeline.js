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
                this.filters = [
                    cf
                ];
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


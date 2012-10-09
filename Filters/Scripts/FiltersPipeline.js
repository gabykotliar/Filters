var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
var Filters;
(function (Filters) {
    (function (Pipeline) {
        var FiltersPipeline = (function () {
            function FiltersPipeline() {
                this.filters = new Array();
            }
            return FiltersPipeline;
        })();
        Pipeline.FiltersPipeline = FiltersPipeline;        
        var CategoriesFilter = (function (_super) {
            __extends(CategoriesFilter, _super);
            function CategoriesFilter() {
                        _super.call(this);
                this.currentCategory = 'All';
                $('#categories li').click(this.onCategoryChanged);
            }
            CategoriesFilter.prototype.onCategoryChanged = function (event) {
                this.currentCategory = (event.currentTarget).innerText;
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


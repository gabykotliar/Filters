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
                this.filters = [
                    cf, 
                    sf
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


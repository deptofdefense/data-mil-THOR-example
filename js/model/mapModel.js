muarg.Models = muarg.Models || {};  

(function () {
    'use strict';
    muarg.Models.mapModel = Backbone.Model.extend({

        initialize: function() {
        },

        defaults: {
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            // response = _.flatten(_.toArray(response))
            // console.log(response)
            response = this.flatten(response,{})
            return response;
        },

        // This should not flatten arrays.
        // Fix this
        flatten: function(x, result, prefix) {
            var _this = this;
            if(_.isObject(x)) {
                _.each(x, function(v, k) {
                    _this.flatten(v, result, prefix ? prefix + '_' + k : k)
                })
            } else {
                result[prefix] = x
            }
            return result
        }

    })

})();
muarg.Views = muarg.Views || {};

(function () {
    'use strict';

    muarg.Views.infoView = Backbone.View.extend({
        events: {
            'click .next':'forward',
            'click .prev':'backwards'
        },
        initialize: function(option) {
        	var _this = this

            // this.render();
			this.listenTo(this.collection, 'change', this.loadNew);
        },

        loadNew: function() {
            console.log('Loading new')
            var _this = this;
            var target=$(this.el).find('.content')
            // This is bad form, I know
            target.css('max-height',1)
                .delay(300)
                .queue(_this.render())
                .css('max-height',600)
        },

        render: function() {
            console.log("Rendering",this.collection.date())
            var data = this.collection.where({'properties_date':this.collection.date()[1]})
            console.log(data)
            var report = ''
        	$(this.el).find('.content').html(function() {
                _.each(data,function(v) {
                    console.log(v)
                    report += "<h3>Bomb Damage Assessment</h3>"
                            + "<p>"+v.get('properties_bomb_damage_assessment_0')+"</p>"
                            + "<h3>Enemy Action</h3>"
                            + "<p>"+v.get('properties_bomb_damage_assessment_0')+"</p>"
                            + "<h3>Friendly Casualties</h3>"
                            + "<p>"+v.get('properties_friendly_casualties')+"</p>"

                })
                return report 
                
            })  
        	
        },

        forward: function() {
            this.collection.setDate(this.collection.date()[0]+1)
            // console.log(this.collection.date())
        },

        backwards: function() {
            this.collection.setDate(this.collection.date()[0]-1)
            // console.log(this.collection.date())
        },

        renderError: function() {

        },

        resize: function() {

        },



    });

})();
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
            var _this = this;
            console.log("Rendering",this.collection.date())
            var data = this.collection.where({'properties_date':this.collection.date()[1]})
            // console.log(data)
            var report = ''

            var start = false;

        	$(this.el).find('.content').html(function() {
                _.each(data,function(v) {
                    console.log(v)

                    // To Fix
                    // in mapModel.js the arrays are flattened
                    // as well as the objects for easy parsing/search.
                    // Once mapModel is fixed to NOT flaten arrays,
                    // come back here to fix and remove the "_0"

                    // Fills out intro to page
                    if(_this.collection.date()[0] == 0 && !start) {
                        report += "<h3>Welcome to our experiment with the <a href=\"http://www.data.mil\">THOR dataset</a>.</h3><h3>We hope you enjoy it, and learn a bit about US air warfare in first World War.</h3>"
                            + "<p>You can navigate through the aerial bombings during each day of the Muese-Argonne Offensive, and read  the official after action reports relayed by WWI pilots in 1918. This data was compiled  by Lieutenant Colonel Robertson and the THOR team. Learn more.</p>"
                            + "<p>We made this demo to demonstrate a potential use of the dataset, and how to play with the data involved. <a href=\"http://github.com/deptofdefense/data-mil-THOR-example\">You can fork the code here.</a></p>"
                            + "<p>You can also read the Wikipedia article about the Muese-Argonne offensive here: <a href=\"https://en.wikipedia.org/wiki/Meuse-Argonne_Offensive\">The Meuse-Argonne Offensive: Wikipedia</a></p>"
                            start = true
                    }

                    // Fills out "story" if exists in feature
                    if(v.get('properties_story')) {
                        report += "<h3>The Story</h3><p class=\"story\">"+v.get('properties_story')+"</p><hr>"
                    }

                    // Fill in Reports 
                    // (first check if any exist for spacing reasons)
                    if( v.get('properties_bomb_damage_assessment_0')
                        || v.get('properties_enemy_action_0')
                        || v.get('properties_friendly_casualties') ) {

                        report += "<h3>Reports from "+_this.collection.date()[1]+"</h3>"

                        if (v.get('properties_bomb_damage_assessment_0')) {
                            report += "<h3>Bomb Damage Assessment</h3>"
                                + "<p>"+v.get('properties_bomb_damage_assessment_0')+"</p>"
                            }

                        if (v.get('properties_enemy_action_0')) {
                            report += "<h3>Enemy Action</h3>"
                                + "<p>"+v.get('properties_enemy_action_0')+"</p>"
                            }

                        if (v.get('properties_friendly_casualties')) {
                            report += "<h3>Friendly Casualties</h3>"
                                + "<p>"+v.get('properties_friendly_casualties')+"</p>"
                            }

                        report += "<hr>"

                        }
                    // }
                })
                return report 
                
            })  
        	
        },

        forward: function() {
            this.collection.setDate(parseInt(this.collection.date()[0])+1)
            // console.log(this.collection.date())
        },

        backwards: function() {
            this.collection.setDate(parseInt(this.collection.date()[0])-1)
            // console.log(this.collection.date())
        },

        renderError: function() {

        },

        resize: function() {

        },



    });

})();
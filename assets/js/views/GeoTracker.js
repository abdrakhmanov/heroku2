/**
 * Created by i on 11.10.13.
 */
define("views/GeoTracker",
    [
        'text!templates/GeoTracker.ejs',
        "models/GeoAPI"
    ], function(GeoTrackerTpl, GeoAPI) {
        var obj = Marionette.ItemView.extend({
            template: _.template(GeoTrackerTpl),
            GeoAPIModel: null,
            tagName: "section",
            className: "container",
            initialize: function() {
                this.GeoAPIModel = new GeoAPI();
                this.GeoAPIModel.on("change", function(){
                    this.render();
                }, this);
                this.GeoAPIModel.GetPosition();
                window.tmp = this;
            },
            onBeforeRender: function() {
            },
            onRender: function() {
                //debugger;
            },
            render: function(){
                this.isClosed = false;

                this.triggerMethod("before:render", this);
                this.triggerMethod("item:before:render", this);



                var args = {
                    GeoAPIModel : this.GeoAPIModel.toJSON()
                };
                this.$el.html(this.template(args));



                this.bindUIElements();

                this.triggerMethod("render", this);
                this.triggerMethod("item:rendered", this);

                return this;
            }
        });

        return obj;
    });
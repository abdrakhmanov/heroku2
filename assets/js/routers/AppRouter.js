/**
 * Created by i on 11.10.13.
 */
define("routers/AppRouter", ["require", "marionette"], function(require){
    var Router = Backbone.Router.extend({
        routes: {
            "!/GeoTracker": "showGeoTracker"
        },

        before: function(){
            console.log("router:before");
            app.content.close();
        },

        showGeoTracker: function(){
            //App.ContactsApp.controller.showContacts();
            console.log("GeoTracker");
            require(["views/GeoTracker"], function(GTView){
                app.content.show(new GTView());
            });
        }
    });
    return Router;
});
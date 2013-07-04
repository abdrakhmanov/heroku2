require.config({
    paths: {
        jquery: "//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.2/jquery.min",
        underscore: "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min",
        json2: "//cdnjs.cloudflare.com/ajax/libs/json2/20121008/json2",
        backbone: "//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min",
        marionette: "//cdnjs.cloudflare.com/ajax/libs/backbone.marionette/1.0.3-bundled/backbone.marionette.min",
        text: "//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.5/text",
        bootstrap: "//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/2.3.2/js/bootstrap.min",
        socketio: "//cdnjs.cloudflare.com/ajax/libs/socket.io/0.9.16/socket.io.min"
    },
    shim: {
        jquery: {export:"jQuery"},
        underscore: {export:"_"},
        backbone: {deps:["jquery", "underscore", "json2"], export:"Backbone"},
        marionette: {deps:["backbone"], export:"Marionette"},
        bootstrap: {deps:["jquery"]}
    }
});

define("main", ["marionette", "bootstrap"], function() {

    var Application = new Marionette.Application();
    Application.addRegions({
        layoutRegion: "#wrapper"
    });
    Application.addInitializer(function(){
       require(["views/AppLayout"], function(AppLayout){
           Application.layoutRegion.show(new AppLayout());
       });
    })

    return Application.start();

});

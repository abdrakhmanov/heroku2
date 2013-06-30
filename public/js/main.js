requirejs.config({
    baseUrl: 'js/project',
    paths: {
        jquery: '../vendor/jquery',
        marionette: '../vendor/backbone.marionette',
        backbone: '../vendor/backbone',
        underscore: '../vendor/underscore',
        json2: '../vendor/json2',
        tpl: '../vendor/tpl'
    },
    shim: {
    	marionette: {deps:['backbone'], export:"Marionette"},
    	backbone: {deps:['jquery', 'underscore', 'json2'], export:"Backbone"},
        underscore: {export:"_"},
        jquery: {export:"$"},
        App: {deps:['marionette']}
    },
    packages: ["backbone", "marionette"],
});

require(['App'], function(App) {
    window.Application = new App();
    Application.addRegions({
        layoutRegion: "#wrapper"
    });
    Application.start();

    require(['views/AppLayout'], function(AppLayout){
        Application.layoutRegion.show(new AppLayout());
    })
});

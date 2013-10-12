require.config({
    urlArgs: (new Date()).getTime(),
	paths: {
		jquery: '//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min',
		underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min',
		json2: '//cdnjs.cloudflare.com/ajax/libs/json2/20121008/json2',
		backbone: '//backbonejs.org/backbone-min',
        'backbone-routefilter': '//cdnjs.cloudflare.com/ajax/libs/backbone.routefilter/0.2.0/backbone.routefilter.min',
        'backbone-documentmodel': 'vendor/backbone-documentmodel',
		marionette: '//cdnjs.cloudflare.com/ajax/libs/backbone.marionette/1.1.0-bundled/backbone.marionette.min',
		text: '//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.5/text',
		bootstrap: '//netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min',
		socketio: '//cdnjs.cloudflare.com/ajax/libs/socket.io/0.9.16/socket.io.min',
        moment: '//cdnjs.cloudflare.com/ajax/libs/moment.js/2.2.1/moment.min',

		easing: '//cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min',
		fancybox: '//cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.4/jquery.fancybox.pack',
		anchor: '//cdnjs.cloudflare.com/ajax/libs/jquery-scrollTo/1.4.5/jquery.scrollTo.min',
		flexslider: '//cdn.jsdelivr.net/flexslider/2.1/jquery.flexslider-min'
	},
	shim: {
		jquery: {export:'jQuery'},
		underscore: {export:'_'},
		backbone: {deps:['jquery', 'underscore', 'json2'], export:'Backbone'},
        'backbone-routefilter': {deps:['backbone']},
        'backbone-documentmodel': {deps:['backbone']},
        marionette: {deps:['jquery', 'backbone'], export:'Marionette'},
		bootstrap: {deps:['jquery']},
		easing: {deps:['jquery']},
		fancybox: {deps:['jquery']},
		anchor: {deps:['jquery']},
		flexslider: {deps:['jquery']}
	}
});

define("main", [
	"require",
	"marionette",
    "backbone-routefilter",
	"socketio",
    "moment",
    "bootstrap",
	"easing", "fancybox", "flexslider",
    "routers/AppRouter"
	], function(require) { $(document).ready(function(){

		$("body").prepend('<div id="wrapper"></div>'); //class="container-fluid"
		$(".overlay").fadeOut('slow', function() {
			this.remove();
		});

		var Application = new Marionette.Application();
		
		Application.addRegions({
			layout: "#wrapper",
            content: "#content"
		});

        Application.on("initialize:after", function(){
            if (Backbone.history){
                Backbone.history.start();
            }
        });

		Application.addInitializer(function(){
			var Router = require("routers/AppRouter");
            Application.router = new Router();
            require(["views/AppLayout"], function(AppLayout){
				Application.layout.show(new AppLayout());
			});
		});

		Application.on("start", function() {
			this.socket = io.connect('//'+ location.host);
			
			this.socket.on('connect', function(data){
				if(!_.isUndefined(data)){console.log(data);}
			});
			
			this.socket.on('userDisconnected', function(data) {
				console.log(data);
			});
		});

        window.proxy = _.extend({}, Backbone.Events);
        window.app = Application;
		app.start();

	});
});

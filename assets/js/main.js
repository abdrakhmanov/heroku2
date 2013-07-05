require.config({
	paths: {
		jquery: "//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.2/jquery.min",
		underscore: "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min",
		json2: "//cdnjs.cloudflare.com/ajax/libs/json2/20121008/json2",
		backbone: "//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min",
		marionette: "//cdnjs.cloudflare.com/ajax/libs/backbone.marionette/1.0.3-bundled/backbone.marionette.min",
		text: "//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.5/text",
		bootstrap: "//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/2.3.2/js/bootstrap.min",
		socketio: "//cdnjs.cloudflare.com/ajax/libs/socket.io/0.9.16/socket.io.min",

		easing: "//cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min",
		fancybox: "//cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.4/jquery.fancybox.pack",
		anchor: "//cdnjs.cloudflare.com/ajax/libs/jquery-scrollTo/1.4.5/jquery.scrollTo.min",
		flexslider: "//cdn.jsdelivr.net/flexslider/2.1/jquery.flexslider-min"
	},
	shim: {
		jquery: {export:"jQuery"},
		underscore: {export:"_"},
		backbone: {deps:["jquery", "underscore", "json2"], export:"Backbone"},
		marionette: {deps:["backbone"], export:"Marionette"},
		bootstrap: {deps:["jquery"]},
		easing: {deps:["jquery"]},
		fancybox: {deps:["jquery"]},
		anchor: {deps:["jquery"]},
		flexslider: {deps:["jquery"]}
	}
});

define("main", [
	"require",
	"marionette",
	"bootstrap",
	"socketio",
	"easing", "fancybox", "anchor", "flexslider"
	], function(require) { $(document).ready(function(){

		$("body").prepend('<div id="wrapper"></div>'); //class="container-fluid"
		$(".overlay").fadeOut('slow', function() {
			this.remove();
		});

		var Application = new Marionette.Application();
		
		Application.addRegions({
			layoutRegion: "#wrapper"
		});
		
		Application.addInitializer(function(){
			require(["views/AppLayout"], function(AppLayout){
				Application.layoutRegion.show(new AppLayout());
			});
		});

		Application.on("start", function() {
			this.socket = io.connect('http://'+ location.host);
			
			this.socket.on('connect', function(data){
				if(!_.isUndefined(data)){console.log(data);}
			});
			
			this.socket.on('userDisconnected', function(data) {
				console.log(data);
			});
		});
		
		window.app = Application;
		return Application.start();

	});
});

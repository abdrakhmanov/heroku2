define("views/AppLayout",
	[
		'text!templates/AppLayout.html'
	], function(AppLayoutTpl) {
    var AppLayout = Marionette.Layout.extend({
		template: _.template(AppLayoutTpl),
		//tagName: "section",
		//className: "row-fluid",
		regions: {
			menu: "#menu",
			content: "#content"
		},
		onRender: function() {
		}
    });
   
    return AppLayout; 
});
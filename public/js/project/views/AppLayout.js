define("views/AppLayout", ['tpl!templates/AppLayout.tpl'], function(AppLayoutTpl) {
    var AppLayout = Marionette.Layout.extend({
		template: AppLayoutTpl,
		className: "row-fluid",
		regions: {
			menu: "#menu",
			content: "#content"
		}
    });
   
    return AppLayout; 
});
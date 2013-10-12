/**
 * Created by i on 12.10.13.
 */
define("models/GeoAPI", [/*"backbone-documentmodel"*/], function () {
    "use strict";
    var obj = Backbone.Model.extend({
        api: null,
        intervalID: null,
        intervalDelay: 1000 * 10,
        defaults: {
            position: {},
            positionStack: []
        },
        initialize: function() {
            this.Connect();
            this.listenTo(window.proxy, "navigator.geolocation:received", function(e){

                this.set({"position":e},{silent:true});

                var ps = this.get("positionStack");
                var p = this.get("position");
                ps.push(p);
                this.set({positionStack:ps}, {silent:true});

                this.trigger("change");

            });

            this.listenTo(window.proxy, "GeoAPI:GetPosition", function(e){
                this.GetPosition();
            });
        },
        Connect: function() {
            console.log("geoApi:connect:start");
            if (navigator.geolocation)
            {
                this.api = navigator.geolocation;
            }
            else{
                console.error("Geolocation is not supported by this browser.");
            }
            this.intervalID = setInterval(function(){ window.proxy.trigger("GeoAPI:GetPosition") }, this.intervalDelay);
            console.log("geoApi:connect:end");
        },
        GetPosition: function() {
            console.log("getPosition:start");
            this.api.getCurrentPosition(this._GetPositionCallback);
            console.log("getPosition:end");
        },
        _GetPositionCallback: function(position) {
            console.log("Position: ", position);
            window.proxy.trigger("navigator.geolocation:received", position);
        }
    });
    return obj;
});
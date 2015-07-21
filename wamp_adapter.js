/******************************************************************************
 *
 *  Copyright 2012-2014 Tavendo GmbH.
 *
 *                                Apache License
 *                          Version 2.0, January 2004
 *                       http://www.apache.org/licenses/
 *
 ******************************************************************************/

// Create keyboard events to control HexGL racing game based on WAMP events


   "use strict";

   var demoRealm = "crossbardemo";

   // var wsuri = "ws://192.168.1.143:8080/ws";
   var wsuri = "wss://demo.crossbar.io/ws";
   // if (document.location.origin == "file://") {
   //    wsuri = "ws://127.0.0.1:8080/ws";

   // } else {
   //    wsuri = (document.location.protocol === "http:" ? "ws:" : "wss:") + "//" +
   //                document.location.host + "/ws";
   // }

   var session;
   var connection = null;

   function connect() {

      connection = new autobahn.Connection({
         url: wsuri,
         realm: demoRealm
         }
      );

      connection.onopen = function (sess) {

         console.log("connected");

         session = sess;

         setupConnector();

      };

      connection.onclose = function() {
         session = null;
         console.log("connection closed ", arguments);
      }

      connection.open();
   }

   connect();

   function setupConnector() {

      // subscribe to the control event
      session.subscribe("io.crossbar.demo.gamecontrol.on_event", function (args) {

         console.log("received movement", args[0]);

         var movement = args[0];



         switch (movement) {
            case "up":
               abControl("up", false);
               break;
            case "upFast":
               abControl("up", true);
               break;
            case "down":
               abControl("down", false);
               break;
            case "downFast":
               abControl("down", true);
            case "rest":
               abControls_p1();
               break;
         }

      });    

   }



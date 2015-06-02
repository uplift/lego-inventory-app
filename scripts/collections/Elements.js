var InventoryDispatcher = require( '../dispatchers/Inventory' );
var Backbone = require( 'backbone' );
var _ = require( 'lodash' );
var Element = require( '../models/Element' );

var User = Backbone.Collection.extend( {
    url: "/lego/app/inventory",
    model: Element,

    initialize: function( options ) {
        this.dispatchToken = InventoryDispatcher.register( _.bind( this.dispatchCallback,this ) );
    },

    dispatchCallback: function( payload ) {
        switch( payload.actionType ) {
            case "fetch":
                this.fetch();
        }
    }
} );

module.exports = User;

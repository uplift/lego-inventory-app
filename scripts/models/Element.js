var Backbone = require( 'backbone' );

var Element = Backbone.Model.extend( {
    url: function() {
        return "/lego/app/elements/" + this.get( "element_id" );
    }
} );

module.exports = Element;

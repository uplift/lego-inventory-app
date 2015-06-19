var Backbone = require( 'backbone' );

var App = Backbone.Model.extend( {
    defaults: {
        loggedIn: false,
        page: 'login'
    }
} );

module.exports = App;

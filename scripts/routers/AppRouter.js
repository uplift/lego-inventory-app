var LoginDispatcher = require( '../dispatchers/Login' );
var InventoryDispatcher = require( '../dispatchers/Inventory' );
var React = require( "react" );
var Backbone = require( 'backbone' );
var UserStore = require( '../stores/UserStore' );
var ElementsStore = require( '../stores/ElementsStore' );
var LoginComponent = require( '../components/Login' );
var InventoryComponent = require( '../components/Inventory' );

window.React = React;

var AppRouter = Backbone.Router.extend( {
    routes: {
        ''          : 'login',
        'login'     : 'login',
        'inventory' : 'inventory'
    },

    initialize: function() {
        this.listenTo( UserStore, "change", function( user ) {
            if ( user.get( 'loggedIn' ) ) {
                this.navigate( 'inventory', { trigger: true } );
            } else {
                this.navigate( 'login', { trigger: true } );
            }
        } );

        Backbone.history.start();
    },

    login: function() {
        if ( typeof UserStore.get( 'loggedIn' ) === 'undefined' ) {
            LoginDispatcher.dispatch( {
                actionType: "isLoggedIn"
            } );
        } else if ( !UserStore.get( 'loggedIn' ) ) {
            React.unmountComponentAtNode( document.getElementById( 'app' ) );
            React.render(
                <LoginComponent user={UserStore} />,
                document.getElementById( 'app' )
            );
        }
    },

    inventory: function() {
        React.unmountComponentAtNode( document.getElementById( 'app' ) );
        React.render(
            <InventoryComponent elements={ElementsStore} />,
            document.getElementById( 'app' )
        );
    }
} );

module.exports = AppRouter;

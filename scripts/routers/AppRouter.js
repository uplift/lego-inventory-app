var LoginDispatcher = require( '../dispatchers/Login' );
var InventoryDispatcher = require( '../dispatchers/Inventory' );
var React = require( "react" );
var Backbone = require( 'backbone' );
var UserStore = require( '../stores/UserStore' );
var ElementsStore = require( '../stores/ElementsStore' );
var AppStore = require( '../stores/AppStore' );
var AppViewComponent = require( '../components/App' );

window.React = React;

var AppRouter = Backbone.Router.extend( {
    routes: {
        ''          : 'login',
        'login'     : 'login',
        'inventory' : 'inventory',
        '*404'      : 'handle404'
    },

    initialize: function() {
        this.listenTo( UserStore, "change", function( user ) {
            if ( user.get( 'loggedIn' ) ) {
                AppStore.set( 'loggedIn', true );
                this.navigate( 'inventory', { trigger: true } );
            } else {
                AppStore.set( 'loggedIn', false );
                this.navigate( 'login', { trigger: true } );
            }
        } );

        Backbone.history.start();

        React.render(
            <AppViewComponent model={AppStore} inventory={ElementsStore} />,
            document.getElementById( 'app' )
        );
    },

    login: function() {
        if ( typeof UserStore.get( 'loggedIn' ) === 'undefined' ) {
            LoginDispatcher.dispatch( {
                actionType: "isLoggedIn"
            } );
        } else if ( !UserStore.get( 'loggedIn' ) ) {
            AppStore.set( 'page', 'login' );
        }
    },

    inventory: function() {
        if ( UserStore.get( 'loggedIn' ) ) {
            ElementsStore.fetch({
                success: function( coll ) {
                    coll.each(function( model ) {
                        model.fetch();
                    });
                }
            });
            AppStore.set( 'page', 'inventory' );
        } else {
            this.navigate( 'login', { trigger: true } );
        }
    },

    handle404: function() {
        AppStore.set( 'page', '404' );
    }
} );

module.exports = AppRouter;

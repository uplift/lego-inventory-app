var LoginDispatcher = require( '../dispatchers/Login' );
var Backbone = require( 'backbone' );
var _ = require( 'lodash' );
var $ = require( 'jquery' );

var User = Backbone.Model.extend( {
    url: "",

    initialize: function( options ) {
        this.dispatchToken = LoginDispatcher.register( _.bind( this.dispatchCallback,this ) );
    },

    dispatchCallback: function( payload ) {
        switch( payload.actionType ) {
            case "login":
                this.login( payload.username, payload.password );
                break;
            case "logout":

                break;
            case "isLoggedIn":
                this.isLoggedIn();
                break;
            default:
                this.isLoggedIn();
        }
    },

    login: function( username, password ) {
        var model = this;
        $.ajax({
            url: 'http://localhost/lego/login',
            method: 'POST',
            data: {
                username: username,
                password: password
            },
            success: function() {
                model.set( 'loggedIn', true );
            },
            error: function() {
                model.set( 'loggedIn', false );
            }
        });
    },

    isLoggedIn: function() {
        var model = this;
        $.ajax({
            url: 'http://localhost/lego/login',
            success: function() {
                model.set( 'loggedIn', true );
            },
            error: function() {
                model.set( 'loggedIn', false );
            }
        });
    }
} );

module.exports = User;

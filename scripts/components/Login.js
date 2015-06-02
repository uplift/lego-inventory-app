var React = require( "react" );
var LoginDispatcher = require( '../dispatchers/Login' );

var LoginComponent = React.createClass( {
    getInitialState: function() {
        return { username: '', password: '' };
    },

    handleUsernameChange: function( e ) {
        this.setState( { username: event.target.value } );
    },

    handlePasswordChange: function( e ) {
        this.setState( { password: event.target.value } );
    },

    onSubmit: function( e ) {
        e.preventDefault();
        LoginDispatcher.dispatch({
            actionType: 'login',
            username: this.state.username,
            password: this.state.password
        });
    },

    render: function() {
        return <div><form onSubmit={this.onSubmit}><input type='text' placeholder='Username' onChange={this.handleUsernameChange} value={this.state.username} /><input type='password' placeholder='Password' onChange={this.handlePasswordChange} value={this.state.password} /><button type='submit'>Submit</button></form></div>;
    }
} );

module.exports = LoginComponent;

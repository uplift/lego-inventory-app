var React = require( "react" );
var BackboneMixin = require( './mixins/BackboneMixin' );
var LoginComponent = require( '../components/Login' );
var InventoryComponent = require( '../components/Inventory' );

var AppViewComponent = React.createClass( {
    mixins: [ BackboneMixin ],

    render: function() {
        if ( !this.props.model.get( 'loggedIn' ) ) {
            return <LoginComponent />;
        } else if ( this.props.model.get( 'page' ) === 'inventory' ) {
            return <InventoryComponent collection={this.props.inventory} />
        } else {
            return <h1>404</h1>;
        }
    }
} );

module.exports = AppViewComponent;

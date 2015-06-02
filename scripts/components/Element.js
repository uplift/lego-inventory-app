var React = require( "react" );

var ElementComponent = React.createClass( {
    componentDidMount: function() {
        var comp = this;

        this.props.element.fetch({
            success: function( model ) {
                if ( comp.isMounted() ) {
                    comp.setState( {
                        element: model
                    } );
                }
            }
        })
    },

    render: function() {
        return <tr key={this.props.element.get( 'element_id' )}><td>{this.props.element.get( 'element_id' )}</td><td>{this.props.element.get( 'name' )}</td><td>{this.props.element.get( 'design_id' )}</td><td>{this.props.element.get( 'quantity' )}</td><td>{this.props.element.get( 'available' )}</td><td>{this.props.element.get( 'used' )}</td><td><a href={this.props.element.get( 'brickset_link' )}>Link</a></td></tr>;
    }
} );

module.exports = ElementComponent;

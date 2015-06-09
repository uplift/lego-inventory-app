var React = require( "react" );

var AddElementComponent = React.createClass( {
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

    onQuantityChange: function() {
        var model = this.props.element;
        var quantity = model.get( 'quantity' );
        var available = model.get( 'available' );
        var used = model.get( 'used' );
        var newQty = parseInt( this.refs.quantityInput.getDOMNode().value, 10 );

        if ( newQty > quantity ) {
            available = available + ( newQty - quantity );
        } else if ( newQty < quantity ) {
            if ( available !== 0 ) {
                available = available - ( quantity - newQty );
            } else if ( used !== 0 ) {
                used = used - ( quantity - newQty );
            }
        }

        model.set( {
            'quantity': newQty,
            'available': available,
            'used': used
        } );

        this.setState( {
            element: model
        } );
    },

    onAvailableChange: function() {
        var model = this.props.element;
        var quantity = model.get( 'quantity' );
        var available = model.get( 'available' );
        var used = model.get( 'used' );
        var newAvailable = parseInt( this.refs.availableInput.getDOMNode().value, 10 );

        if ( ( !newAvailable && newAvailable !== 0 ) || newAvailable > quantity ) {
            return;
        }

        if ( newAvailable > available ) {
            used = used - ( newAvailable - available );
        } else if ( newAvailable < available ) {
            used = used + ( available - newAvailable );
        }

        model.set( {
            'available': newAvailable,
            'used': used
        } );

        this.setState( {
            element: model
        } );
    },

    onUsedChange: function() {
        var model = this.props.element;
        var quantity = model.get( 'quantity' );
        var available = model.get( 'available' );
        var used = model.get( 'used' );
        var newUsed = parseInt( this.refs.usedInput.getDOMNode().value, 10 );

        if ( ( !newUsed && newUsed !== 0 ) || newUsed > quantity ) {
            return;
        }

        if ( newUsed > used ) {
            available = available - ( newUsed - used );
        } else if ( newUsed < used ) {
            available = available + ( used - newUsed );
        }

        model.set( {
            'available': available,
            'used': newUsed
        } );

        this.setState( {
            element: model
        } );
    },

    render: function() {
        return <tr key={this.props.element.get( 'element_id' )}><td><select><option value="">Please Select</option><option value="1">1</option></select></td><td><select><option value="">Please Select</option><option value="1">1</option></select></td><td>{this.props.element.get( 'design_id' )}</td><td><input type="number" ref="quantityInput" value={this.props.element.get( 'quantity' )} onChange={this.onQuantityChange} min="1" /></td><td><input type="number" ref="availableInput" value={this.props.element.get( 'available' )} min="0" max={this.props.element.get( 'quantity' )} onChange={this.onAvailableChange} /></td><td><input type="number" ref="usedInput" value={this.props.element.get( 'used' )} min="0" max={this.props.element.get( 'quantity' )} onChange={this.onUsedChange} /></td><td>{this.props.element.get( 'element_id' ) ? <a href={this.props.element.get( 'brickset_link' )} target="_blank">Link</a> : null}</td></tr>;
    }
} );

module.exports = AddElementComponent;

module.exports = {
    onQuantityChange: function() {
        var model = this.props.model;
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
    },

    onAvailableChange: function() {
        var model = this.props.model;
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
    },

    onUsedChange: function() {
        var model = this.props.model;
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
    }
};

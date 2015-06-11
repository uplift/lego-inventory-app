var React = require( "react" );
var ElementQuantityMixin = require( './mixins/ElementQuantityMixin' );
var BackboneMixin = require( './mixins/BackboneMixin' );

var AddElementComponent = React.createClass( {
    mixins: [ ElementQuantityMixin, BackboneMixin ],

    render: function() {
        return <tr key={this.props.model.get( 'element_id' )}><td><select><option value="">Please Select</option><option value="1">1</option></select></td><td><select><option value="">Please Select</option><option value="1">1</option></select></td><td>{this.props.model.get( 'design_id' )}</td><td><input type="number" ref="quantityInput" value={this.props.model.get( 'quantity' )} onChange={this.onQuantityChange} min="1" /></td><td><input type="number" ref="availableInput" value={this.props.model.get( 'available' )} min="0" max={this.props.model.get( 'quantity' )} onChange={this.onAvailableChange} /></td><td><input type="number" ref="usedInput" value={this.props.model.get( 'used' )} min="0" max={this.props.model.get( 'quantity' )} onChange={this.onUsedChange} /></td><td>{this.props.model.get( 'element_id' ) ? <a href={this.props.model.get( 'brickset_link' )} target="_blank">Link</a> : null}</td></tr>;
    }
} );

module.exports = AddElementComponent;

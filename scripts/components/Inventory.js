var React = require( 'react' );
var Backbone = require( 'backbone' );
var SearchComponent = require( './Search' );
var ElementComponent= require( './Element' );
var AddElementComponent= require( './AddElement' );
var BackboneMixin = require( './mixins/BackboneMixin' );

var InventoryComponent = React.createClass( {
    mixins: [ BackboneMixin ],

    getInitialState: function() {
        return {
            filterText: ''
        };
    },

    handleUserInput: function( filterText ) {
        this.setState({
            filterText: filterText
        });
    },

    addElement: function() {
        this.setState({
            add: new Backbone.Model({
                quantity: 0,
                available: 0,
                used: 0
            })
        });
    },

    render: function() {
        var state = this.state;

        return (
            <div>
                <h1>Your Inventory</h1>
                <SearchComponent filterText={state.filterText} onUserInput={this.handleUserInput} />
                <div><button onClick={this.addElement}>+ Add Lego Element</button></div>
                <table>
                    <thead>
                        <tr>
                            <th>Element ID</th>
                            <th>Element Name</th>
                            <th>Design ID</th>
                            <th>Quantity</th>
                            <th>Available</th>
                            <th>Used</th>
                            <th>Brickset Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.add ? <AddElementComponent model={state.add} /> : null }
                        {this.props.collection.map(function( element ) {
                            var idReg = new RegExp( "^" + state.filterText, 'gi' );
                            var textReg = new RegExp( state.filterText, 'gi' );
                            if ( state.filterText === '' ) {
                                return <ElementComponent model={element} />
                            } else if ( idReg.test( element.get( 'element_id' ) ) || textReg.test( element.get( 'name' ) ) || idReg.test( element.get( 'design_id' ) ) ) {
                                return <ElementComponent model={element} />
                            }
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
} );

module.exports = InventoryComponent;

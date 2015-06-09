var React = require( 'react' );
var Backbone = require( 'backbone' );
var SearchComponent = require( './Search' );
var ElementComponent= require( './Element' );
var AddElementComponent= require( './AddElement' );

var InventoryComponent = React.createClass( {
    getInitialState: function() {
        return {
            filterText: '',
            elements: this.props.elements
        };
    },

    componentDidMount: function() {
        var comp = this;

        this.props.elements.fetch({
            success: function( coll ) {
                if ( comp.isMounted() ) {
                    comp.setState( {
                        elements: coll
                    } );
                }
            }
        })
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
                <SearchComponent filterText={this.state.filterText} onUserInput={this.handleUserInput} />
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
                        {this.state.add ? <AddElementComponent element={this.state.add} /> : null }
                        {this.props.elements.map(function( element ) {
                            var idReg = new RegExp( "^" + state.filterText, 'gi' );
                            var textReg = new RegExp( state.filterText, 'gi' );
                            if ( state.filterText === '' ) {
                                return <ElementComponent element={element} />
                            } else if ( idReg.test( element.get( 'element_id' ) ) || textReg.test( element.get( 'name' ) ) || idReg.test( element.get( 'design_id' ) ) ) {
                                return <ElementComponent element={element} />
                            }
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
} );

module.exports = InventoryComponent;

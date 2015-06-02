var React = require( 'react' );
var SearchComponent = require( './Search' );
var ElementComponent= require( './Element' );

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

    render: function() {
        var state = this.state;

        return (
            <div>
                <h1>Your Inventory</h1>
                <SearchComponent filterText={this.state.filterText} onUserInput={this.handleUserInput} />
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
                        {this.props.elements.map(function( element ) {
                            if ( state.filterText === '' ) {
                                return <ElementComponent element={element} />
                            } else if ( state.filterText !== '' && element.get( 'element_id' ) == state.filterText ) {
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

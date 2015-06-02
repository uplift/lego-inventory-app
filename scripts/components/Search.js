var React = require( "react" );

var SearchComponent = React.createClass( {
    getInitialState: function() {
        return {};
    },

    handleChange: function() {
        this.props.onUserInput( this.refs.filterTextInput.getDOMNode().value );
    },

    render: function() {
        return (
            <form>
                <input type="text" placeholder="Search..." value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange} />
            </form>
        );
    }
} );

module.exports = SearchComponent;

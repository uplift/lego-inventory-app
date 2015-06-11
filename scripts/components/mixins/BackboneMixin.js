var updateFn = function() {
    if ( this.isMounted() ) {
        this.forceUpdate();
    }
};

module.exports = {
    componentDidMount: function ( prevProps, prevState ) {
        if ( this.props.model ) {
            this.props.model.on( ( this.changeProp || "change" ), updateFn, this );
        }

        if ( this.props.collection ) {
            this.props.collection.on( "add remove reset sort ", updateFn, this );
        }
    },

    componentWillUnMount: function() {
        if ( this.props.model ) {
            this.props.model.off( null, null, this );
        }
        if ( this.props.collection ) {
            this.props.collection.off( null, null, this );
        }
    }
};

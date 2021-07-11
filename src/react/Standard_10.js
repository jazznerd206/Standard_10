import React, { useState, useEffect } from 'react'

function Standard_10(props) {

    const { component : Component } = this.props;
    const [ options, setOptions ] = useState({});


    useEffect(() => {
        
    }, [])

    return (
        <Component
            ref={(ref) => this.typewriter = ref}
            className="standard_10"
        >
            
        </Component>
    )
}

export default Standard_10;

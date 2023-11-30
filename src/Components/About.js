import React, { useContext, useEffect } from 'react'
import noteContext from '../context/noteContext'

const About = () => {
    const a = useContext(noteContext)
    useEffect(() => {
        a.update();
        // eslint-disable-next-line
    }, [])
    return (
        <div>
            Hello I am About {a.state.name} and I am in Class {a.state.class}
        </div>
    )
}

export default About;

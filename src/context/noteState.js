import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const s1 = {
        "name": "Neeraj",
        "class": "8A"
    }

    const update = () => {
        setTimeout(() => {
            setState({
                "name": 'Neeraj Kumar',
                'class': '8A CS'
            })
        }, 1000);
    }

    const [state, setState] = useState(s1);
    return (
        <NoteContext.Provider value={{ state, update }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    const notesInitial = [
        {
            "_id": "656339307c61e6c06471e46c",
            "title": "Exercise",
            "description": "walk for atleast 5 minutes",
            "tag": "walk",
            "date": "2023-11-26T12:25:20.026Z",
            "__v": 0
        },
        {
            "_id": "656739caec5dbd15980d921b",
            "title": "Exercise",
            "description": "walk for atleast 5 minutes",
            "tag": "walk",
            "date": "2023-11-29T13:16:58.194Z",
            "__v": 0
        },
        {
            "_id": "65686a43779fa0af201fbca0",
            "title": "Run",
            "description": "Run from the world",
            "tag": "hello",
            "date": "2023-11-30T10:56:03.130Z",
            "__v": 0
        },
        {
            "_id": "65686bc17bc5eb5d6b67a2c1",
            "title": "Run",
            "description": "Run from the world",
            "tag": "hello",
            "date": "2023-11-30T11:02:25.537Z",
            "__v": 0
        },
        {
            "_id": "65686cfcea0661f2cdafe2c7",
            "title": "Run",
            "description": "Run from the world",
            "tag": "hello",
            "date": "2023-11-30T11:07:40.318Z",
            "__v": 0
        },
        {
            "_id": "65686d01ea0661f2cdafe2c9",
            "title": "Run2",
            "description": "Run from the world",
            "tag": "hello",
            "date": "2023-11-30T11:07:45.691Z",
            "__v": 0
        }
    ]

    const [notes, setNotes] = useState(notesInitial)

    return (
        <NoteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
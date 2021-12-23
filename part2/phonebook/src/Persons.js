import React from "react";

import Person from "./Person";

const Persons = (props) => {
    return (<ul>
        {props.persons
            .filter(person => person.name.includes(props.curFilter))
            .map(person => <Person key={person.id} person={person}/>)
        }
    </ul>)
}

export default Persons
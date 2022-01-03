import Person from './Person';

const Persons = (props) => {
    return (<ul>
        {props.persons
            .filter(person => person.name.includes(props.curFilter))
            .map(person => <Person key={person.id} person={person} deletePerson={props.deletePerson}/>)
        }
    </ul>);
};

export default Persons;
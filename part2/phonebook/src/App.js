import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [curFilter, setCurFilter] = useState('');

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data);
            });
    }, []);

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    };

    const handleNumberChange = (e) => {
        setNewNumber(e.target.value);
    };

    const handleFilterChange = (e) => {
        const newFilter = e.target.value;
        setCurFilter(newFilter);
    };

    const addNewPerson = (e) => {
        e.preventDefault();

        if (isAdded()) {
            alert(`${newName} is already added to phonebook`);
        } else {
            const personObject = {
                id: persons[persons.length - 1].id + 1,
                name: newName,
                number: newNumber,
            };

            axios
                .post('http://localhost:3001/persons', personObject)
                .then(response => {
                    console.log(response);
                    setPersons(persons.concat(response.data));
                    setNewName('');
                    setNewNumber('');
                });
        }
    };

    const isAdded = () => {
        return persons.map(person => person.name).includes(newName);
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter curFilter={curFilter} handleFilterChange={handleFilterChange}/>
            <h2>Add a new</h2>
            <PersonForm
                addNewPerson={addNewPerson}
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
            />
            <h2>Numbers</h2>
            <Persons persons={persons} curFilter={curFilter}/>
        </div>
    );
};

export default App;
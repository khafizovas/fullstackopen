import React, {useState, useEffect} from 'react';

import personsService from './services/persons';

import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [curFilter, setCurFilter] = useState('');

    useEffect(() => {
        personsService.getAll()
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

        const existingInd = findByName();

        if (existingInd !== -1) {
            updatePerson(existingInd);
        } else {
            const personObject = {
                id: persons[persons.length - 1].id + 1,
                name: newName,
                number: newNumber,
            };

            personsService.create(personObject).then(response => {
                setPersons(persons.concat(response.data));
                setNewName('');
                setNewNumber('');
            });
        }
    };

    const findByName = () => {
        return persons.findIndex(person => person.name === newName);
    };

    const updatePerson = (index) => {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
            const id = persons[index].id;

            personsService
                .update(id, {...persons[index], number: newNumber})
                .then(response => {
                    setPersons(persons.map(person => person.id !== id ? person : response.data));
                    setNewName('');
                    setNewNumber('');
                });
        }
    };

    const deletePerson = (toDelete) => {
        if (window.confirm(`Delete ${toDelete.name}?`))
            personsService
                .remove(toDelete.id)
                .then(response => setPersons(persons.filter(person => person.id != toDelete.id)));
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
            <Persons persons={persons} curFilter={curFilter} deletePerson={deletePerson}/>
        </div>
    );
};

export default App;
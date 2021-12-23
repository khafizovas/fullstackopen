import React, {useState} from 'react'
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-123456', id: 1},
        {name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
        {name: 'Dan Abramov', number: '12-43-234345', id: 3},
        {name: 'Mary Poppendieck', number: '39-23-6423122', id: 4}
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [curFilter, setCurFilter] = useState('')

    const handleNameChange = (e) => {
        setNewName(e.target.value)
    }

    const handleNumberChange = (e) => {
        setNewNumber(e.target.value)
    }

    const handleFilterChange = (e) => {
        const newFilter = e.target.value
        setCurFilter(newFilter)
    }

    const addNewPerson = (e) => {
        e.preventDefault()

        if (isAdded()) {
            alert(`${newName} is already added to phonebook`)
        } else {
            setPersons([...persons, {
                id: persons[persons.length - 1].id + 1,
                name: newName,
                number: newNumber
            }])
        }
    }

    const isAdded = () => {
        return persons.map(person => person.name).includes(newName)
    }

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
    )
}

export default App
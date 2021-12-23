import React, {useState} from 'react'

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
    const [filteredList, setFilteredList] = useState(persons)

    const handleNameChange = (e) => {
        setNewName(e.target.value)
    }

    const handleNumberChange = (e) => {
        setNewNumber(e.target.value)
    }

    const handleFilterChange = (e) => {
        const newFilter = e.target.value
        setCurFilter(newFilter)
        setFilteredList(persons.filter(person => person.name.includes(newFilter)))
    }

    const addNewPerson = (e) => {
        e.preventDefault()

        if (isAdded()) {
            alert(`${newName} is already added to phonebook`)
        } else {
            setPersons([...persons, {name: newName, number: newNumber}])
        }
    }

    const isAdded = () => {
        return persons.map(person => person.name).includes(newName)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <div>filter shown with: <input value={curFilter} onChange={handleFilterChange}/></div>
            <h2>Add a new</h2>
            <form onSubmit={addNewPerson}>
                <div>name: <input value={newName} onChange={handleNameChange}/></div>
                <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {filteredList.map(person => <li key={person.id}>{person.name} {person.number}</li>)}
            </ul>
        </div>
    )
}

export default App
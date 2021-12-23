import React, {useState} from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-1234567'}
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleNameChange = (e) => {
        setNewName(e.target.value)
    }

    const handleNumberChange = (e) => {
        setNewNumber(e.target.value)
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
            <form onSubmit={addNewPerson}>
                <div>name: <input value={newName} onInput={handleNameChange}/></div>
                <div>number: <input value={newNumber} onInput={handleNumberChange}/></div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {persons.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
            </ul>
        </div>
    )
}

export default App
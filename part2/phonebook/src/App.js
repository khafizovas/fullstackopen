import React, { useState, useEffect } from 'react';

import personsService from './services/persons';

import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import Notification from './Notification';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [curFilter, setCurFilter] = useState('');
	const [notification, setNotification] = useState(null);

	useEffect(() => {
		personsService.getAll().then((response) => {
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

	const notify = ({ message, className }) => {
		setNotification({ message: message, className: className });
		setTimeout(() => {
			setNotification(null);
		}, 5000);
	};

	const addNewPerson = (e) => {
		e.preventDefault();

		const existingInd = findByName();

		if (existingInd !== -1) {
			updatePerson(existingInd);
		} else {
			const personObject = {
				name: newName,
				number: newNumber,
			};

			personsService
				.create(personObject)
				.then((response) => {
					notify({
						message: `Added ${newName}`,
						className: 'success',
					});

					setPersons(persons.concat(response.data));
					setNewName('');
					setNewNumber('');
				})
				.catch((error) =>
					notify({ message: error.response.data.error, className: 'error' })
				);
		}
	};

	const findByName = () => {
		return persons.findIndex((person) => person.name === newName);
	};

	const updatePerson = (index) => {
		if (
			window.confirm(
				`${newName} is already added to phonebook, replace the old number with a new one?`
			)
		) {
			const id = persons[index].id;

			personsService
				.update(id, { ...persons[index], number: newNumber })
				.then((response) => {
					notify({
						message: `Changed the number of ${persons[index].name}`,
						className: 'success',
					});

					setPersons(
						persons.map((person) => (person.id !== id ? person : response.data))
					);
					setNewName('');
					setNewNumber('');
				});
		}
	};

	const deletePerson = (toDelete) => {
		if (window.confirm(`Delete ${toDelete.name}?`)) {
			const filtered = persons.filter((person) => person.id !== toDelete.id);

			personsService
				.remove(toDelete.id)
				.then((response) => {
					notify({
						message: `Deleted ${toDelete.name}`,
						className: 'success',
					});
				})
				.catch((error) => {
					notify({
						message: `${toDelete.name} was already removed from server`,
						className: 'error',
					});
				});

			setPersons(filtered);
		}
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification notification={notification} />
			<Filter curFilter={curFilter} handleFilterChange={handleFilterChange} />
			<h2>Add a new</h2>
			<PersonForm
				addNewPerson={addNewPerson}
				newName={newName}
				handleNameChange={handleNameChange}
				newNumber={newNumber}
				handleNumberChange={handleNumberChange}
			/>
			<h2>Numbers</h2>
			<Persons
				persons={persons}
				curFilter={curFilter}
				deletePerson={deletePerson}
			/>
		</div>
	);
};

export default App;

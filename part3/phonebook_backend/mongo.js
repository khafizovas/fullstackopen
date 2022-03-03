require('dotenv').config();
const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
});
const Person = mongoose.model('Person', personSchema);

const getPassword = () => {
	if (process.argv.length < 3) {
		console.log(
			'Please provide the password as an argument: node mongo.js <password>'
		);
		process.exit(1);
	}

	return process.argv[2];
};

const openConnection = (password) => {
	const url = `mongodb+srv://Svetlana:${password}@phonebook.jbmdl.mongodb.net/phonebook?retryWrites=true&w=majority`;
	mongoose.connect(url);
};

const getAllPersons = async () => {
	console.log('Phonebook:');

	const persons = await Person.find({});

	persons.forEach((person) => {
		console.log(person.name, person.number);
	});

	mongoose.connection.close();
	process.exit(0);
};

const canAddNewPerson = () => {
	if (process.argv.length < 4) {
		console.log('Please provide the name as an argument');
		process.exit(1);
	}

	if (process.argv.length < 5) {
		console.log('Please provide the number as an argument');
		process.exit(1);
	}

	return true;
};

const addNewPerson = () => {
	const name = process.argv[3];
	const number = process.argv[4];

	const person = new Person({ name, number });

	person.save().then((result) => {
		console.log(`Added ${result.name} number ${result.number} to phonebook`);
		mongoose.connection.close();
	});
};

(async () => {
	const password = getPassword();
	openConnection(password);

	if (process.argv.length === 3) {
		await getAllPersons();
	}

	if (canAddNewPerson) {
		addNewPerson();
	}
})();

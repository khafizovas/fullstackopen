require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

const Person = require('./models/person');
const ObjectId = require('mongodb').ObjectID;

morgan.token('body', (req, res) => JSON.stringify(req.body));

app.use(express.json());
app.use(
	morgan(':method :url :status :res[content-length] - :response-time ms :body')
);
app.use(cors());
app.use(express.static('build'));

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

app.get('/', (request, response) => {
	response.send('<h1>Hello World!</h1>');
});

app.get('/api/persons', (request, response) => {
	Person.find({}).then((persons) => {
		response.json(persons);
	});
});

app.get('/info', (request, response) => {
	const today = new Date();
	const date =
		today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();
	const time =
		today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

	Person.find({}).then((persons) => {
		response.send(
			`<div><p>Phonebook has info for ${persons.length} people.</p><p>${date} ${time}</p></div>`
		);
	});
});

app.get('/api/persons/:id', (request, response) => {
	const id = request.params.id;

	Person.find({ _id: ObjectId(id) })
		.then((person) => response.json(person))
		.catch((error) => response.status(404).end());
});

app.delete('/api/persons/:id', (request, response) => {
	const id = request.params.id;
	Person.findByIdAndRemove(id)
		.then((result) => {
			if (result == null) {
				response.status(400).end();
			} else {
				response.status(204).end();
			}
		})
		.catch((error) => response.status(400).end());
});

app.post('/api/persons', (request, response) => {
	const body = request.body;
	const isCorrect = validateBody(body, response);

	if (isCorrect) {
		const person = new Person({
			name: body.name,
			number: body.number,
			date: new Date(),
		});

		person.save().then((savedPerson) => {
			response.json(savedPerson);
		});
	}
});

const validateBody = (body, response) => {
	if (!body.name) {
		return response.status(400).json({
			error: 'Name missing',
		});
	}

	if (!body.number) {
		return response.status(400).json({
			error: 'Number missing',
		});
	}

	return true;
};

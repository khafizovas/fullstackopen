require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

const Person = require('./models/person');

morgan.token('body', (request) => {
	return request.method === 'POST' ? JSON.stringify(request.body) : '';
});

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
	Person.find({})
		.then((persons) => {
			response.json(persons);
		})
		.catch((error) => next(error));
});

app.get('/info', (request, response) => {
	const curDateAndTime = new Date();
	const date =
		curDateAndTime.getDate() +
		'.' +
		(curDateAndTime.getMonth() + 1) +
		'.' +
		curDateAndTime.getFullYear();
	const time =
		curDateAndTime.getHours() +
		':' +
		curDateAndTime.getMinutes() +
		':' +
		curDateAndTime.getSeconds();

	Person.find({}).then((persons) => {
		response
			.send(
				`<div><p>Phonebook has info for ${persons.length} people.</p><p>${date} ${time}</p></div>`
			)
			.catch((error) => next(error));
	});
});

app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id)
		.then((person) => {
			if (person) {
				response.json(person);
			} else {
				response.status(404).end();
			}
		})
		.catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response) => {
	Person.findByIdAndRemove(request.params.id)
		.then((result) => {
			if (result == null) {
				response.status(400).end();
			} else {
				response.status(204).end();
			}
		})
		.catch((error) => next(error));
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

		person
			.save()
			.then((savedPerson) => {
				response.json(savedPerson);
			})
			.catch((error) => next(error));
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

const errorHandler = (error, request, response, next) => {
	console.error(error.message);

	switch (error.name) {
		case 'CastError':
			return response.status(400).send({ error: 'malformatted id' });
		case 'MissingSchemaError':
			return response
				.status(500)
				.send({ error: "model 'Person' does not exist" });
		case 'MongooseServerSelectionError':
			return response.status(500).send({ error: 'connection error' });
		case 'ParallelSaveError':
			return response.status(400).send({ error: 'attempt to parallel save' });
		case 'ValidationError':
			return response.status(400).send({ error: error.message });
		default:
			next(error);
	}
};

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'Unknown endpoint' });
};

app.use(unknownEndpoint);
app.use(errorHandler);

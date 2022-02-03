const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

morgan.token('body', (req, res) => JSON.stringify(req.body));

app.use(express.json());
app.use(
	morgan(':method :url :status :res[content-length] - :response-time ms :body')
);
app.use(cors());
app.use(express.static('build'));

let persons = [
	{
		id: 1,
		name: 'Arto Hellas',
		number: '040-123456',
	},
	{
		id: 2,
		name: 'Ada Lovelace',
		number: '39-44-5323523',
	},
	{
		id: 3,
		name: 'Dan Abramov',
		number: '12-43-234345',
	},
	{
		id: 4,
		name: 'Mary Poppendieck',
		number: '39-23-6423122',
	},
];

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

app.get('/', (request, response) => {
	response.send('<h1>Hello World!</h1>');
});

app.get('/api/persons', (request, response) => {
	response.json(persons);
});

app.get('/info', (request, response) => {
	const today = new Date();
	const date =
		today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();
	const time =
		today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

	response.send(
		`<div><p>Phonebook has info for ${persons.length} people.</p><p>${date} ${time}</p></div>`
	);
});

app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id);
	const person = persons.find((person) => person.id === id);

	if (person) {
		response.json(person);
	} else {
		response.status(404).end();
	}
});

app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id);
	persons = persons.filter((person) => person.id !== id);

	response.status(204).end();
});

app.post('/api/persons', (request, response) => {
	const body = request.body;
	const errors = validateBody(body, response);

	if (!errors) {
		const person = {
			name: body.name,
			number: body.number,
			date: new Date(),
			id: generateId(),
		};

		persons = persons.concat(person);

		response.json(person);
	}
});

const generateId = () => {
	return Math.floor(Math.random() * 1000000);
};

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

	if (persons.findIndex((person) => person.name === body.name) !== -1) {
		return response.status(400).json({
			error: 'Name must be unique',
		});
	}
};

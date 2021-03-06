import React, { useState } from 'react';
import Anecdote from './Anecdote';

const App = () => {
	const anecdotes = [
		'If it hurts, do it more often',
		'Adding manpower to a late software project makes it later!',
		'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
		'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
		'Premature optimization is the root of all evil.',
		'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
		'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
	];

	const [selected, setSelected] = useState(0);

	const selectRandom = () => {
		let randomInt = Math.floor(Math.random() * anecdotes.length);

		while (randomInt === selected) {
			randomInt = Math.floor(Math.random() * anecdotes.length);
		}

		setSelected(randomInt);
	};

	const [points, setPoints] = useState({});

	const voteForAnAnecdote = () => {
		const newPoints = {
			...points,
		};
		newPoints[selected] = newPoints[selected] + 1 || 1;

		setPoints(newPoints);
	};

	const mostVoted = Object.entries(points).reduce(
		(res, [i, votes]) => (res.votes < votes ? { index: i, votes: votes } : res),
		{
			index: 0,
			votes: points[0] || 0,
		}
	).index;

	return (
		<div>
			<Anecdote
				type={0}
				text={anecdotes[selected]}
				votes={points[selected] || 0}
				vote={voteForAnAnecdote}
				next={selectRandom}
			/>

			<Anecdote
				type={1}
				text={anecdotes[mostVoted]}
				votes={points[mostVoted] || 0}
			/>
		</div>
	);
};

export default App;

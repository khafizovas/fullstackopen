import React, { useState } from 'react';
import Feedback from './Feedback';
import Statistics from './Statistics';

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	return (
		<div>
			<h1>Give feedback</h1>
			<Feedback
				incGood={() => setGood(good + 1)}
				incNeutral={() => setNeutral(neutral + 1)}
				incBad={() => setBad(bad + 1)}
			/>

			<h1>Statistics</h1>
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	);
};

export default App;

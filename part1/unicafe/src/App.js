import React, { useState } from 'react';
import Feedback from './Feedback';

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const incCategory = (category) => category + 1;

	return (
		<div>
			<Feedback
				incGood={() => setGood(incCategory(good))}
				incNeutral={() => setNeutral(incCategory(neutral))}
				incBad={() => setBad(incCategory(bad))}
			/>
		</div>
	);
};

export default App;

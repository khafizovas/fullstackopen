const Statistics = (props) => {
	return (
		<div>
			<h1>Statistics</h1>

			<p>Good {props.good}</p>
			<p>Neutral {props.neutral}</p>
			<p>Bad {props.bad}</p>
		</div>
	);
};

export default Statistics;

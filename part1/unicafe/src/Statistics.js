import Header from './Header';

const Statistics = (props) => {
	return (
		<div>
			<Header heading={'Statistics'} />
			<p>Good {props.good}</p>
			<p>Neutral {props.neutral}</p>
			<p>Bad {props.bad}</p>
		</div>
	);
};

export default Statistics;

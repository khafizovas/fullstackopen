import Category from './Category';
import Header from './Header';

const Statistics = (props) => {
	const sum = props.good + props.neutral + props.bad;

	if (sum === 0) return <p>No feedback given</p>;

	const average = (props.good - props.bad) / sum;
	const positive = (props.good * 100) / sum + '%';

	return (
		<div>
			<Header heading={'Statistics'} />
			<Category name='Good' value={props.good} />
			<Category name='Neutral' value={props.neutral} />
			<Category name='Bad' value={props.bad} />
			<Category name='All' value={sum} />
			<Category name='Average' value={average} />
			<Category name='Positive' value={positive} />
		</div>
	);
};

export default Statistics;

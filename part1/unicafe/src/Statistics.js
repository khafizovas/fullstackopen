import StatisticLine from './StatisticLine';

const Statistics = (props) => {
	const sum = props.good + props.neutral + props.bad;

	if (sum === 0) return <p>No feedback given</p>;

	const average = (props.good - props.bad) / sum;
	const positive = (props.good * 100) / sum + '%';

	return (
		<table>
			<tbody>
				<StatisticLine text='Good' value={props.good} />
				<StatisticLine text='Neutral' value={props.neutral} />
				<StatisticLine text='Bad' value={props.bad} />
				<StatisticLine text='All' value={sum} />
				<StatisticLine text='Average' value={average} />
				<StatisticLine text='Positive' value={positive} />
			</tbody>
		</table>
	);
};

export default Statistics;

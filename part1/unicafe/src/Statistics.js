import Category from './Category';
import Header from './Header';

const Statistics = (props) => {
	return (
		<div>
			<Header heading={'Statistics'} />
			<Category name='Good' value={props.good} />
			<Category name='Neutral' value={props.neutral} />
			<Category name='Bad' value={props.bad} />
		</div>
	);
};

export default Statistics;

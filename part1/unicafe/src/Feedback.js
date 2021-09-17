import Button from './Button';
import Header from './Header';

const Feedback = (props) => {
	return (
		<div>
			<Header heading={'Give feedback'} />
			<Button name='Good' handleClick={props.incGood} />
			<Button name='Neutral' handleClick={props.incNeutral} />
			<Button name='Bad' handleClick={props.incBad} />
		</div>
	);
};

export default Feedback;

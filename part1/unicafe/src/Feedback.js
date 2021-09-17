import Button from './Button';

const Feedback = (props) => {
	return (
		<div>
			<Button name='Good' handleClick={props.incGood} />
			<Button name='Neutral' handleClick={props.incNeutral} />
			<Button name='Bad' handleClick={props.incBad} />
		</div>
	);
};

export default Feedback;

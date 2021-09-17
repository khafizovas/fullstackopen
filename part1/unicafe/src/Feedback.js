import Button from './Button';

const Feedback = (props) => {
	return (
		<div>
			<h1>Give feedback</h1>

			<Button name='Good' handleClick={props.incGood} />
			<Button name='Neutral' handleClick={props.incNeutral} />
			<Button name='Bad' handleClick={props.incBad} />
		</div>
	);
};

export default Feedback;

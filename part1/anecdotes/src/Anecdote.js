import Button from './Button';

const Anecdote = (props) => {
	const types = ['Anecdote of the day', 'Anecdote with most votes'];

	const buttons =
		props.type === 0 ? (
			<>
				<Button name='Vote' handleClick={props.vote} />
				<Button name='Next anecdote' handleClick={props.next} />
			</>
		) : null;

	return (
		<section>
			<h3>{types[props.type]}</h3>
			<p>{props.text}</p>
			<p>Has {props.votes} votes</p>
			{buttons}
		</section>
	);
};

export default Anecdote;

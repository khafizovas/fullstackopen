const Total = (props) => {
	return (
		<p>
			Number of exercises {props.exercises.reduce((sum, cur) => sum + cur, 0)}
		</p>
	);
};

export default Total;

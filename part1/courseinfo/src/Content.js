import Part from './Part';

const Content = (props) => {
	return props.parts.map((part, i) => (
		<Part key={i} part={part} exercises={props.exercises[i]} />
	));
};

export default Content;

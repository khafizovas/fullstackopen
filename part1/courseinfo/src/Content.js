const Content = (props) => {
	return props.parts.map((part, i) => (
		<p key={i}>{`${part} ${props.exercises[i]}`}</p>
	));
};

export default Content;

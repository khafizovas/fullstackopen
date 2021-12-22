const Total = ({exercises}) => {
    const sum = exercises.reduce((sum, cur) => sum + cur, 0)

    return (
        <p><strong>Total of {sum} exercises</strong></p>
    )
}

export default Total
const Total = ({exercises}) => {
    const sum = exercises.reduce((sum, cur) => sum + cur, 0)

    return (
        <p>Number of exercises {sum}</p>
    )
}

export default Total
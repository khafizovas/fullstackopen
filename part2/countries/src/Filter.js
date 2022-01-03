const Filter = (props) => {
    return (<div>
        Find countries: <input value={props.curFilter} onChange={props.handleFilterChange}/>
    </div>);
};

export default Filter;
import React, {useState, useEffect} from 'react'
import axios from "axios";

import Filter from "./Filter";
import QueryResult from "./QueryResult";

const App = () => {
    const [curFilter, setCurFilter] = useState('')
    const [countries, setCountries] = useState([])

    useEffect(() => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => {
                setCountries(response.data)
            })
    }, [])

    const handleFilterChange = (e) => {
        const newFilter = e.target.value
        setCurFilter(newFilter)
    }

    return (
        <div>
            <Filter curFilter={curFilter} handleFilterChange={handleFilterChange}/>
            <QueryResult countries={countries} curFilter={curFilter}/>
        </div>
    );
}

export default App;

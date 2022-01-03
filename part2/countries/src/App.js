import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Filter from './Filter';
import QueryResult from './QueryResult';

const App = () => {
    const [curFilter, setCurFilter] = useState('');
    const [countries, setCountries] = useState([]);
    const [chosenCountry, setChosenCountry] = useState(null);

    useEffect(() => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => {
                setCountries(response.data);
            });
    }, []);

    const handleFilterChange = (e) => {
        setCurFilter(e.target.value);
        setChosenCountry(null);
    };

    return (
        <div>
            <Filter curFilter={curFilter} handleFilterChange={handleFilterChange}/>
            <QueryResult countries={countries} curFilter={curFilter} chosenCountry={chosenCountry}
                         setChosenCountry={setChosenCountry}/>
        </div>
    );
};

export default App;

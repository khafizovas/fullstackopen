const Countries = ({countries, chooseCountry}) => {
    return (<ul>
        {countries.map(country => <li key={country.name.common}>
            {country.name.common}{' '}
            <button onClick={() => chooseCountry(country)}>Show</button>
        </li>)}
    </ul>);
};

export default Countries;
const Country = ({country}) => {
    return (<div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h3>Languages</h3>
        <ul>{Object.values(country.languages)
            .map((language, i) => <li key={i}>{language}</li>)}
        </ul>
        <img src={country.flags.png} alt={'Country flag'}/>
    </div>);
};

export default Country;
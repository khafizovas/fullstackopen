import Countries from "./Countries";
import Country from "./Country";

const QueryResult = (props) => {
    const filteredCountries = props.curFilter ? props.countries
        .filter(country => country.name.common.toLowerCase().includes(props.curFilter.toLowerCase())) : []

    if (filteredCountries.length > 10) {
        return (<div>
            Too many matches, specify another filter!
        </div>)
    }

    if (filteredCountries.length > 1) {
        return <Countries countries={filteredCountries}/>
    }

    if (filteredCountries.length === 1) {
        return <Country country={filteredCountries[0]}/>
    }

    return null
}

export default QueryResult
import axios from 'axios';

import { useState, useEffect } from 'react';

const Country = ({ country }) => {
	const [weather, setWeather] = useState(null);

	useEffect(() => {
		axios
			.get(
				`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${country.capital}&appid=${process.env.REACT_APP_API_KEY}`
			)
			.then((response) => {
				setWeather(response.data);
			});
	}, [country]);

	return (
		<div>
			<h2>{country.name.common}</h2>
			<p>Capital: {country.capital}</p>
			<p>Population: {country.population}</p>
			<h3>Languages</h3>
			<ul>
				{Object.values(country.languages).map((language, i) => (
					<li key={i}>{language}</li>
				))}
			</ul>
			<img src={country.flags.png} alt={'Country flag'} />
			<h3>Weather in {country.capital}</h3>
			<p>
				<strong>Temperature:</strong> {weather?.main.temp}
			</p>
			{weather && (
				<img
					src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
					alt='Weather icon'
				/>
			)}
			<p>
				<strong>Wind:</strong>{' '}
				{`${weather?.wind.speed} mph, direction: ${weather?.wind.deg} deg`}
			</p>
		</div>
	);
};

export default Country;

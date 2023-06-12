import axios from 'axios';

// const options = {
//   method: 'GET',
//   url: 'https://covid-19-global-tracker-with-regional-data.p.rapidapi.com/api/covid/regionalDataByCountry/INDIA',
//   headers: {
//     'X-Authorization': '6179002e-6646-4852-be37-572758a58cbb',
//     'X-RapidAPI-Key': '5d63b2d2eemsh4da1ae251d3ed61p145a08jsn5e3ec88da019',
//     'X-RapidAPI-Host': 'covid-19-global-tracker-with-regional-data.p.rapidapi.com'
//   }
// };

// try {
// 	const {data}= await axios.request(options);
// 	console.log(data.casesCount)
// } catch (error) {
// 	console.error(error);
// }

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
  let changeableUrl = url;

  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }

  try {
    const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl);

    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    return error;
  }
};

// export const fetchDailyData = async () => {
//   try {
//     const { data } = await axios.get(`${url}/daily`);

//     return data.map(({ confirmed, deaths, reportDate: date }) => ({ confirmed: confirmed.total, deaths: deaths.total, date }));
//   } catch (error) {
//     return error;
//   }
// };

// Instead of Global, it fetches the daily data for the US
export const fetchDailyData = async () => {
    try {
      const { data } = await axios.get('https://api.covidtracking.com/v1/us/daily.json');
  
      return data.map(({ positive, recovered, death, dateChecked: date }) => ({ confirmed: positive, recovered, deaths: death, date }));
    } catch (error) {
      return error;
    }
  };

export const fetchCountries = async () => {
  try {
    const { data: { countries } } = await axios.get(`${url}/countries`);

    return countries.map((country) => country.name);
  } catch (error) {
    return error;
  }
};
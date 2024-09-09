import { formatTemperature } from "../helpers";
import { Weather } from "../hook/useWeather";

type ResultsProps = {
    weather: Weather
}

const Results = ({weather} : ResultsProps) => {

    console.log(weather);

    const icon = weather.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`
    

  return (
    <div 
        className=" shadow-md rounded-md py-10 px-5 space-y-3 bg-white mb-10 md:w-1/3"
    >
        <h2 className=" text-center font-bold text-4xl">{weather.name}</h2>
        <div className=" flex gap-2 items-center justify-center">
            <img src={iconUrl} alt="Icono Clima" />
            <p className=" text-center font-black text-6xl">{formatTemperature(weather.main.temp)}&deg;C</p>
        </div>
        <div className=" flex gap-16 items-center justify-center">
            <p className=" font-bold text-2xl">Min: <span className=" font-normal">{formatTemperature(weather.main.temp_min)}&deg;C</span></p>
            <p className=" font-bold text-2xl">Max: <span className=" font-normal">{formatTemperature(weather.main.temp_max)}&deg;C</span></p>
        </div>
    </div>
  )
}

export default Results
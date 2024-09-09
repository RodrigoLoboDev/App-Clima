import axios from "axios";
import { Clima } from "../types";
import { object, number, array, string, InferOutput, parse } from 'valibot'
import { useState } from "react";

// Schema
const WeatherSchema = object({
	name: string(),
	main: object({
		temp: number(),
		temp_min: number(),
		temp_max: number(),
	}),
    weather: array(object({
        icon: string()
    }))
})

// Type
export type Weather = InferOutput<typeof WeatherSchema>

// state inicial
const initialState = {
    name: '',
    main: {
        temp: 0,
        temp_min: 0,
        temp_max: 0,
    },
    weather: []
}

const useWeather = () => {

    const [weather, setWeather] = useState<Weather>(initialState)

    const [spinner, setSpinner] = useState(false)

    const FetchWeather = async (search : Clima) => {
        // console.log('consultando...', search);

        setSpinner(true)
        // resetear el state antes de una nueva consulta
        setWeather(initialState)

        try {
            const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${import.meta.env.VITE_API_KEY}`

            const {data} = await axios(geoUrl)
            
            const lat = data[0].lat
            const lon = data[0].lon

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_API_KEY}`

            const {data: dataWeather} = await axios<Weather>(weatherUrl)
            console.log(dataWeather);
            
            const result = parse(WeatherSchema, dataWeather)
            setWeather(result); 
            
        } catch (error) {
            console.log(error);
        } finally {
            setSpinner(false)
        }
    }
    
    return {
        weather,
        setWeather,
        spinner,
        FetchWeather
    }
 
}

export default useWeather
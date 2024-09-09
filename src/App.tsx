import { useMemo } from "react"
import Form from "./components/Form"
import Results from "./components/Results"
import useWeather from "./hook/useWeather"
import Spinner from "./components/Spinner"


function App() {

  const { weather, FetchWeather, spinner } = useWeather()

  const isWeather = useMemo(() => weather.name === '', [weather])  

  return (
    <>
      <h1 className=" text-4xl py-10 text-center font-black text-white">Buscador de Clima</h1>

      <main className=" flex justify-center gap-10 flex-col md:flex-row container mx-auto w-[80%]">
        <Form 
          FetchWeather={FetchWeather}
        />
        {spinner && <Spinner />}
        {!isWeather && <Results weather={weather}/>}
      </main>
    </>
  )
}

export default App

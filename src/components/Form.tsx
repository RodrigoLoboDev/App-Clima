import { countries } from "../data"
import { useForm } from "react-hook-form"
import { Clima } from "../types"
import Error from "./Error"

type FormProps = {
    FetchWeather: (search: Clima) => Promise<void>;
}

const Form = ({FetchWeather} : FormProps) => {

    const {
        register, 
        handleSubmit, 
        formState: { errors },
        reset
      } = useForm<Clima>() 

    const checkWeather = (data : Clima) => {

        // console.log(data);
        FetchWeather(data)
        
        // resetear el formulario
        reset()
    }

  return (
    <form 
        className=" bg-white shadow-md rounded-md py-10 px-5 space-y-3 md:w-1/3"
        noValidate
        onSubmit={handleSubmit(checkWeather)}
    >
        <div className=" space-y-2">
            <label 
                className=" uppercase font-bold text-gray-700"
                htmlFor="city"
            >Ciudad:</label>
            <input 
                className=" w-full py-2 px-5 border rounded-md"
                type="text"
                id="city"
                placeholder="Ciudad"
                {...register('city', {
                    required: 'La ciudad es requerida'
                })}
            />
            {errors.city && (
                <Error>{errors.city.message}</Error>
            )}
        </div>
        <div className=" space-y-2">
            <label 
                className=" uppercase font-bold text-gray-700"
                htmlFor="countries"
            >País:</label>
            <select
                className=" w-full py-2 px-5 border rounded-md text-center"
                id="countries"
                {...register('country', {
                    required: 'El País es requerido'
                })}
            >
                <option value="">--Selecciona un País--</option>
                {countries.map( country => (
                    <option 
                        key={country.code} 
                        value={country.code}
                    >{country.name}</option>
                ))}
            </select>
            {errors.country && (
                <Error>{errors.country.message}</Error>
            )}
    </div>

        <input 
            className=" w-full text-center uppercase text-white font-black py-2 rounded-md bg-indigo-700 cursor-pointer hover:bg-indigo-900 transition-all"
            type="submit"
            value={'Consular Clima'} 
        />
    </form>
  )
}

export default Form
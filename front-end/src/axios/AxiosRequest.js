import React, {useEffect} from 'react'
import axios from 'axios'

export default function AxiosRequest() {
  
const getData = () => {
    axios.get('https://jsonplaceholder.typicode.com/todos/')
     .then((res) => console.log(res.data))
     .catch((err)=> console.log(err))
} 
//le fait de mettre un array vide dans le useEffect signifie qu'on utilise pas de props
useEffect(
    () => {
        getData()
    },
[])
return (
    <div></div>
  )
}

import React from 'react'
import useAxios from '../hooks/useAxios'
import { useParams } from 'react-router-dom';


const CarsDetails = ()=>{
  const axios = useAxios();
  const {id} =useParams();



  const getSingleCar = async (id)=>{
    const data = await axios({url:`cars/${id}`})
  }

getSingleCar()


  return <div>CarsDetails</div>

}



export default CarsDetails
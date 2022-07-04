import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { useParams } from 'react-router-dom';
import { WeatherData } from '../../Components/types/types'
import { fetchHoursWeather } from '../../store/weatherSlice'
import cl from './Detail.module.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
interface Coordinate {
  lat: number | any,
  lon: number | any,
}

const DetaileInfo = () => {
  const [detailInfo, setDetailInfo] = useState<WeatherData>({})
  const { loading, error, list } = useAppSelector(state => state.weather);
  const { hourList } = useAppSelector(state => state.weather);
  const dispatch = useAppDispatch()
  const { id } = useParams();
  const coordinate: Coordinate = {
    lon: detailInfo.coord?.lon,
    lat: detailInfo.coord?.lon,
  }

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
        text: 'C',
      },
    },
  };

  const times = hourList[0].hourly.map(el => new Date(el.dt * 1000).toLocaleTimeString()).slice(0, 24)
  const temp = hourList[0].hourly.map(el => el.temp)
  // const times = ['1']
  // const temp = ['1']

  const data = {
    labels: times,
    datasets: [
      {
        label: 'Temperature:',
        data: temp,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };


  function findItem(id: string | any, list: WeatherData[]) {
    const item = list.filter((el) => el.id?.toString() === id);
    setDetailInfo(item[0]);
  }

  useEffect(() => {
    findItem(id, list)
    dispatch(fetchHoursWeather(coordinate))
  }, [])

  // useEffect(() => {
    
  //   return () => {
  //     dispatch(resetHoursWeather([]))
  //     console.log('jjjj')
  //   }
  // }, [])

  console.log(hourList);


  return (
    <div>
      <ul className={cl.datailInfo}>
        <li>City: {detailInfo.name}</li>
        <li>Temperature: {Math.round(detailInfo.main?.temp || 0)} °C</li>
        <li>Feel like: {Math.round(detailInfo.main?.feels_like || 0)} °C</li>
        <li>Temperature min: {Math.round(detailInfo.main?.temp_min || 0)} °C</li>
        <li>Temperature max: {Math.round(detailInfo.main?.temp_max || 0)} °C</li>
        <li>Pressure: {Math.round(detailInfo.main?.pressure || 0)} hPa</li>
        <li>Humidity: {Math.round(detailInfo.main?.humidity || 0)} %</li>
      </ul>
      <Bar options={options} data={data} />
    </div>
  )
}

export default DetaileInfo
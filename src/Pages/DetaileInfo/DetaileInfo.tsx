import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { useParams } from 'react-router-dom';
import { WeatherData } from '../../Components/types/types'
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


const DetaileInfo = () => {
  const [detailInfo, setDetailInfo] = useState<WeatherData>({})
  const { loading, error, list } = useAppSelector(state => state.weather);;
  const { id } = useParams();

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
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  //  const data = {
  //   labels,
  //   datasets: [
  //     {
  //       label: 'Dataset 1',
  //       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //       backgroundColor: 'rgba(255, 99, 132, 0.5)',
  //     },
  //     {
  //       label: 'Dataset 2',
  //       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //       backgroundColor: 'rgba(53, 162, 235, 0.5)',
  //     },
  //   ],
  // };


  function findItem(id: string | any, list: WeatherData[]) {
    const item = list.filter((el) => el.id?.toString() === id);
    setDetailInfo(item[0]);
  }
  useEffect(() => {
    findItem(id, list)
  }, [])

  console.log(detailInfo);

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
      {/* <Bar options={options} data={data} /> */}
    </div>
  )
}

export default DetaileInfo
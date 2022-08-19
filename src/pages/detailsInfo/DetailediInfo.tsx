import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { useParams } from 'react-router-dom';
import { WeatherData } from '../../components/types/types';
import { fetchHoursWeather, fetchWeather } from '../../store/weatherSlice';
import cl from './DetailediInfo.module.scss';
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
  lat: number | any;
  lon: number | any;
}

interface HourlyWheater {
  lat: number;
  lon: number;
  hourly: HourlyWheaterDay[];
}

interface HourlyWheaterDay {
  dt: number;
  temp: number;
}

const DetaileInfo = () => {
  const [detailInfo, setDetailInfo] = useState<WeatherData>({});
  const { list } = useAppSelector(state => state.weather);
  const { hourList } = useAppSelector(state => state.weather);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const coordinate: Coordinate = {
    lon: list.filter(el => el.id === Number(id)).map(el => el.coord.lon)[0],
    lat: list.filter(el => el.id === Number(id)).map(el => el.coord.lat)[0],
  };
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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

  const getData = (hourList: HourlyWheater[]) => {
    const times = hourList[0].hourly
      .map(el => new Date(el.dt * 1000).toLocaleTimeString())
      .slice(0, 24);
    const temp = hourList[0].hourly.map(el => el.temp);
    return {
      labels: times,
      datasets: [
        {
          label: 'Temperature:',
          data: temp,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };
  };

  function findCity(id: string | any, list: WeatherData[]) {
    const item = list.filter(el => el.id?.toString() === id);
    setDetailInfo(item[0]);
  }

  function findCurrentCity() {
    if (list.length) {
      const city = list.filter(el => el.id?.toString() === id);
      localStorage.setItem('current', city[0].name);
    }
  }

  const getSaveLocalStorageCity = function () {
    let city = localStorage.getItem('current');
    return city;
  };

  useEffect(() => {
    dispatch(fetchWeather(getSaveLocalStorageCity()));
    findCity(id, list);
    findCurrentCity();
    dispatch(fetchHoursWeather(coordinate));
    getSaveLocalStorageCity();
  }, []);

  useEffect(() => {
    findCity(id, list);
    dispatch(fetchHoursWeather(coordinate));
  }, [detailInfo, list]);

  return (
    <>
      <div className={cl.detailsBlock}>
        <div className={cl.details}>
          <div className={cl.detailsWrapper}>
            {detailInfo && (
              <ul className={cl.detailInfo}>
                <li>City: {detailInfo.name}</li>
                <li>Temperature: {Math.round(detailInfo.main?.temp || 0)} °C</li>
                <li>Feel like: {Math.round(detailInfo.main?.feels_like || 0)} °C</li>
                <li>Temperature min: {Math.round(detailInfo.main?.temp_min || 0)} °C</li>
                <li>Temperature max: {Math.round(detailInfo.main?.temp_max || 0)} °C</li>
                <li>Pressure: {Math.round(detailInfo.main?.pressure || 0)} hPa</li>
                <li>Humidity: {Math.round(detailInfo.main?.humidity || 0)} %</li>
              </ul>
            )}
          </div>
        </div>
          <div className={cl.detailsWrapperBlock}>
            {hourList.length && <Bar options={options} data={getData(hourList)} />}
          </div>
      </div>
    </>
  );
};

export default DetaileInfo;

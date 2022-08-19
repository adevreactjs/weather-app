import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { fetchWeather } from '../../store/weatherSlice';
import CircularProgress from '@mui/material/CircularProgress';
import cl from './Home.module.scss';
import Cart from '../../components/cart/Cart';
import Header from '../../components/header/Header';

const Home = () => {
  const [city, setCity] = useState<string>('');
  const { loading, list } = useAppSelector(state => state.weather);
  const dispatch = useAppDispatch();

  function setCityData(e: React.ChangeEvent<HTMLInputElement>) {
    setCity(e.target.value);
  }

  function getSaveLocalStorageCity() {
    Object.keys(localStorage).forEach(function (key) {
      if (key !== 'current') {
        console.log(key);
        let city = localStorage.getItem(key);
        dispatch(fetchWeather(city));
      }
    });
  }

  useEffect(() => {
    getSaveLocalStorageCity();
  }, []);

  return (
    <>
      <Header />
      <div className={cl.cardItem}>
        {loading ? <CircularProgress /> : list.map(el => <Cart weather={el} key={el.id} />)}
      </div>
    </>
  );
};
export default Home;

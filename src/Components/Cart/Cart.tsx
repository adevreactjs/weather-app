import React, { FC } from 'react';
import Button from '@mui/material/Button';
import { WeatherData } from '../types/types';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hook';
import { fetchWeather, removeWheatherCard } from '../../store/weatherSlice';
import UpdateIcon from '@mui/icons-material/Update';
import CloseIcon from '@mui/icons-material/Close';
import cl from './Card.module.css';

interface CartProps {
  weather: WeatherData
}

const Cart: FC<CartProps> = ({ weather }) => {
  const route = useNavigate();
  const dispatch = useAppDispatch();
  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();

  function updateData(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()
    dispatch(fetchWeather(weather.name))
  }

  function removeWeather(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()
    dispatch(removeWheatherCard(weather.id))
    localStorage.removeItem(weather.name || "")
  }

  return (
    <div className={cl.card} onClick={() => route(`/detaile/${weather.id}`)}>
      <Button onClick={removeWeather} className={cl.closeBtn} sx={{ color: 'white', marginLeft: '250px' }} startIcon={<CloseIcon sx={{ width: '60px', height: '60px' }} />}></Button>
      <div className={cl.cardInfo}>
        <h2>{weather.name}</h2>
        <p>{`${day}/${month}/${year}`}</p>
        <div className={cl.temp}>{Math.round(weather.main?.temp || 0)}<span>°C</span> </div>
        <Button onClick={updateData} sx={{ color: 'white' }} startIcon={<UpdateIcon sx={{ width: '60px', height: '60px' }} />}></Button>
      </div>
    </div>
  )
}

export default Cart
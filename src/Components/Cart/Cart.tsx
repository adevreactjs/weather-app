import React, { FC } from 'react';
import { WeatherData } from '../types/types';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hook';
import { removeWheatherCard } from '../../store/weatherSlice';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import cl from './Card.module.scss';

interface CartProps {
  weather: WeatherData;
}

const Cart: FC<CartProps> = ({ weather }) => {
  const route = useNavigate();
  const dispatch = useAppDispatch();
  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();
  let icon = weather.weather[0].icon;

  // function updateData(e: React.MouseEvent<HTMLButtonElement>) {
  //   e.stopPropagation();
  //   dispatch(fetchWeather(weather.name));
  // }

  function removeWeather(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    dispatch(removeWheatherCard(weather.id));
    localStorage.removeItem(weather.name || '');
  }

  return (
    <div className={cl.card} onClick={() => route(`/detaile/${weather.id}`)}>
      <IconButton onClick={removeWeather} sx={{ color: 'white', size: 'large' }} size={'large'}>
        <CloseIcon />
      </IconButton>
      <div className={cl.cardInfo}>
        <h2>{weather.name}</h2>
        <img src={`http://openweathermap.org/img/wn/${icon}@4x.png`} alt='icon' />
        <div className={cl.temp}>
          {Math.round(weather.main?.temp || 0)}
          <span>°C</span>
        </div>
        <p>{`${day}.${month}.${year} г.`}</p>

        {/* <Button
          onClick={updateData}
          sx={{ color: 'white' }}
          startIcon={<UpdateIcon sx={{ width: '60px', height: '60px' }} />}></Button> */}
      </div>
    </div>
  );
};

export default Cart;

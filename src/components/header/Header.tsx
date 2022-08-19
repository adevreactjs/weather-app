import React, { useState } from 'react';
import cl from './header.module.scss';
import { fetchWeather } from '../../store/weatherSlice';
import { useAppDispatch, useAppSelector } from '../../store/hook';

export default function Header() {
  const [city, setCity] = useState<string>('');
  const dispatch = useAppDispatch();

  function addCityCart(e: React.MouseEvent<HTMLButtonElement>) {
    dispatch(fetchWeather(city));
  }

  return (
    <header className={cl.header}>
      <div className={cl.wrapper}>
        <div className={cl.title}>Weather City</div>
        <input
          type='text'
          placeholder='Your city'
          value={city}
          onChange={e => setCity(e.target.value)}
        />
        <button className={cl.addBtn} onClick={addCityCart}>
          Add city
        </button>
      </div>
    </header>
  );
}

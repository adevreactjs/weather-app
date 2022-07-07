import React, { useEffect, useState } from 'react'
import Cart from '../../Components/Cart/Cart'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { fetchWeather } from '../../store/weatherSlice';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import cl from './Home.module.css';


const Home = () => {
  const [city, setCity] = useState<string>('')
  const { loading,error, list } = useAppSelector(state => state.weather);;
  const dispatch = useAppDispatch();

  function setCityData(e: React.ChangeEvent<HTMLInputElement>) {
    setCity(e.target.value)
  }

  function addCityCart(e: React.MouseEvent<HTMLButtonElement>) {
    dispatch(fetchWeather(city))
  }

  function getSaveLocalStorageCity() {
    Object.keys(localStorage).forEach(function (key) {
      if(key !== 'current') {
        console.log(key)
        let city = localStorage.getItem(key);
        dispatch(fetchWeather(city))
      }        
    });
  }

  useEffect(() => {
    getSaveLocalStorageCity()
  }, [])
  
  return (
    <Container maxWidth="xl">
      <div className={cl.addCity}>
        <h1>Weather City </h1>
        {error && <h2>An error occured: {error}</h2>}
        <TextField sx={{ width: '250px', marginBottom: '20px' }} id="outlined-basic" label="Город" variant="outlined" value={city} onChange={setCityData} />
        <Button sx={{ width: '250px', color: 'black', borderColor: 'black' }} variant="outlined" placeholder='City' onClick={addCityCart}>Add City</Button>
      </div>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {loading ? <Box className={cl.loader} sx={{ height: '50vh', margin: '0 auto' }}>
          <CircularProgress />
        </Box> : list.map((el) => (<Grid item xs={2} sm={4} md={4} key={el.id}>
          <Cart weather={el} key={el.id} />
        </Grid>))}
      </Grid>
    </Container>
  )
}

export default Home
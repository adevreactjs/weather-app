import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DetaileInfo from './pages/detailsInfo/DetailediInfo';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/weather-app' element={<App />} />
          <Route path='/detaile/:id' element={<DetaileInfo />} />
        </Routes>
      </BrowserRouter>
    </Provider>
);



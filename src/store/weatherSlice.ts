import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';
import axios from 'axios'


type Wheather = {
    lat: number,
    lon: number,
    id: number,
    name: string,
    main: Main,
    coord: Coordinate
}
type Main = {
    temp: number,
    feelsLike: number,
    pressure: number,
    humidity: number
}

type WeatherListState = {
    list: Wheather[],
    hourList: HourlyWheater[],
    loading: boolean,
    hourListLoading: boolean,
    error: string | null,
}

type HourlyWheater = {
    lat: number,
    lon: number,
    hourly: HourlyWheaterDay[]
}
type HourlyWheaterDay = {
    dt: number,
    temp: number,
}
type Coordinate = {
    lat: number,
    lon: number,
}

export const fetchWeather = createAsyncThunk<Wheather, string | any, { rejectValue: string }>(
    'weather/fetchWeather',
    async function (text, { rejectWithValue }) {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${text}&units=metric&appid=e630dc44d82c4116f9c2df5f62768bf7`)
        const data = await response.data;
        return data;
    }
);

export const fetchHoursWeather = createAsyncThunk<HourlyWheater, Coordinate, { rejectValue: string }>(
    'weather/fetchHoursWeather',
    async function (coordinate, { rejectWithValue }) {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinate.lat}&lon=${coordinate.lon}&units=metric&appid=e630dc44d82c4116f9c2df5f62768bf7`)
        const data = await response.data;        
        return data;
    }
);


const initialState: WeatherListState = {
    list: [],
    hourList: [],
    hourListLoading: false,
    loading: false,
    error: null,
}

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {

        removeWheatherCard(state, action: PayloadAction<number | any>) {
            state.list = state.list.filter((el) => el.id !== action.payload)
        },
        // resetHoursWeather(state, action: PayloadAction<HourlyWheater[]>) {
        //     state.hourList = action.payload
        // }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeather.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWeather.fulfilled, (state, action) => {
                if (state.list.some((el) => el.id === action.payload.id)) {
                    const res = state.list.map((el) => (el.id == action.payload.id ? { ...action.payload } : el));
                    state.list = res
                    state.loading = false
                    console.log('update');
                } else {
                    state.list.push(action.payload)
                    localStorage.setItem(action.payload.name, action.payload.name)
                    state.loading = false
                }

            })
            .addCase(fetchHoursWeather.pending, (state) => {
                state.error = null;
            })
            .addCase(fetchHoursWeather.fulfilled, (state, action) => {
                state.hourList = []
                state.hourList.push(action.payload)

            })
    }
});

export const { removeWheatherCard} = weatherSlice.actions;

export default weatherSlice.reducer;

function isError(action: AnyAction) {
    return action.type.endsWith('rejected');
}
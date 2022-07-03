import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';
import axios from 'axios'


type Wheather = {
    id: number,
    name: string,
    main: Main

}

type Main = {
    temp: number,
    feelsLike: number,
    pressure: number,
    humidity: number
}
type WeatherListState = {
    list: Wheather[],
    loading: boolean,
    error: string | null,
}


export const fetchWeather = createAsyncThunk<Wheather, string | any, { rejectValue: string }>(
    'weather/fetchWeather',
    async function (text, { rejectWithValue }) {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${text}&units=metric&appid=e630dc44d82c4116f9c2df5f62768bf7`)
        const data = await response.data;
        return data;
    }
);

const initialState: WeatherListState = {
    list: [],
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
        //     addTodo(state, action: PayloadAction<string>) {
        //       state.list.push({
        //         id: new Date().toISOString(),
        //         title: action.payload,
        //         completed: false,
        //       });
        //     },
        //     toggleComplete(state, action: PayloadAction<string>) {
        //       const toggledTodo = state.list.find(todo => todo.id === action.payload);
        //       if (toggledTodo) {
        //         toggledTodo.completed = !toggledTodo.completed;
        //       }
        //     },
        //     removeTodo(state, action: PayloadAction<string>) {
        //       state.list = state.list.filter(todo => todo.id !== action.payload);
        //     }
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
                    console.log('update');
                } else {
                    state.list.push(action.payload)
                    localStorage.setItem(action.payload.name, action.payload.name)

                }

            })

    }
});

export const { removeWheatherCard } = weatherSlice.actions;

export default weatherSlice.reducer;
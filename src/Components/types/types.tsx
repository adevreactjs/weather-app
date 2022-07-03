
export interface Main {
    temp?: number,
    pressure?: number,
    humidity?: number
    feels_like?: number
    temp_min?: number
    temp_max?: number
}

export interface WeatherData {
    id?: number,
    lat?: number,
    lon?: number,
    name?: string,
    main?: Main
}
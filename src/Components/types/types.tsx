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
    coord?: Coord,
    name?: string,
    main?: Main
}

export interface Coord {
    lat?: number,
    lon?: number,
}

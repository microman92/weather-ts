export interface GeoLocation {
    lat: number;
    lon: number;
    local_names: {
        [key: string]: string;
    };
}

export interface WeatherDesc {
    description: string;
    icon: string;
    id: number;
    main: string;
}

export interface Temperature {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
}

export interface CurrentWeather {
    clouds: number;
    dt?: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    uvi: number;
    visibility: number;
    weather?: WeatherDesc[];
    wind_speed?: number;
}

export interface DailyWeather {
    dt: number;
    temp: Temperature;
    weather: WeatherDesc[];
}

export interface HourlyWeather {
    dt: number;
    temp: number;
    feels_like: number;
    weather: WeatherDesc[];
}

export interface WeatherData {
    current: CurrentWeather;
    daily: DailyWeather[];
    hourly: HourlyWeather[];
    name?: string
    timezone?: string
}

export interface HighlightItem {
    key: string;
    value: number;
}


export interface Icons {
    clouds: string;
    humidity: string;
    pressure: string;
    uvi: string;
    visibility: string;
    wind_speed: string;
}


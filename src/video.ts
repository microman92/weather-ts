interface WeatherVideoMap {
    [key: string]: string; // Используем string как тип ключа и значения
}


import cloud from './assets/video/cloud.webm';
import cloudy from './assets/video/cloudy.webm';
import haze from './assets/video/haze.webm';
import sun from './assets/video/sun.webm';
import partlycloudy from './assets/video/partly-cloudy.webm';
import rain from './assets/video/rain.webm';

export const weatherName: WeatherVideoMap = {
    'дымка': haze,
    'ясно': sun,
    'небольшая облачность': cloudy,
    'пасмурно': cloud,
    'облачно с прояснениями': partlycloudy,
    'небольшой дождь': rain,
    'дождь': rain,
    'переменная облачность': partlycloudy,
    'небольшой проливной дождь': rain
};
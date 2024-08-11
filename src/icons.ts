interface WeatherIconMap {
    [key: string]: string;
}
interface Icons {
    [key: string]: string;
}

// Импорт изображений с использованием import
import minicloud from '@/assets/img/minicloud.svg';
import sun from '@/assets/img/sun.svg';
import clouds from '@/assets/img/clouds.svg';
import overcast from '@/assets/img/overcast.svg';
import rainsun from '@/assets/img/rainsun.svg';
import smallrain from '@/assets/img/smallrain.svg';
import rain from '@/assets/img/rain.svg';

import humidity from '@/assets/img/humidity.svg';
import pressure from '@/assets/img/pressure.svg';
import uvi from '@/assets/img/uvi.svg';
import visibility from '@/assets/img/visibility.svg';
import wind_speed from '@/assets/img/wind_speed.svg';

export const weatherName: WeatherIconMap = {
    'дымка': minicloud,
    'ясно': sun,
    'небольшая облачность': clouds,
    'пасмурно': overcast,
    'облачно с прояснениями': rainsun,
    'небольшой дождь': smallrain,
    'дождь': rain,
    'переменная облачность': rainsun,
    'небольшой проливной дождь': smallrain
};


export const icons: Icons = {
    clouds: clouds,
    humidity: humidity,
    pressure: pressure,
    uvi: uvi,
    visibility: visibility,
    wind_speed: wind_speed
};
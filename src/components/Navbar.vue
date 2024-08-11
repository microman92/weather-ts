<template>
    <app-Menubar class="custom__mob-jcenter custom__wrap custom__j-between">
        <template #start>
            <div class="p-3">
                <a href="/index.html" class="flex gap-2 align-items-center">
                    <img src="@/assets/img/logo.svg" alt="лого" class="logo-img">
                    <span class="font-bold text-2xl line-height-4 logo-span">Weather </span>
                </a>
            </div>
        </template>
        <template #end>
            <div class="menu__end flex gap-2 align-item-center">
                <div class="favorite-btn relative text-color">
                    <app-Button type="button" severity="secondary" label="Избранные города" icon="pi pi-heart"
                        :badge="weatherStores.favoriteCity.length" @click="visibleRight = !visibleRight" />
                </div>
                <app-Inplace>
                    <template #display>
                        {{ cityName || 'Введите город' }}
                    </template>
                    <template #content="{ closeCallback }">
                        <span class="inline-flex items-center gap-2">
                            <app-InputText v-model="cityName" autofocus @keydown.enter="getWeather(cityName)" />
                            <app-Button icon="pi pi-times" search severity="danger" @click="closeCallback" />
                            <app-Toast position="top-right" />
                        </span>
                    </template>
                </app-Inplace>
            </div>
        </template>
    </app-Menubar>

    <app-Drawer v-model:visible="visibleRight" header="Избранное" position="right" @show="checkFavorites">
        <div class="modal flex flex-column gap-4">
            <div v-for="favorite in favoriteList" :key="favorite.name"
                class="modal__item p-4 text-center border-round-2xl w-9 flex flex-column gap-2 justify-content-center m-auto cursor-pointer"
                @click="selectCity(favorite)">

                <h3 class="modal__title text-xl font-bold capitalize">{{ favorite.name }}</h3>

                <p class="modal__date line-height-2 custom-color-blue">{{ favoriteHours(favorite) }}</p>

                <div class="modal__img w-4rem m-auto">
                    <img class="w-full" src="@/assets/img/sun.svg" alt="иконка солнце">
                </div>


                <p class="modal__temp custom-color-blue">+ 42°</p>
                <p class="modal__desc">Ясно</p>
            </div>
        </div>
    </app-Drawer>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useWeather } from '@/stores/index'
import type { GeoLocation, WeatherData } from "@/interfaces";
import { useToast } from "primevue/usetoast";
import axios from 'axios'
const toast = useToast();


const cityName = ref<string>('')
const weatherStores = useWeather()
// const weatherData = ref<WeatherData | null>(null)
const visibleRight = ref<boolean>(false)

const emit = defineEmits(['weatherInfo'])

const getWeather = async (city: string): Promise<void> => {
    weatherStores.cityExists = false
    try {
        const response = await axios.get<GeoLocation[]>(`https://api.openweathermap.org/geo/1.0/direct?q={${city}}&appid=${weatherStores.apiKey}`)

        if (response.data.length === 0) {
            throw new Error('City not found');
        }

        const { lat, lon, local_names }: GeoLocation = response.data[0]

        if (local_names.ru.toLowerCase() == city.toLowerCase() || local_names.ru.toLowerCase() == city.toLowerCase()) {

            let response2 = await axios.get<WeatherData>(`https://api.openweathermap.org/data/2.8/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${weatherStores.apiKey}&units=metric&lang=ru`)

            let weatherInfo: WeatherData = { ...response2.data, name: city }

            weatherStores.currentCity = weatherInfo

            // weatherData.value = weatherInfo
            // emit('weatherInfo', weatherStores.currentCity)


        }

        cityName.value = ''

    } catch (error) {
        if (error instanceof Error) {
            toast.add({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 })
        }
        cityName.value = ''
    }
}

const favoriteList = computed<WeatherData[]>(() => weatherStores.favoriteCity)

const favoriteHours = (city: WeatherData) => {
    return new Date().toLocaleString('ru-RU', {
        timeZone: city.timezone,
        timeStyle: 'short',
        hourCycle: 'h23'
    });
};


const checkFavorites = () => {
    if (weatherStores.favoriteCity.length > 0) {
        visibleRight.value = true;
    }
};

const selectCity = async (city: WeatherData) => {
    if (city) {
        await getWeather(city.name);
        visibleRight.value = false;
    }
};


onMounted(() => {
    getWeather('Ташкент')
    checkFavorites()
})

</script>

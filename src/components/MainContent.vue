<template>
    <app-Toast position="top-right" />
    <main class="main flex flex-column align-items-center gap-4 container mt-8 relative">
        <app-Button class="btn" type="button" :severity="isFavoriteCity ? 'info' : 'secondary'"
            :label="isFavoriteCity ? 'Убрать из избранного' : 'Добавить в избранное'" icon="pi pi-heart"
            @click="addFavorites(weatherStores.currentCity)" />

        <div class="main__left justify-content-around w-full relative border-round-2xl flex custom__wrap">
            <div class="today flex gap-6 align-items-center text-center justify-content-center">

                <div class="today__left mt-6 capitalize">

                    <h2 class="font-medium custom-color-blue">{{ temp }}°</h2>
                    <div class="today__loc-time mt-5 flex flex-column align-items-center justify-content-center custom-color-green">
                        <p class="text-2xl text-white">{{ currentCity }}</p>
                        <p class="today__summary-text text-lg line-height-2 mt-2 custom-color-green">Время: {{ getTime }}</p>
                    </div>


                </div>

                <div class="today__right mt-6 flex justify-content-center flex-column h-full">
                    <div class="today__right_img text-center w-full">
                        <img :src="weatherIcon" alt="солнце">
                    </div>
                    <div class="today__summary mt-6">
                        <p class="text-2xl line-height-1">Сегодня </p>
                        <p class="today__summary-text text-lg line-height-2 mt-2 line-height-1">{{ description }}</p>
                    </div>

                </div>


            </div>


            <div class="hour__cards ml-4"
                v-if="filteredWeather">
                <Hour v-for="(hour, i) in props.filteredWeather" :key="i" :hour="hour" />
            </div>

        </div>





        <div class="main__right flex flex-wrap w-full border-round-2xl pt-6 pb-6 row-gap-6 justify-content-around">

            <Highlights v-for="(value, i) in highlightsArray" :key="i" :value="value" />

        </div>

        <div class="main__week gap-5 p-4 border-round-2xl w-full mb-7">
            <Day v-for="(day, i) in oldDaily" :key="i" class="w-full text-center" :day="day" :daily="oldDaily" />
        </div>

    </main>



</template>

<script setup lang="ts">
import Hour from './Hour.vue';
import Highlights from './Highlights.vue';
import Day from './Day.vue';
import { weatherName } from '@/icons'
import type { WeatherData, HourlyWeather, HighlightItem, DailyWeather } from '@/interfaces';
import { computed, ref, onMounted, watch } from 'vue';
import { useWeather } from '@/stores'
import { useToast } from "primevue/usetoast";

const props = defineProps<{ filteredWeather: HourlyWeather[] | null }>();
const weatherStores = useWeather()
const toast = useToast();

const highlightsArray = ref<HighlightItem[]>([])
// const oldDaily = ref(weatherStores.currentCity?.daily ? [...weatherStores.currentCity.daily] : []);
const oldDaily = ref<DailyWeather[]>([]);



const temp = computed<number>(() => Math.round(weatherStores.currentCity?.current.temp ?? 0))
const description = computed<string | undefined>(() => weatherStores.currentCity?.current.weather[0].description)
const weatherIcon = computed<string | undefined>(() => weatherName[description.value] || weatherName['Ясно'])
const currentCity = computed<string | undefined>(() => weatherStores.currentCity?.name)



const daily = () => {
    if (oldDaily.value && oldDaily.value.length > 0) {
        oldDaily.value.pop();
    }
};

const getTime = computed<string>(() => {
    return new Date().toLocaleString('en-US', {
        timeZone: weatherStores.currentCity?.timezone ?? 'UTC',
        timeStyle: 'short',
        hourCycle: 'h23'
    })
})

const highlightsItems = () => {
    if (weatherStores.currentCity && weatherStores.currentCity.current) {
        const { clouds, humidity, pressure, uvi, visibility, wind_speed } = weatherStores.currentCity.current;


        highlightsArray.value = [
            { key: 'clouds', value: clouds },
            { key: 'humidity', value: humidity },
            { key: 'pressure', value: pressure },
            { key: 'uvi', value: uvi },
            { key: 'visibility', value: visibility },
            { key: 'wind_speed', value: wind_speed }
        ];
    }
}




const addFavorites = (city: WeatherData) => {
    weatherStores.cityExists = weatherStores.favoriteCity.some(favCity => favCity.name === city.name);
    if (city) {
        const cityExists = weatherStores.favoriteCity.some(favCity => favCity.name === city.name);
        if (!cityExists) {
            weatherStores.addFavoriteCity(city);
            toast.add({ severity: 'success', summary: 'Success', detail: 'Город добавлен в избранное', life: 3000 });
        } else {
            weatherStores.removeFavoriteCity(city);
            toast.add({ severity: 'info', summary: 'Info', detail: 'Город удален из избранного', life: 3000 });
        }
    }
};

const isFavoriteCity = computed(() => {
    return weatherStores.favoriteCity.some(
        (city: WeatherData) => city.name === weatherStores.currentCity?.name
    );
});



watch(() => weatherStores.currentCity, (newCity) => {
    highlightsItems();

    if (newCity && newCity.daily) {
        oldDaily.value = [...newCity.daily];
        daily();
    }
}, { immediate: true });


</script>

<style scoped></style>
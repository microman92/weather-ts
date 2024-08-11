<template>
    <div class="day flex flex-column gap-2 align-items-center justify-content-start capitalize">
        <h3 class="day__title font-medium text-xl text-white custom-color-blue">{{ dayLabel }}</h3>
        <p class="day__date text-lg text-white font-normal">{{ getDay }} {{ getMounth }}</p>
        <img class="mt-2 mb-2" src="@/assets/img/rainsun.svg" alt="иконка погоды">
        <p class="day__temp text-white font-normal">+ {{ dayTemp }}°</p>
        <p class="day__info custom-color-green">{{ weatherDayDesc }}</p>
    </div>
</template>

<script setup lang="ts">
import { unix } from '@/unix'
import { computed } from 'vue'
import type { DailyWeather } from '@/interfaces'

const props = defineProps<{ day: DailyWeather, daily: DailyWeather[] }>();


const getDay = computed(() => unix(props.day.dt, 'day'))
const getMounth = computed(() => unix(props.day.dt, 'mounth'))

const dayTemp = computed(() => Math.round(props.day.temp.max))
const weatherDayDesc = computed(() => props.day.weather[0].description)

const dayLabel = computed(() => {
    if (props.day.dt === props.daily[0].dt) {
        return 'Сегодня';
    } else if (props.day.dt === props.daily[1].dt) {
        return 'Завтра';
    } else {
        return unix(props.day.dt, 'weekDay');
    }
});


</script>

<style scoped></style>
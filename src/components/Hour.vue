<template>
    <div
        class="hour__card text-center flex flex-column align-items-center justify-content-between pr-3 pl-3 tablet__hour_card">
        <h3 class="text-4xl font-medium custom-color-blue">{{ dayDesc }} </h3>
        <img class="hour__card_img" :src="dayWeatherIcon" alt="иконка погоды">
        <p class="text-white font-medium tablet__desc">{{ dayWeatherDesc }}</p>
        <div class="hour__card_temp">
            <div>
                <p class="text-white text-xl tablet__desc">Температура: {{ temp }}°</p>
                <p class="feels-like mt-3 custom-color-green tablet__desc">ощущается как: {{ tempFeels }}°</p>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import type { HourlyWeather } from '@/interfaces'
import { getHours } from '@/unix'
import { weatherName } from '@/icons'
import { ref, computed } from 'vue'

const props = defineProps<{ hour: HourlyWeather }>();
const hours = ref<number>(getHours(props.hour.dt))


const dayDesc = computed((): string => {
    switch (hours.value) {
        case 0:
            return 'Ночь';
        case 6:
            return 'Утро';
        case 12:
            return 'День';
        case 18:
            return 'Вечер';
        default:
            return 'Неизвестное время';
    }
})

const dayWeatherDesc = computed<string | undefined>(() => props.hour?.weather[0].description)

const dayWeatherIcon = computed<string | undefined>(() => {
    if (dayWeatherDesc.value) {
        return weatherName[dayWeatherDesc.value]
    } else {
        return weatherName['Ясно']
    }

})

const temp = computed<number>(() => Math.round(props.hour?.temp ?? 0))
const tempFeels = computed<number>(() => Math.round(props.hour?.temp ?? 0))






</script>

<style scoped>
@media(max-width:768px) {

    .tablet__desc {
        font-size: 14px !important;
    }

    .tablet__hour_card {
        gap: 10px;
    }

}
</style>
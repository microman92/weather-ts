<template>
    <div class="highlights flex justify-content-start align-items-center">
        <div class="highlights__left flex gap-3 align-items-center">
            <div class="cicle flex justify-content-center align-items-center" :class="{ active: pressure }">
                <img :src="icon" alt="иконка описания">
            </div>

            <span class="text-lg font-normal text-white">{{ valueDesc }} {{ weatherValue }}</span>
        </div>

    </div>
</template>

<script setup lang="ts">
import type { HighlightItem } from '@/interfaces'
import { icons } from '@/icons'
import { computed, ref } from 'vue'

const props = defineProps<{ value: HighlightItem }>();
const pressure = ref<boolean>(false)

const pressureImg = () => {
    if (props.value.key == 'pressure' || props.value.key == 'uvi') {
        pressure.value = !pressure.value
    }
}

pressureImg()


const valueDesc = computed((): string => {
    switch (props.value.key) {
        case 'clouds':
            return 'Облочность ';
        case 'humidity':
            return 'Влажность ';
        case 'pressure':
            return 'Давление ';
        case 'uvi':
            return 'Ультрафиолетовый индекс ';
        case 'visibility':
            return 'Видимость ';
        case 'wind_speed':
            return 'Скорость ветра ';
        default:
            return 'Неизвестное время';
    }
})

const weatherValue = computed((): string | number => {
    switch (props.value.key) {
        case 'clouds':
            return `${props.value.value} %`;
        case 'humidity':
            return `${props.value.value} %`;
        case 'pressure':
            return `${props.value.value}мм ртутного столба`;
        case 'uvi':
            return props.value.value;
        case 'visibility':
            return props.value.value;
        case 'wind_speed':
            return `${props.value.value} м/с `;
        default:
            return props.value.value;
    }
})



const icon = computed(() => icons[props.value.key]);


</script>

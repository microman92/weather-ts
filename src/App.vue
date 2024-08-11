<template>
  <video :src="weatherVideo" class="bg" autoplay muted loop></video>
  <div class="wrapper">
    <Navbar />
    <MainContent v-if="weatherStores.currentCity && filteredWeather" :filteredWeather="filteredWeather" />
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import MainContent from '@/components/MainContent.vue';
import { ref, computed, watch } from 'vue'
import type { HourlyWeather } from "@/interfaces";
import { weatherName } from "@/video";
import { getHours } from '@/unix'
import { useWeather } from './stores';



const filteredWeather = ref<HourlyWeather[] | null>(null)
const weatherStores = useWeather()


const description = computed<string | undefined>(() => weatherStores.currentCity?.current.weather[0].description)

const weatherVideo = computed<string>(() => {
  return description.value ? weatherName[description.value] || weatherName['ясно'] : weatherName['ясно'];
});


const hourWeather = () => {
  if (weatherStores.currentCity) {

    const oneDay = weatherStores.currentCity.hourly.slice(0, 24);

    const filterWeather: HourlyWeather[] = oneDay.filter(item => {
      const hours = getHours(item.dt);

      return hours === 0 || hours === 6 || hours === 12 || hours === 18;
    });

    filteredWeather.value = filterWeather;
  }
};


watch(() => weatherStores.currentCity, () => {
  hourWeather();
}, { immediate: true });


</script>

<style scoped>
.bg {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  object-fit: cover;
}

.bg::after {
  content: '';
  display: block;
  background: #000;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.3;
  z-index: -1;
}
</style>
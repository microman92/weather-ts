import { ref, computed, watch } from 'vue';
import { defineStore } from 'pinia';
import type { WeatherData } from '../interfaces';

export const useWeather = defineStore('weather', () => {
  const apiKey = ref<string>('4da7538765e8fe6277abe859869c3755');
  const favoriteCity = ref<WeatherData[]>([]);
  const cityExists = ref<boolean>(false);
  const currentCity = ref<WeatherData | null>(null);

  const loadFavorites = () => {
    const storedFavorites = localStorage.getItem('favoriteCities');
    if (storedFavorites) {
      favoriteCity.value = JSON.parse(storedFavorites);
    }
  };

  const addFavoriteCity = (city: WeatherData) => {
    if (!favoriteCity.value.some(favCity => favCity.name?.toLocaleLowerCase() === city.name.toLocaleLowerCase())) {
      favoriteCity.value.push(city);
      localStorage.setItem('favoriteCities', JSON.stringify(favoriteCity.value));
      cityExists.value = true;
    }
  };

  const removeFavoriteCity = (city: WeatherData) => {
    favoriteCity.value = favoriteCity.value.filter(favCity => favCity.name !== city.name);
    localStorage.setItem('favoriteCities', JSON.stringify(favoriteCity.value));
    cityExists.value = false;
  };

  loadFavorites();

  watch(favoriteCity, (newFavorites) => {
    localStorage.setItem('favoriteCities', JSON.stringify(newFavorites));
  }, { deep: true });

  return { apiKey, favoriteCity, cityExists, addFavoriteCity, removeFavoriteCity, currentCity };
});

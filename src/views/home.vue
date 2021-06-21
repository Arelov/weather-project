<template>
  <div v-if="$store.state.current_weather">
    <div class="max-w-5xl m-auto">
      <Card class="bg-white m-4">
        <template #header>
          <div class="flex justify-between text-green-600 font-medium">
            <div>CURRENT WEATHER</div>
            <div>19.06.2021</div>
          </div>
        </template>
        <template #content>
          <div class="flex justify-evenly items-center">
            <div class="flex flex-col items-center">
              <img
                :src="`http://openweathermap.org/img/wn/${$store.state.current_weather.weather.icon}@2x.png`"
              />
              <div>{{ $store.state.current_weather.weather.description }}</div>
            </div>
            <div class="text-4xl font-medium">
              {{ $store.state.current_weather.temp }}°С
            </div>
            <div class="flex">
              <div class="mr-3">
                <div>Sunrise:</div>
                <div>Sunset:</div>
                <div>Duration:</div>
              </div>
              <div>
                <div>{{ $store.state.current_weather.sunrise }} hr</div>
                <div>{{ $store.state.current_weather.sunset }} hr</div>
                <div>{{ $store.state.current_weather.duration }} hr</div>
              </div>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script>
import Card from "../components/card.vue";
export default {
  components: { Card },
};
</script>

<style  lang="scss">
</style>

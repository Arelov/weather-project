<template>
  <div class="md:flex m-auto max-w-5xl bg-gray-100">
    <div
      v-for="el in $store.state.weeklyForecast"
      :key="el.day"
      class="bg-white m-2 p-4 md:w-full"
    >
      <div class="text-green-600 uppercase font-medium">
        {{ el.dayWeek }}
      </div>
      <div class="uppercase font-light text-lg">
        {{ el.day }}
      </div>
      <div class="flex justify-center py-6">
        <img :src="`http://openweathermap.org/img/wn/${el.icon}@2x.png`" />
      </div>
      <div class="text-3xl font-medium">{{ el.temp }} °С</div>
      <div class="font-light">
        {{ el.description }}
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
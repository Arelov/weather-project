<template>
  <div class="bg-gray-100">
    <div class="max-w-5xl m-auto">
      <div class="mx-2 py-4 flex justify-between items-center">
        <div class="uppercase text-green-600 text-3xl font-medium">
          my weather
        </div>
        <div class="relative">
          <input class="block border border-gray-600 w-60 p-1" type="text" />
          <i class="fas fa-search absolute top-2.5 right-2"></i>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-gray-700">
    <div class="max-w-5xl m-auto">
      <div class="flex mx-2">
        <router-link
          class="px-4 py-2 block text-white text-lg router-link"
          to="/"
          >Today</router-link
        >
        <router-link
          class="px-4 py-2 block text-white text-lg router-link"
          to="/next-days"
          >5-day forecast</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.router-link:hover {
  border-bottom: 4px solid rgb(5, 150, 105);
}
.router-link {
  border: 4px solid rgba(5, 150, 105, 0);
}
</style>

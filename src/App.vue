<template>
  <div class="bg-gray-100 h-screen">
    <Header />
    <router-view />
  </div>
</template>
<script>
import Header from "@/components/header.vue";
export default {
  components: {
    Header,
  },
  mounted() {
    this.$store.dispatch("receiveLocation");
    this.$store.dispatch("getTodayForecast");
    this.$store.dispatch("get5dayForecast");
  },
};
</script>
<style lang="scss">
</style>

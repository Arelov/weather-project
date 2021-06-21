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
  },
};
</script>
<style lang="scss">
</style>

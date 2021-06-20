<template>
  <div class="bg-gray-200">
    <Card>
      <template #header>
        <div class="flex justify-between text-green-600 font-medium">
          <div>CURRENT WEATHER</div>
          <div>19.06.2021</div>
        </div>
      </template>
      <template #centent> </template>
    </Card>
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

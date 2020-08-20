<template>
  <section class="container">
    <h1>Demo example of vue-chartjs</h1>
    <div class="columns">
      <div class="column">
        <h3>Bubble Chart</h3>
        <bubble-chart></bubble-chart>
      </div>
    </div>
  </section>
</template>

<script>
import BubbleChart from '@/components/BubbleChart.vue'
export default {
  name: 'Bubble',
  components: {
    BubbleChart
  }
}
</script>

<template>
  <div>
    <hero-section
      backgroundImage="homepage-hero.jpg"
      title="Welcome to Instaflikr"
      subtitle="A fake photo app"
    />
    <div class="wrapper">
      <recent-photos />
      <place-photos />
    </div>
  </div>
</template>

<script>
import HeroSection from '@/components/HeroSection.vue'
import RecentPhotos from '@/components/RecentPhotos.vue'
import PlacePhotos from '@/components/PlacePhotos.vue'
export default {
  name: 'Home',
  components: {
    HeroSection,
    RecentPhotos,
    PlacePhotos
  }
}
</script>

<style lang="scss">
.wrapper {
  margin: 0 auto;
  max-width: 800px;
  @media only screen and (max-width: 799px) {
    max-width: 100%;
    margin: 0 1.5rem;
  }
}
</style>

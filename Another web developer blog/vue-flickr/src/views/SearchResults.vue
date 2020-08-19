<template>
  <div>
    <div class="wrapper">
      <h1>Results for: "{{tag}}"</h1>
      <ul v-if="!loading" class="image-card-grid">
        <image-card v-for="i in cleanImages" :key="i.id" :image="i" />
      </ul>
      <ul v-else class="image-card-grid">
        <image-card v-for="i in 6" :key="i" :loading="true" />
      </ul>
    </div>
  </div>
</template>

<script>
import ImageCard from '@/components/ImageCard.vue'
import flickr from '../flickr'
export default {
  name: 'searchResults',
  props: {
    tag: String
  },
  created () {
    this.search()
  },
  watch: {
    tag (value) {
      this.search()
    }
  },
  data () {
    return {
      loading: false,
      images: []
    }
  },
  components: {
    ImageCard
  },
  computed: {
    isTagEmpty () {
      return !this.tag || this.tag.length === 0
    },
    cleanImages () {
      return this.images.filter(i => i.url_n)
    }
  },
  methods: {
    search () {
      if (!this.isTagEmpty) {
        this.loading = true
        this.fetchImages()
      }
    },
    fetchImages () {
      return flickr('photos.search', {
        tags: this.tag,
        extras: 'url_n, owner_name, description, date_taken, views',
        page: 1,
        per_page: 30
      }).then(res => {
        this.images = res.data.photos.photo
        this.loading = false
      })
    }
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
.image-card-grid {
  list-style: none;
  margin: .5rem 0;
  padding: 0;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}
</style>

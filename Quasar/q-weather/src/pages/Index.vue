<template>
  <q-page class="flex column">
    <div class="col q-pt-lg q-px-md">
      <q-input
        v-model="search"
        placeholder="Search"
        dark
        borderless>
        <template v-slot:before>
          <q-icon
            @click="getLocation"
            name="my_location" />
        </template>
        <template v-slot:append>
          <q-btn round dense flat icon="search" />
        </template>
      </q-input>
    </div>
    <div
      v-if="weatherData"
      class="col">
      <div class="text-white text-center">
        <div class="text-h4 textweight-light">
          Aktau
        </div>
        <div class="text-h6 text-weight-ligh">
          Rain
        </div>
        <div class="text-h1 text-weight-thin relative-position">
          <span>8</span>
          <span class="text-h4 relative-position degree">&deg;</span>
        </div>
      </div>
      <div class="col text-center">
        <img src="https://www.fillmurray.com/100/100" alt="Bill">
      </div>
    </div>
    <div v-else class="col">
      <div class="column text-center text-white">
        <div class="col text-h2 text-weight-thin q-mb-xl">
          Quasar<br>Wheather
        </div>
        <q-btn
          @click="getLocation"
          class="col"
          flat>
          <q-icon left size="3em" name="my_location" />
          <div>Find my location</div>
        </q-btn>
      </div>
    </div>
    <div class="col skyline">

    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      search: '',
      weatherData: null,
      lat: null,
      lon: null,
      apiUrl: 'https://samples.openweathermap.org/data/2.5/weather',
      apiKey: '53fe700b839c7cee947f39c887c4babc' // process.env.VUE_APP_API_KEY
    }
  },
  methods: {
    getLocation () {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude
        this.lon = position.coords.longitude
        this.getWeatherByCoords()
      })
    },
    getWeatherByCoords () {
      this.$axios(`${this.apiUrl}?lat=${this.lat}&lon=${this.lon}&appid=${this.apiKey}&units=metric`)
        .then(res => {
          console.log(res)
        })
    }
  }
}
</script>

<style lang="scss">
.q-page {
  background: linear-gradient(to top, #8360c3, #2ebf91);
}
.degree {
  top: -44px;
}
.skyline {
  flex: 0 0 150px;
  background: url('../assets/town.png');
  background-size: contain;
  background-position: center bottom;
}
</style>

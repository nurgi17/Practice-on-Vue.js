<template>
  <div id="app">
    <div id="nav">
      <ul>
        <button
          v-for="path in paths"
          :key="path.id"
          class="ui inverted button"
          :class="path.color">
          <li>
            <router-link :to="path.to">{{ path.name }}</router-link>
          </li>
        </button>
      </ul>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  data () {
    return {
      paths: [
        { id: 1, color: 'orange', to: '/', name: 'Homepage' },
        { id: 2, color: 'primary', to: '/chart', name: 'Line Chart' },
        { id: 3, color: 'primary', to: '/bubble', name: 'Buble Chart' }
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
}
li {
  list-style: none;
}
</style>

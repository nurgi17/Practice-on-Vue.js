<template>
  <nav class="navbar">
    <form class="searchbar">
      <label>
        <span class="screen-reader-only">Search:</span>
        <input v-model="tag" placeholder="Search for photos" type="text" class="searchbar-input" />
      </label>
      <button type="submit" class="btn btn--green btn--go" @click.prevent="search">Go</button>
    </form>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data () {
    return {
      tag: ''
    }
  },
  methods: {
    search () {
      this.$router.push({
        name: 'searchResults',
        params: {
          tag: this.tag
        }
      })
      this.tag = ''
    }
  }
}
</script>

<style lang="scss">
.screen-reader-only {
  height: 1px;
  width: 1px;
  position: absolute;
  left: -100000px;
}
.text-centered {
  text-align: center;
}
.navbar {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: #F0F0F0;
}
.searchbar {
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 549px) {
    width: 100%;
    label {
      width: 80%;
    }
  }
}
.searchbar-input {
  padding: .5rem 1rem;
  border-radius: 20px;
  font-size: 1rem;
  border: 1px solid gray;
  min-width: 300px;
  @media only screen and (max-width: 549px) {
    min-width: 0;
    width: 100%;
  }
}
.btn {
  padding: .5rem 1rem;
  font-size: 1rem;
  border-radius: 20px;
  background: transparent;
  border: none;
}
.btn--green {
  background: #42b983;
  color: white;
  font-weight: bold;
}
.btn--go {
  padding: .5rem 2rem;
  margin-left: 1rem;
}
</style>

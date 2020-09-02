<template>
  <div id="app">
    <header class="header">
      <nav class="navbar navbar-light bg-light">
        <span class="navbar-brand mb-0 h1">Auth example with gql</span>
        <div v-if="authStatus" class="form-inline" id="nav">
          <div>Hi {{ user.name }}</div>
          <button class="" @click="logout">Log Out</button>
        </div>
      </nav>
    </header>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
        .then(() => this.$router.push('/login'))
    }
  },
  computed: {
    authStatus () {
      return this.$store.getters.authStatus
    },
    user () {
      return this.$store.getters.user
    }
  }
}
</script>

<style>

#app {
  font-family: 'Helvetica';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
}
#nav {
  display: flex;
}
#nav>div{
  color: white;
  margin-top: 1rem;
  margin-right: 2rem;
  font-size: 2rem;
  font-weight: 500;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
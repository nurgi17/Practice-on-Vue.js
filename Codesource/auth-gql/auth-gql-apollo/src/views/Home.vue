<template>
  <div class="container home">
    <main>
      <h1>Hey {{ user.name }} you have been authenticated </h1>
      <div>
        <h4>These are your details...</h4>
        <p>Email: {{ user.email }}</p>
        <p>Full Name {{ user.name }}</p>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
    
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  }
}
</script>

<style>
main{
  padding: 2rem;
  display: grid;
  place-content: center;
}

h1{
  font-size: 36px;
}
</style>
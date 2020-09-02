<template>
  <div class="container">
    <h3>Sign Up</h3>
    <form action="POST" @submit.prevent="registerUser">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" name="name" placeholder="Ussen Nurgissa" v-model="authDetails.name" aria-describedby="emailHelp"/>
      </div>
      <div class="form-group">
        <label for="email">Email Address</label>
        <input type="email" class="form-control" name="email" placeholder="example@gmail.com" v-model="authDetails.email" aria-describedby="emailHelp">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" name="password" placeholder="password" v-model="authDetails.password" aria-describedby="emailHelp">
      </div>
      <div class="d-flex">
        <button class="btn btn-primary mr-2">Sign Up</button>
        <p class="pt-3">
          Already have an acoount?
          <router-link to="/login" style="color:rgb(0,128,255)">Login</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      authDetails: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    registerUser () {
      this.$store.dispatch('register', this.authDetails)
        .then(() => this.$router.push('/dashboard'))
    }
  }
}
</script>

<style>
</style>

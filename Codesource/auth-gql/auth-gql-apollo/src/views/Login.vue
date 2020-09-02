<template>
  <div class="container">
    <h3>Log In</h3>
    <form action="POST" @submit.prevent="loginUser">
      <div class="form-group">
        <label for="email">Email Address</label>
        <input type="email" class="form-control" name="email" placeholder="example@gmail.com" v-model="authDetails.email" aria-describedby="emailHelp">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" name="password" placeholder="password" v-model="authDetails.password">
      </div>
      <div class="d-flex">
        <button class="btn btn-primary mr-2">Log In</button>
        <p class="auth-text pt-3">Don't have a account? <router-link style="color:rgb(0,128,255)" to="/">Register</router-link></p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      authDetails: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    loginUser () {
      this.$store.dispatch('login', this.authDetails)
        .then(() => this.$router.push('/dashboard'))
    }
  }
}
</script>

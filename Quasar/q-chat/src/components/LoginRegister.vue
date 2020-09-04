<template>
  <q-form @submit="submitForm">
    <q-input
      v-if="tab == 'register'"
      outlined
      class="q-mb-md"
      v-model="formData.name"
      label="Name" />
    <q-input
      outlined
      class="q-mb-md"
      v-model="formData.email"
      type="email"
      label="Email" />
    <q-input
      outlined
      class="q-mb-md"
      v-model="formData.password"
      type="password"
      label="Password" />
      <div class="row">
        <q-space />
        <q-btn
          color="primary"
          type="submit"
          :label="tab" />
      </div>
  </q-form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: ['tab'],
  data () {
    return {
      formData: {
        name: '',
        email: '',
        passsword: ''
      }
    }
  },
  methods: {
    ...mapActions('store', ['registerUser', 'loginUser']),
    submitForm () {
      if (this.tab === 'login') {
        this.loginUser(this.formData)
      } else {
        this.registerUser(this.formData)
          .then(this.$router.push('/'))
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

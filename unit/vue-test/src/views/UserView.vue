<template>
  <div>
    <VUserSearchForm @submitted="searchUser"/>
    <VUserProfile :user="user" style="margin-top: 20px;"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import VUserProfile from '@/components/VUserProfile.vue'
import VUserSearchForm from '@/components/VUserSearchForm.vue'

export default {
  components: {
    VUserProfile,
    VUserSearchForm
  },
  // data () {
  //   return {
  //     user: {
  //       name: ''
  //     }
  //   }
  // },
  computed: {
    ...mapState({
      user: 'user'
    })
  },
  methods: {
    searchUser (username) {
      this.$store.dispatch('SEARCH_USER', { username })
    }
  }
}
</script>

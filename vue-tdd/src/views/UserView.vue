<template>
  <div>
    <VUserSearchForm @submitted="seacrhUser"/>
    <VUserProfile :user="user"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import VUserSearchForm from '@/components/VUserSearchForm.vue'
import VUserProfile from '@/components/VUserProfile.vue'
export default {
  name: 'UserView',
  components: {
    VUserSearchForm,
    VUserProfile
  },
  computed: {
    ...mapState ({
      user: 'user'
    })
  },
  methods: {
    seacrhUser (username) {
      this.$store.dispatch('SEARCH_USER', { username })   
    }
  }
}
</script>

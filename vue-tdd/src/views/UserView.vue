<template>
  <div>
    <VUserSearchForm />
    <VUserProfile :user="user"/>
  </div>
</template>

<script>
import VUserSearchForm from '@/components/VUserSearchForm.vue'
import VUserProfile from '@/components/VUserProfile.vue'
export default {
  name: 'UserView',
  components: {
    VUserSearchForm,
    VUserProfile
  },
  data () {
    return {
      user: {
        name: ''
      }
    }
  }
}
</script>

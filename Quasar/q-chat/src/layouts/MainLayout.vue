<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="$route.fullPath.includes('/chat')"
          v-go-back.single
          flat
          dense
          icon="arrow_back"
          label="Back" />
        <q-toolbar-title class="absolute-center">
          {{ title }}
        </q-toolbar-title>
        <q-btn
          v-if="!userDetails.userId"
          to="/auth"
          class="absolute-right q-pr-sm"
          no-caps
          flat
          dense
          icon="account_circle"
          label="Login" />
        <q-btn
          v-else
          class="absolute-right q-pr-sm"
          no-caps
          flat
          dense
          icon="account_circle"
          @click="logoutUser">
            Logout <br/>
            {{ userDetails.name }}
          </q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import mixinOtherUserDetails from '../mixins/mixin-other-user-details'
export default {
  mixins: [mixinOtherUserDetails],
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  computed: {
    ...mapState('store', ['userDetails']),
    title () {
      const currentPath = this.$route.fullPath
      if (currentPath === '/') return 'Q-Chat'
      else if (currentPath.includes('/chat')) return this.otherUserDetails.name
      else if (currentPath === '/auth') return 'Login'
      else return ''
    }
  },
  methods: {
    ...mapActions('store', ['logoutUser'])
  }
}
</script>

<style lang="scss">
.q-toolbar {
  .q-btn {
    line-height: 1.2;
  }
}
</style>

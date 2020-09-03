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
          to="/auth"
          class="absolute-right q-pr-sm"
          no-caps
          flat
          dense
          icon="account_circle"
          label="Login" />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  computed: {
    title () {
      const currentPath = this.$route.fullPath
      if (currentPath === '/') return 'Q-Chat'
      else if (currentPath === '/chat') return 'Chat'
      else if (currentPath === '/auth') return 'Login'
      else return ''
    }
  }
}
</script>

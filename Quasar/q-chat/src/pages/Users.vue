<template>
  <q-page class="flex q-pa-md">
    <q-list
      class="full-width"
      separator>
      <q-item
        v-for="contact in contacts"
        :key="contact.id"
        to="/chat"
        clickable
        v-ripple>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ contact.name.charAt(0) }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ contact.name }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-badge
            :color="contact.online ? 'light-green-5' : 'grey-4'">
            {{ contact.online ? 'Online' : 'Offline' }}
          </q-badge>
        </q-item-section>
      </q-item>

      <q-separator />
    </q-list>
  </q-page>
</template>

<script>
const contacts = [
  {
    id: 1,
    name: 'Ruddy Jedrzej',
    online: false
  },
  {
    id: 2,
    name: 'Mallorie Alessandrini',
    online: false
  },
  {
    id: 3,
    name: 'Elisabetta Wicklen',
    online: true
  },
  {
    id: 4,
    name: 'Seka Fawdrey',
    online: false
  }
]
export default {
  data () {
    return {
      contacts
    }
  }
}
</script>

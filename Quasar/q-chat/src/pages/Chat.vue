<template>
  <q-page
    ref="pageChat"
    class="page-chat flex column">
    <q-banner
      v-if="!otherUserDetails.online"
      class="bg-grey-4 text-center fixed-top">
      {{ otherUserDetails.name }} User is offline.
    </q-banner>
    <div
      :class="{ 'invisible' : !showMessages }"
      class="q-pa-md column col justify-end">
      <q-chat-message
        v-for="(message, key) in messages"
        :key="key"
        :name="message.from == 'me' ? userDetails.name : otherUserDetails.name"
        :text="[message.text]"
        :sent="message.from == 'me' ? true : false"
        :bg-color="message.from == 'me' ? 'white' : 'light-green'"
      />
    </div>
    <q-footer elevated>
      <q-toolbar>
        <q-form
          class="full-width">
            <q-input
              v-model="newMessage"
              ref="newMessage"
              bg-color="white"
              outlined
              rounded
              label="Message"
              dense>
            <template v-slot:after>
              <q-btn
                round
                dense
                flat
                color="white"
                icon="send"
                type="submit"
                @click.prevent="sendMessage"/>
            </template>
          </q-input>
        </q-form>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import mixinOtherUserDetails from '../mixins/mixin-other-user-details'
export default {
  mixins: [mixinOtherUserDetails],
  data () {
    return {
      newMessage: '',
      showMessages: false
    }
  },
  methods: {
    ...mapActions('store', ['firebaseGetMessages', 'firebaseStopGettingMessages', 'firebaseSendMessage']),
    sendMessage () {
      this.firebaseSendMessage({
        message: {
          text: this.newMessage,
          from: 'me'
        },
        otherUserId: this.$route.params.otherUserId
      })
      this.clearMessage()
    },
    clearMessage () {
      this.newMessage = ''
      this.$refs.newMessage.focus()
    },
    scrollToBottom () {
      const pageChat = this.$refs.pageChat.$el
      setTimeout(() => window.scrollTo(0, pageChat.scrollHeight), 20)
    }
  },
  computed: {
    ...mapState('store', ['messages', 'userDetails'])
  },
  watch: {
    messages (val) {
      if (Object.keys(val).length) {
        this.scrollToBottom()
        setTimeout(() => {
          this.showMessages = true
        }, 200)
      }
    }
  },
  mounted () {
    this.firebaseGetMessages(this.$route.params.otherUserId)
  },
  destroyed () {
    this.firebaseStopGettingMessages()
  }
}
</script>

<style lang="scss">
  .page-chat {
    &:after {
      content: '';
      display: block;
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 0;
      opacity: 0.3;
      background:
      radial-gradient(circle at 50% 59%, #D2CAAB 3%, #364E27 4%, #364E27 11%, rgba(54,78,39,0) 12%, rgba(54,78,39,0)) 50px 0,
      radial-gradient(circle at 50% 41%, #364E27 3%, #D2CAAB 4%, #D2CAAB 11%, rgba(210,202,171,0) 12%, rgba(210,202,171,0)) 50px 0,
      radial-gradient(circle at 50% 59%, #D2CAAB 3%, #364E27 4%, #364E27 11%, rgba(54,78,39,0) 12%, rgba(54,78,39,0)) 0 50px,
      radial-gradient(circle at 50% 41%, #364E27 3%, #D2CAAB 4%, #D2CAAB 11%, rgba(210,202,171,0) 12%, rgba(210,202,171,0)) 0 50px,
      radial-gradient(circle at 100% 50%, #D2CAAB 16%, rgba(210,202,171,0) 17%),
      radial-gradient(circle at 0% 50%, #364E27 16%, rgba(54,78,39,0) 17%),
      radial-gradient(circle at 100% 50%, #D2CAAB 16%, rgba(210,202,171,0) 17%) 50px 50px,
      radial-gradient(circle at 0% 50%, #364E27 16%, rgba(54,78,39,0) 17%) 50px 50px;
      background-color:#63773F;
      background-size:100px 100px;
    }
  }
  .q-banner {
    top: 50px;
    z-index: 2;
    opacity: 0.8;
  }
  .q-message{
    z-index: 1;
  }
</style>

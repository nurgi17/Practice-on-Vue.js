import Vue from 'vue'
import { firebaseAuth, firebaseDb } from '../boot/firebase'

let messagesRef

const state = {
  userDetails: {},
  users: {},
  messages: {}
}

const mutations = {
  SET_USER_DETAILS (state, payload) {
    state.userDetails = payload
  },
  ADD_USER (state, payload) {
    Vue.set(state.users, payload.userId, payload.user)
  },
  UPDATE_USER (state, payload) {
    Object.assign(state.users[payload.userId], payload.user)
  },
  ADD_MESSAGE (state, payload) {
    Vue.set(state.messages, payload.messageId, payload.message)
  },
  CLEAR_MESSAGES (state) {
    state.messages = {}
  }
}

const actions = {
  registerUser ({ commit }, data) {
    firebaseAuth.createUserWithEmailAndPassword(data.email, data.password)
      .then(res => {
        const userId = firebaseAuth.currentUser.uid
        firebaseDb.ref('users/' + userId).set({
          name: data.name,
          email: data.email,
          online: true
        })
      })
      .catch(err => console.log(err.message))
  },
  loginUser ({ commit }, data) {
    firebaseAuth.signInWithEmailAndPassword(data.email, data.password)
      .then(res => console.log(res))
      .catch(err => console.log(err.message))
  },
  logoutUser ({ commit }) {
    firebaseAuth.signOut()
  },
  handleAuthStateChanged ({ state, commit, dispatch }) {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        const userId = firebaseAuth.currentUser.uid
        firebaseDb.ref('users/' + userId).once('value', snapshot => {
          const userDetails = snapshot.val()
          commit('SET_USER_DETAILS', {
            name: userDetails.name,
            email: userDetails.email,
            userId: userId
          })
        })
        dispatch('firebaseUpdateUser', {
          userId: userId,
          updates: {
            online: true
          }
        })
        dispatch('firebaseGetUsers')
        this.$router.push('/')
      } else {
        dispatch('firebaseUpdateUser', {
          userId: state.userDetails.userId,
          updates: {
            online: false
          }
        })
        commit('SET_USER_DETAILS', {})
        this.$router.replace('/auth')
      }
    })
  },
  firebaseUpdateUser ({ commit }, data) {
    if (data.userId) {
      firebaseDb.ref('users/' + data.userId).update(data.updates)
    }
  },
  firebaseGetUsers ({ commit }) {
    firebaseDb.ref('users').on('child_added', snapshot => {
      const user = snapshot.val()
      const userId = snapshot.key
      commit('ADD_USER', {
        userId,
        user
      })
    })
    firebaseDb.ref('users').on('child_changed', snapshot => {
      const user = snapshot.val()
      const userId = snapshot.key
      commit('UPDATE_USER', {
        userId,
        user
      })
    })
  },
  firebaseGetMessages ({ commit, state }, id) {
    const userId = state.userDetails.userId
    messagesRef = firebaseDb.ref('chats/' + userId + '/' + id)
    messagesRef.on('child_added', snapshot => {
      const message = snapshot.val()
      const messageId = snapshot.key
      commit('ADD_MESSAGE', {
        messageId,
        message
      })
    })
  },
  firebaseStopGettingMessages ({ commit }) {
    if (messagesRef) {
      messagesRef.off('child_added')
      commit('CLEAR_MESSAGES')
    }
  },
  firebaseSendMessage ({ state }, data) {
    firebaseDb.ref('chats/' + state.userDetails.userId + '/' + data.otherUserId).push(data.message)
    data.message.from = 'them'
    firebaseDb.ref('chats/' + data.otherUserId + '/' + state.userDetails.userId).push(data.message)
  }
}

const getters = {
  users: state => {
    const userFiltered = {}
    Object.keys(state.users).forEach(key => {
      if (key !== state.userDetails.userId) {
        userFiltered[key] = state.users[key]
      }
    })
    return userFiltered
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

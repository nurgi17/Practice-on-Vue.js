import { firebaseAuth, firebaseDb } from '../boot/firebase'

const state = {
  userDetails: {}
}

const mutations = {
  SET_USER_DETAILS (state, payload) {
    state.userDetails = payload
  }
}

const actions = {
  registerUser ({ commit }, data) {
    firebaseAuth.createUserWithEmailAndPassword(data.email, data.password)
      .then(res => {
        console.log(res)
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
  handleAuthStateChanged ({ commit }) {
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
      } else {
        commit('SET_USER_DETAILS', {})
      }
    })
  }
}

const getters = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

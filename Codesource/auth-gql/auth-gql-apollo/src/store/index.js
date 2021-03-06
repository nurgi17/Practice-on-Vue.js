import Vue from 'vue'
import Vuex from 'vuex'
import { onLogout, apolloClient } from '../vue-apollo'
import { LOGGED_IN_USER } from '../graphql/queries'
import { LOGIN_USER, REGISTER_USER } from '../graphql/mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    user: {},
    authStatus: false
  },
  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
    },
    LOGIN_USER (state, user) {
      state.authStatus = true
      state.user = { ...user }
    },
    LOGOUT_USER (state) {
      state.authStatus = ''
      state.token = '' && localStorage.removeItem('apollo-token')
    }
  },
  actions: {
    async register ({ commit, dispatch }, authDetails) {
      try {
        const { data } = await apolloClient.mutate({ mutation: REGISTER_USER,
          variables: { ...authDetails }})
        const token = JSON.stringify(data.createUser.token)
        commit('SET_TOKEN', token)
        localStorage.setItem('apollo-token', token)
        dispatch('setUser')
      } catch (err) {
        console.log(err)
      }
    },
    async login ({ commit, dispatch }, authDetails) {
      try {
        const { data } = await apolloClient.mutate({ mutation: LOGIN_USER,
          variables: { ...authDetails }})
          const token = JSON.stringify(data.login.token)
          commit('SET_TOKEN', token)
          localStorage.setItem('apollo-client', token)
          dispatch('setUser')
      } catch (err) {
        console.log(err)
      }
    },
    async setUser ({ commit }) {
      const { data } = await apolloClient.query({ query: LOGGED_IN_USER })
      commit('LOGIN_USER', data.me)
    },
    async logOut ({ commit }) {
      commit('LOGOUT_USER')
      onLogout(apolloClient)
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.authStatus,
    user: status => status.user
  }
})

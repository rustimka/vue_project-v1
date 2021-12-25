import authApi from '@/api/auth'
import {setItem} from '@/helpers/persistanceStorage'

const state = {
  isSubmitting: false,
  carrentUser: null,
  validdationErrors: null,
  isLoggedIn: null 
}

const mutations = {
  registerStart(state) {
    state.isSubmitting = true,
    state.validdationErrors = null
  },
  registerSuccess(state, payload) {
    state.isSubmitting = false,
    state.carrentUser = payload,
    state.isLoggedIn = true
  },
  registerFailure(state, payload) {
    state.isSubmitting = false,
    state.validdationErrors = payload
  }
}

const actions = {
  register(context, credentials) {
    return new Promise(resolve => {
      authApi
        .register(credentials)
        .then(response => {
          context.commit('registerSuccess', response.data.user)
          setItem('accessToken',response.data.user.token)
          resolve(response.data.user)
        })
        .catch(result => {
          context.commit('registerFailure', result.response.data.errors)
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
  
}

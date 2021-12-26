<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <router-link :to="{name: 'login'}">
              Need an account?
            </router-link>
          </p>
          <mcv-validation-errors
           v-if="validationErrors"
          :validation-errors="validationErrors" 
          />
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Username"
                v-model="username"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
                v-model="email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="password"
              />
            </fieldset>
            <button
              class="btn btn-lg btn-primary pull-xs-right"
              :disabled="isSubmitting"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import McvValidationErrors from '@/components/ValidationErrors'
export default {
  name: 'McvRegister',
  components: {
    McvValidationErrors
  },
  data() {
    return {
      email: '',
      password: '',
      username: ''
    }
  },
  computed: {
    isSubmitting() {
      return this.$store.state.auth.isSubmitting
    },
    validattionErrors() {
      return this.$store.state.auth.validattionErrors
    }
  },
  methods: {
    onSubmit() {
      console.log('onSubmit')
      this.$store
        .dispatch('register', {
          email: this.email,
          username: this.username,
          password: this.password
        })
        .then(() => {
          this.$router.push({name: 'home'})
        })
    }
    /* increaseCounter() { */
    /*   console.log('increaseCounter') */
    /*   this.$store.commit('increment') */
    /* } */
  }
}
</script>

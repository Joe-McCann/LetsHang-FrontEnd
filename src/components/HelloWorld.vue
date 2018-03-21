<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <img src="@/assets/logo.png" alt="Vuetify.js" class="mb-5">
        <blockquote>
          &#8220;First, solve the problem. Then, write the code.&#8221;
          <footer>
            <small>
              <em>&mdash;John Johnson</em>
            </small>
          </footer>
        </blockquote>
        <a v-if="!authenticated" id="loginLink" v-on:click="auth.login()" class="headline mt-4">Click Here To Sign In</a>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>


<script>
  export default {
    name: 'helloworld',
    props: ['auth', 'authenticated'],
    data: function () {
      this.auth.handleAuthentication()
      return {}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
#loginLink:hover {
  text-decoration: underline
}
</style>

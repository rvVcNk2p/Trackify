<template>
  <div class="login-page">
    <login-form />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import LoginForm from '@/components/auth/LoginForm.vue'

@Component({
  components: {
    LoginForm
  }
})
export default class LoginPage extends Vue {}
</script>

<style>
.login-page {
  min-height: 100vw;
  text-align: center;
}
</style>

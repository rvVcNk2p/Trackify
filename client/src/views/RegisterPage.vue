<template>
  <div class="register-page">
    <h1>Register page</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class RegisterPage extends Vue {}
</script>

<style lang="scss">
.register-page {
  min-height: 100vw;
  text-align: center;
}
</style>

<template>
  <div class="registration-page">
    <registration-form />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import RegistrationForm from '@/components/auth/RegistrationForm.vue'

@Component({
  components: {
    RegistrationForm
  }
})
export default class RegistrationPage extends Vue {}
</script>

<style lang="scss">
.registration-page {
  min-height: 100vw;
  text-align: center;
}
</style>

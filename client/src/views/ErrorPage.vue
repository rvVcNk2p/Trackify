<template>
  <div class="error-page">
    <h1 class="error-page__title">
      ERROR 404
    </h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ErrorPage extends Vue {}
</script>

<style lang="scss">
.error-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 53.5vw;
  text-align: center;

  .error-page__title {
    font-family: $global__font-family;
    font-size: rem(50);
  }
}
</style>

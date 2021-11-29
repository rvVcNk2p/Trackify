<template>
  <div class="home-page">
    <h1 class="home-page__title">
      Welcome to the jungle...
    </h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class HomePage extends Vue {}
</script>

<style lang="scss">
.home-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 53.5vw;
  text-align: center;

  .home-page__title {
    font-family: $global__font-family;
    font-size: rem(50);
  }
}
</style>

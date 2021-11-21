<template>
  <span
    class="material-icon material-icons-outlined"
    v-on="$listeners"
  >
    {{ icon }}
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class MaterialIcon extends Vue {
  @Prop({
    type: String,
    required: true
  })
  icon!: string
}
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/icon?family=Material+Icons+Outlined');
</style>

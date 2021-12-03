<template>
  <div
    class="snack-bar"
    :class="[`snack-bar--${snack.type}`]"
  >
    <div class="snack-bar__content">
      {{ snack.message }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import MaterialIcon from '@/components/utils/MaterialIcon.vue'
import TrAvatar from '@/components/utils/TrAvatar.vue'
import { Snackbar as SnackBarType } from '@/store/types'

@Component({
  components: {
    TrAvatar,
    MaterialIcon
  }
})
export default class SnackBar extends Vue {
  @Prop({
    type: Object as () => SnackBarType,
    required: true
  })
  readonly snack!: SnackBarType
}
</script>

<style lang="scss">
.snack-bar {
  width: 50%;
  margin: 0 auto;
  margin-bottom: rem(10);
  padding: rem(10);
  animation: fadeIn 1s, fadeOut 3s;
  border: rem(1) solid $global__color--black;
  border-radius: rem(6);
  background-color: $global__color--white;
  box-shadow: 0 -1px 3px 0 rgba(0, 0, 0, 0.2)
    0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12);
  color: $global__color--black;

  &.snack-bar--success {
    background-color: $global__color--green;
    color: $global__color--white;
  }

  &.snack-bar--error {
    background-color: $global__color--red;
    color: $global__color--white;
  }

  @keyframes fadeIn {
    0% { opacity: 0; }
    10% { opacity: 0; }
    20% { opacity: 0.25; }
    30% { opacity: 0.5; }
    40% { opacity: 0.75; }
    50% { opacity: 1; }
    100% { opacity: 1; }
  }
  @keyframes fadeOut {
    85% { opacity: 1; }
    90% { opacity: 0.5; }
    93% { opacity: 0.25; }
    96% { opacity: 0.1; }
    100% { opacity: 0; }
  }

  .snack-bar__content {
    font-family: $global__font-family;
    font-weight: 600;
    text-align: left;
  }
}
</style>

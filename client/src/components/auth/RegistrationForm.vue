<template>
  <div class="registration-form">
    <div class="registration-form__container">
      <tr-input
        v-model="credentials.name"
        class="registration-form__input"
        placeholder="e.g. Jhon Doe"
        label="Full name"
      />
      <tr-input
        v-model="credentials.email"
        class="registration-form__input"
        placeholder="e.g. jhon_doe@gmail.com"
        label="E-mail"
      />
      <tr-input
        v-model="credentials.password"
        class="registration-form__input"
        placeholder="e.g. 1A-********"
        type="password"
        label="Password"
      />
      <tr-button
        theme="dark"
        class="registration-form__submit"
        @click="login"
      >
        Sign up
        <material-icon
          icon="login"
          class="registration-form__submit-icon"
        />
      </tr-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import MaterialIcon from '@/components/utils/MaterialIcon.vue'
import TrButton from '@/components/utils/TrButton.vue'
import TrInput from '@/components/utils/TrInput.vue'

@Component({
  components: {
    TrInput,
    TrButton,
    MaterialIcon
  }
})
export default class RegistrationForm extends Vue {
  credentials = {
    name: null,
    email: null,
    password: null
  }

  login (): void {
    this.$store.dispatch('auth/registration', this.credentials).then((res) => {
      if (res.status === 200) {
        this.$router.push({ name: 'projectList' })
      } else {
        console.log('ERRORS: ', res.data.errors)
      }
    })
  }
}
</script>

<style lang="scss">
.registration-form {
  min-height: 100vw;
  margin-top: rem(50);
  text-align: center;

  .registration-form__container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: rem(300);
    margin: 0 auto;
    padding: rem(20);
    border-radius: rem(6);
    background-color: $global__color--grey;
  }

  .registration-form__input {
    width: 100%;
  }

  .registration-form__submit {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: rem(10);
    text-align: center;

    .registration-form__submit-icon {
      margin-left: rem(5);
    }
  }
}
</style>

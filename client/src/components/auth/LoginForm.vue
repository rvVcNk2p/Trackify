<template>
  <div class="login-form">
    <div class="login-form__container">
      <tr-input
        v-model="credentials.email"
        class="login-form__input"
        placeholder="e.g. jhon_doe@gmail.com"
        label="E-mail"
      />
      <tr-input
        v-model="credentials.password"
        class="login-form__input"
        placeholder="********"
        type="password"
        label="Password"
      />
      <tr-button
        theme="dark"
        class="login-form__submit"
        @click="login"
      >
        Login
        <material-icon
          icon="login"
          class="login-form__submit-icon"
        />
      </tr-button>
      <span class="login-form__advice">*Who enters here, abandon all hope</span>
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
export default class LoginForm extends Vue {
  credentials = {
    email: null,
    password: null
  }

  login (): void {
    this.$store.dispatch('auth/login', this.credentials).then((res) => {
      if (res.status === 200) {
        this.$router.push({ name: 'projectList' })
        this.$store.dispatch('notification/createNotification', {
          message: `Welcome ${res.data.user.name}, you are now logged in!`,
          type: 'success'
        })
      } else {
        // TODO - FOR cycle
        this.$store.dispatch('notification/createNotification', {
          message: res.data.errors[0].msg,
          type: 'error'
        })
      }
    })
  }
}
</script>

<style lang="scss">
.login-form {
  min-height: 100vw;
  margin-top: rem(50);
  text-align: center;

  .login-form__container {
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

  .login-form__input {
    width: 100%;
  }

  .login-form__submit {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: rem(10);
    text-align: center;

    .login-form__submit-icon {
      margin-left: rem(5);
    }
  }

  .login-form__advice {
    width: 100%;
    margin-top: rem(1);
    color: $global__color--grey_800;
    font-size: rem(4);
    text-align: right;
  }
}
</style>

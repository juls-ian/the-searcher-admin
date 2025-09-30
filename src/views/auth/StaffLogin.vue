<script setup>
import AuthLayout from '@/layouts/AuthLayout.vue'
import { Form, Field } from 'vee-validate'
</script>

<template>
  <AuthLayout>
    <header></header>
    <div class="login">
      <main class="login__card">
        <div class="login__card-left">
          <img src="@/assets/illustrations/i-login.svg" alt="Man logging in " />
        </div>
        <div class="login__card-right">
          <Form class="login__form form">
            <div class="login__row row">
              <div class="login__field-group form__field-group">
                <Field name="email">
                  <input type="text" placeholder="Email or staff id" required />
                </Field>
              </div>
            </div>

            <div class="login__row row">
              <div class="login__field-group form__field-group">
                <Field name="password">
                  <input type="password" placeholder="Password" required />
                </Field>
              </div>
            </div>
          </Form>

          <div class="login__btn-group">
            <button type="submit" class="login__btn btn btn--login">
              <span class="btn__text">Login</span>
            </button>
            <RouterLink class="login__recover-btn" to="forgot-password">Forgot Password</RouterLink>
          </div>
        </div>
      </main>
    </div>
  </AuthLayout>
</template>

<style lang="scss" scoped>
@use '@/assets/utils' as *;

.login {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-image: url('@/assets/photos/backgrounds/pup-pylon.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  &__card {
    width: 100%;
    height: 45rem;
    margin: 2rem;
    padding: 1rem 1rem;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    background-color: $surface-soft;
    flex-direction: column;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    overflow: hidden; // prevent children from overflowing

    @include respond-to-mf(sm) {
      // Avoid fixed height unless design requires strict alignment
      min-height: 50rem;
    }

    @include respond-to-mf(md) {
      min-height: 55rem;
    }

    @include respond-to-mf(tablet-sm) {
      min-height: 55rem;
    }

    @include respond-to-mf(desktop-sm) {
      width: 70%;
      flex-direction: row;
      margin: 5rem 10rem;
      min-height: 55%;

      // Line divider
      &::before {
        content: '';
        position: absolute;
        width: 1px;
        background: $primary-base;
        top: spacing(32);
        bottom: spacing(32);
        left: 50%; // center horizontally at left edge
        transform: translateX(-50%); // center 50% left of own width

        @include respond-to-mf(desktop-sm) {
          left: 45%;
          transform: translateX(-45%);
        }

        // @include respond-to-mf(tablet-lg) {
        //   left: 45%;
        //   transform: translateX(-45%);
        // }
      }
    }

    &-left {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 1;

      @include respond-to-mf(desktop-sm) {
        width: 60%;
        margin-left: spacing(-32);
      }

      img {
        width: 100%;
        height: auto;
        max-width: 40%;
        padding-bottom: spacing(5);

        @include respond-to-mf(tablet-sm) {
          width: auto; // shrink naturally
          max-width: 25%;
          height: auto;
        }

        @include respond-to-mf(tablet-lg) {
          width: auto; // shrink naturally
          max-width: 25%;
          height: auto;
          max-height: 45rem;
        }

        @include respond-to-mf(desktop-sm) {
          width: auto;
          max-width: 55%;
          height: auto;
          max-height: 70rem;
          padding-right: spacing(7);
        }
      }
    }

    &-right {
    }
  }

  &__btn-group {
    margin-top: spacing(7);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: spacing(3);
  }

  &__field-group {
    input {
      width: 30rem;
    }
  }

  &__recover-btn {
    text-decoration: none;
    color: $primary-muted;
    font-size: $font-size-xs;
    font-family: $pop;
  }
}
</style>

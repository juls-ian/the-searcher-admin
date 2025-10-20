<script setup>
import AuthLayout from '@/layouts/AuthLayout.vue'
import { Form, Field } from 'vee-validate'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import * as yup from 'yup'
import YupPassword from 'yup-password'
import Preloader from '@/components/ui/Preloader.vue'
YupPassword(yup)

const router = useRouter()
const authStore = useAuthStore()

const loginSchema = computed(() => {
  return yup.object({
    'email-or-staff-id': yup
      .string()
      .required('Email or Staff ID is required')
      .test('email-or-staff-id', 'Must be a valid email or staff id', (value) => {
        if (!value) return false

        // Check 1: staff id pattern: VAL-2025-J-0001
        const staffIdPattern = /^[A-Z]{3}-\d{4}-[A-Z]-\d{4}$/
        if (staffIdPattern.test(value)) {
          return true
        }

        // Check 2: valid email + allowed domain
        const emailPattern = /^[^\s@]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)+$/
        if (emailPattern.test(value)) {
          const domain = value.split('@')[1] // split after @
          const allowedDomains = ['iskolarngbayan.pup.edu.ph']
          return allowedDomains.includes(domain)
        }

        return false // fallback
      }),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    // .minUppercase(1, 'Password must contain at least one uppercase')
    // .minLowercase(1, 'Password must contain at least one lowercase')
    // .minSymbols('1', 'Password must contain at least one special character'),
  })
})

const form = ref({
  emailOrId: '',
  password: '',
})

const handleLogin = async () => {
  try {
    const result = await authStore.login(form.value)

    if (result.success) {
      // fetch full user data before navigation
      await authStore.fetchUser()

      router.push({ name: 'home' }) // redirect to home if login successful
    }
  } catch (error) {
    // Error already stored in authStore.error
    console.error('Login Failed', error)
  }
}
</script>

<template>
  <AuthLayout>
    <Preloader v-if="authStore.loading" />
    <div class="login">
      <main class="login__card">
        <div class="login__card-left">
          <img src="@/assets/illustrations/login.svg" alt="Man logging in " />
        </div>
        <div class="login__card-right">
          <Form @submit="handleLogin" class="login__form form" :validation-schema="loginSchema">
            <div class="login__row row">
              <div class="login__field-group form__field-group">
                <Field
                  name="email-or-staff-id"
                  v-slot="{ field, errors, errorMessage }"
                  :validate-on-blur="true"
                  :validate-on-input="false"
                >
                  <input
                    type="text"
                    v-model="form.emailOrId"
                    v-bind="field"
                    placeholder="Email or staff id"
                    required
                  />

                  <div class="login__alert form__input-alert" v-if="errors.length !== 0">
                    <p>
                      {{ errorMessage || '&nbsp;' /*reserve space so nothing shifts */ }}
                    </p>
                  </div>
                </Field>
              </div>
            </div>

            <div class="login__row row">
              <div class="login__field-group form__field-group">
                <Field
                  name="password"
                  v-model="form.password"
                  v-slot="{ field, errors, errorMessage }"
                  :validate-on-blur="true"
                  :validate-on-input="false"
                >
                  <input type="password" v-bind="field" placeholder="Password" required />
                  <div class="login__alert form__input-alert" v-if="errors.length !== 0">
                    <p>
                      {{ errorMessage || '&nbsp;' }}
                    </p>
                  </div>
                </Field>
              </div>
            </div>

            <div class="login__btn-group">
              <button type="submit" :disabled="authStore.loading" class="login__btn btn btn--login">
                <span class="btn__text">
                  {{ authStore.loading ? 'Logging in...' : 'Login' }}
                </span>
              </button>
              <RouterLink class="login__recover-btn" to="forgot-password"
                >Forgot Password</RouterLink
              >
            </div>
          </Form>
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
    height: 50rem;
    margin: 2rem;
    padding: 1rem 1rem;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    background-color: $surface-light;
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

        @include respond-to-mf(desktop-md) {
          left: 50%;
          transform: translateX(-50%);
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
        max-width: 45%;
        padding-bottom: spacing(5);

        @include respond-to-mf(xs) {
          width: auto;
          height: auto;
        }

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

  &__field-group {
    input {
      width: 30rem;
    }
  }

  &__btn-group {
    margin-top: spacing(3);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: spacing(3);
  }

  &__recover-btn {
    text-decoration: none;
    color: $primary-muted;
    font-size: $font-size-xs;
    font-family: $pop;
  }
}
</style>

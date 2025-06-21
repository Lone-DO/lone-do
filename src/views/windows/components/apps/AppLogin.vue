<script setup lang="ts">
/** Stores */
import { useWindowStore } from '@/stores/windows'
const windowStore = useWindowStore()
/** Components */
import WindowsApplication from './AppMain.vue'
import WindowsAction from '@/views/windows/components/WindowsActionButton.vue'
import WindowsButton from '@/views/windows/components/WindowsButton.vue'
</script>

<template>
  <WindowsApplication id="windows-login" title="Welcome to Windows" :required="true">
    <template #actions>
      <WindowsAction tooltip="lipsum" :styles="{ cursor: 'help' }">?</WindowsAction>
    </template>
    <template #prefix>
      <img src="/images/windows/windows-logo-1995-security.svg" alt="" srcset="" />
    </template>
    <form @submit.prevent="windowStore.login">
      <div>
        <span id="windows-login_description">Type a user name and password to log on to Windows.</span>
        <fieldset>
          <label for="windows-login_name">User name:</label>
          <input type="text" id="username" name="username" minLength="3" required v-model="windowStore.user.name" />
        </fieldset>
        <fieldset>
          <label for="windows-login_password">Password:</label>
          <input type="password" id="password" name="password" minLength="4" required />
        </fieldset>
      </div>
      <div>
        <WindowsButton type="submit">OK</WindowsButton>
        <WindowsButton type="reset">Cancel</WindowsButton>
      </div>
    </form>
  </WindowsApplication>
</template>

<style lang="scss" scoped>
#windows-login {
  &_icon {
    width: 250px;
  }

  &_description {
    margin-bottom: 1rem;
  }

  aside {
    @include FlexBox {
      justify-content: center;
    }

    padding: 0 1rem;

    img {
      width: 75px;
    }
  }

  form {
    @include FlexBox(1rem, flex-start) {
      flex: 1;
      justify-content: space-between;
    }

    & > div:first-child {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    & > div:last-child {
      gap: 1rem;
      display: flex;
      padding-right: 1rem;
      flex-direction: column;
    }

    label {
      width: 160px;
      display: block;
      white-space: nowrap;

      &::first-letter {
        text-decoration: underline;
      }
    }
  }

  fieldset {
    gap: 1rem;
    border: none;
    display: flex;
    padding-left: 0;
  }
}
</style>

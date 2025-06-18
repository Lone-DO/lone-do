<script setup lang="ts">
import { useWindowStore } from '@/stores/windows';
import WindowsApplication from './WindowsApplication.vue';
import WindowsAction from './components/WindowsAction.vue'
import WindowsButton from './components/WindowsButton.vue';
const windowStore = useWindowStore()
</script>

<template>
  <WindowsApplication id='windows-login' title='Welcome to Windows' :required='true'>
    <template #actions>
      <WindowsAction tooltip='lipsum' :styles='{ cursor: "help" }'>?</WindowsAction>
    </template>
    <template #prefix>
      <img src="/images/windows/windows-logo-1995-security.svg" alt="" srcset="">
    </template>
    <form @submit.prevent='windowStore.login'>
      <div>
        <span id='windows-login_description'>Type a user name and password to log on to Windows.</span>
        <fieldset>
          <label for='windows-login_name'><u>U</u>ser name:</label>
          <input id='windows-login_name' required v-model='windowStore.user.name' />
        </fieldset>
        <fieldset>
          <label for='windows-login_password'><u>P</u>assword:</label>
          <input id='windows-login_password' required />
        </fieldset>
      </div>
      <div>
        <WindowsButton type='submit'>OK</WindowsButton>
        <WindowsButton type='reset'>Cancel</WindowsButton>
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
    @include FlexBox(1rem, center) {
      justify-content: center;
    }

    padding: 0 1rem;

    img {
      width: 75px
    }
  }

  form {
    @include FlexBox(1rem, flex-start);
    flex: 1;
    justify-content: space-between;

    &>div:first-child {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    &>div:last-child {
      padding-right: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    label {
      display: block;
      white-space: nowrap;
      width: 160px;
    }
  }

  fieldset {
    border: none;
    padding-left: 0;
    display: flex;
    gap: 1rem;
  }
}
</style>
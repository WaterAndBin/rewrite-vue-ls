<script setup lang="ts">
  import { getStorage, setStorage } from './utils/rewrite';

  const set = () => {
    // console.log(window.webStorage);
    // console.log(window.webStorage.set);
    window.webStorage.set('webStorage', 54545);
  };

  const set2 = () => {
    setStorage('Storage', 'asdasd');
  };

  const get = () => {
    // console.log(window.webStorage.get);
    const res = window.webStorage.get('Storage');
    console.log(res);
  };

  const get2 = () => {
    const res = getStorage('webStorage');
    console.log(res);
  };
</script>

<template>
  <header>
    <div class="wrapper">
      <div>hallo,world</div>
      <button @click="set">set</button>
      <button @click="set2">setStorage</button>
      <button @click="get">get</button>
      <button @click="get2">getStorage</button>
    </div>
  </header>
</template>

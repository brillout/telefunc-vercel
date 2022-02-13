<template>
  <button type="button" @click="onclick">Hello</button>
</template>

<script setup>
import { hello } from "./Hello.telefunc";
const onclick = async () => {
  const msg = await hello("Elisabeth");
  alert(msg);
};
</script>

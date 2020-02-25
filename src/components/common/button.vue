<template>
  <button type="button" class="button" @click="$emit('click', $event)">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
@import url(../../styles/variables.scss);

.button {
  border: none;
  background-color: $grey;
  color: $grey-light;
  font-weight: bold;
  cursor: pointer;
  text-transform: uppercase;
}
</style>

<template>
  <div id="root" class="app">
    <router-view />
  </div>
</template>

<style lang="scss">
/* GLOBAL STYLE */
@import url(../styles/variables.scss);

html,
body {
  padding: 0;
  margin: 0;
  min-height: 100vh;
  font-size: 16px;
  box-sizing: border-box;
  font-family: sans-serif;
  background-color: $grey-darker;
  color: $grey;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}
</style>

<style scoped lang="scss">
@import url(../styles/variables.scss);

.app {
  font-size: 1rem;
}
</style>

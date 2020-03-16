<template>
  <h1 class="title">
    <router-link :to="{ name: 'manager' }" class="link">
      <span>Markdown<em>slides</em></span>
    </router-link>
    <slot />
  </h1>
</template>

<style scoped lang="scss">
@import url(../../styles/variables.scss);

.title {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  padding: 0;

  .link {
    font-size: 1rem;
    color: $grey-lighter;
    text-decoration: none;
    font-weight: bold;
    text-transform: uppercase;

    em {
      color: $grey-light;
      font-weight: normal;
      font-style: normal;
    }
  }
}
</style>

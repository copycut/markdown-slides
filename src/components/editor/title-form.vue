<template>
  <section class="form">
    <input
      class="form__input"
      id="slide_title"
      type="text"
      :value="slide && slide.title"
      @change="update($event.target.value)"
      autofocus
    />
  </section>
</template>

<script>
export default {
  props: ['slide'],
  methods: {
    update(title) {
      const { id } = this.slide
      this.$store.dispatch('rename', { id, title })
    },
  },
}
</script>

<style scoped lang="scss">
@import url(../../styles/variables.scss);

.form {
  display: flex;
  flex-flow: row nowrap;
}

.form__input {
  border: none;
  padding: 0.5rem;
  font-size: 1.5rem;
  font-family: sans-serif;
  color: $grey-lighter;
  flex-grow: 1;
  background: transparent;

  &:focus {
    outline: none;
  }
}
</style>

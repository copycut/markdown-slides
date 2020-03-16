<template>
  <nav :class="{ navigator: true, active: isActive }">
    <button type="button" class="arrow arrow--back" @click="goBack" />
    <button type="button" class="arrow arrow--next" @click="goNext" />
  </nav>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      isActive: false,
    }
  },
  mounted() {
    window.addEventListener('keyup', this.control)
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.control)
  },
  methods: {
    timer() {
      this.isActive = true
      setTimeout(() => (this.isActive = false), 1500)
    },
    goBack() {
      this.timer()
      this.$store.dispatch('previousSlide', this.$props.id)
    },
    goNext() {
      this.timer()
      this.$store.dispatch('nextSlide', this.$props.id)
    },
    control({ key }) {
      if (key === 'ArrowRight') {
        this.goNext()
      }

      if (key === 'ArrowLeft') {
        this.goBack()
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import url(../../styles/variables.scss);

.navigator {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  flex-flow: row nowrap;
  opacity: 0;
  transition: opacity 300ms ease;

  &.active {
    opacity: 0.3;
  }

  &:hover,
  &:focus-within {
    opacity: 1;
  }
}

.arrow {
  position: relative;
  padding: 0;
  border: 0;
  height: 3rem;
  width: 3rem;
  background-color: $grey-darker;
  border-radius: 0.5rem;
  margin: 0 0.5rem;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1rem solid transparent;
  }

  &.arrow--back::after {
    border-right-color: $grey-lighter;
    transform: translate(-75%, -50%);
  }

  &.arrow--next::after {
    border-left-color: $grey-lighter;
    transform: translate(-25%, -50%);
  }
}
</style>

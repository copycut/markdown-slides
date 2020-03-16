<template>
  <div
    :class="{
      item: true,
      active: isSelected,
    }"
    @click="select(slide.id)"
  >
    <span class="slideTitle">{{ slide && slide.title }}</span>
    <Button
      class="remove"
      title="Remove this slide"
      v-if="isNotLastSlide"
      @click.stop="toggleRemove(slide.id)"
    />
    <ConfirmMessage
      message="Are you sure to delete this slide?"
      :confirm="pendingDeleteId === slide.id"
      @confirm="remove(slide.id)"
      @cancel="toggleRemove(null)"
    />
  </div>
</template>

<script>
import Button from '../common/button.vue'
import ConfirmMessage from '../common/confirm-message.vue'

export default {
  data() {
    return {
      pendingDeleteId: null,
    }
  },
  components: { Button, ConfirmMessage },
  props: ['slide', 'isNotLastSlide', 'selectedSlideId'],
  computed: {
    isSelected() {
      return this.$props.selectedSlideId === this.$props.slide.id
    },
  },
  methods: {
    toggleRemove(id) {
      if (this.pendingDeleteId === id) {
        return
      }

      this.pendingDeleteId = id
    },
    remove(id) {
      this.$store.dispatch('removeSlide', id)
    },
    select(id) {
      this.$store.dispatch('selectSlide', id)
    },
  },
}
</script>

<style scoped lang="scss">
@import url(../../styles/variables.scss);

.item {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  cursor: pointer;
  transition: background-color 300ms ease-in-out;
  user-select: none;
  color: $grey-light;
  background-color: $black;

  &:hover,
  &:focus,
  &:active {
    background-color: color-mod($purple alpha(50%));

    .remove {
      pointer-events: all;
      opacity: 1;
    }
  }

  &.active {
    background-color: $purple;
    color: $white;

    &:hover,
    &:focus,
    &:active {
      background-color: color-mod($purple whiteness(30%));
    }
  }

  .slideTitle {
    flex-grow: 1;
  }

  .remove {
    flex-shrink: 0;
    border-radius: 40px;
    min-width: 20px;
    height: 20px;
    font-weight: bold;
    line-height: 20px;
    position: relative;
    pointer-events: none;
    opacity: 0;
    transition: opacity 300ms ease-in-out;

    &::after {
      content: ' ';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 10px;
      height: 2px;
      border-radius: 2px;
      background-color: $white;
      transform: translate(-50%, -50%);
      transition: background-color 300ms ease;
    }

    &:hover,
    &:active,
    &:focus {
      background-color: $purple-dark;
    }
  }
}
</style>

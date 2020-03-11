<template>
  <div
    :class="{
      item: true,
      active: isSelected(slide && slide.id),
    }"
    @click="select(slide.id)"
  >
    <span class="slideTitle">{{ slide && slide.title }}</span>
    <Button
      class="button remove"
      title="Remove this slide"
      v-if="isNotLastSlide"
      @click.stop="toggleRemove(slide.id)"
    />
    <span
      :class="{
        confirm: true,
        active: pendingDeleteId === slide.id,
      }"
    >
      <span class="message">Are you sure to delete this slide?</span>
      <Button class="button delete" @click.stop="remove(slide.id)">Ok</Button>
      <Button class="button cancel" @click.stop="toggleRemove(null)">X</Button>
    </span>
  </div>
</template>

<script>
import Button from '../common/button.vue'

export default {
  data: function() {
    return {
      pendingDeleteId: null,
    }
  },
  components: { Button },
  props: ['slide', 'selectedSlide'],
  computed: {
    isNotLastSlide() {
      return this.$store.getters.slides.length > 1
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
      this.$store.dispatch('remove', id)
    },
    select(id) {
      this.$store.dispatch('select', id)
    },
    isSelected(id) {
      return this.selectedSlide && this.selectedSlide.id === id
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

  .confirm {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    transform: translateX(100%);
    background-color: $red-dark;
    color: $white;
    transition: transform 300ms ease-in-out;
    padding: 1rem;

    &.active {
      transform: translateX(0);
    }
  }

  .button {
    flex-shrink: 0;
    border-radius: 40px;
    min-width: 20px;
    height: 20px;
    font-weight: bold;
    line-height: 20px;
  }

  .delete {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .cancel {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: 1px solid $red-dark;
  }

  .delete,
  .cancel {
    color: $white;
    background-color: $red;
  }

  .remove {
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

<template>
  <aside class="sidebar">
    <h1 class="title">
      <span>Markdown<em>slides</em></span>
      <Button class="add" title="Add Slide" @click="newSlide" />
    </h1>

    <div class="list">
      <draggable v-model="sortedList">
        <SidebarItem
          v-for="slide in slides"
          :key="slide.id"
          :slide="slide"
          :selectedSlide="selectedSlide"
        />
      </draggable>
    </div>
    <Button class="presentation" @click="present">Presentation mode</Button>
  </aside>
</template>

<script>
import draggable from 'vuedraggable'
import { PRESENTATION } from '../../constants/presentation-modes'
import SidebarItem from './sidebar-item.vue'
import Button from '../common/button.vue'

export default {
  components: { Button, SidebarItem, draggable },
  computed: {
    sortedList: {
      get() {
        return this.$store.getters.slides
      },
      set(slides) {
        this.$store.dispatch('updateSlides', slides)
      },
    },
    slides() {
      return this.$store.getters.slides
    },
    selectedSlide() {
      return this.$store.getters.selectedSlide
    },
    isNotLastSlide() {
      return this.$store.getters.slides.length > 1
    },
  },
  methods: {
    select(id) {
      this.$store.dispatch('select', id)
    },
    newSlide() {
      this.$store.dispatch('create')
    },
    present() {
      this.$store.dispatch('switchMode', PRESENTATION)
    },
  },
}
</script>

<style scoped lang="scss">
@import url(../../styles/variables.scss);

.sidebar {
  display: flex;
  flex-flow: column nowrap;
  width: 16rem;
  padding: 1rem;
  height: 100vh;
  background-color: $grey-darker;

  .title {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    font-size: 1rem;
    font-weight: bold;
    text-transform: uppercase;
    margin: 0;
    padding: 0 0 1rem;
    color: $grey-lighter;

    em {
      color: $grey-light;
      font-weight: normal;
      font-style: normal;
    }
  }

  .list {
    padding: 0;
    margin: 0;
    flex-grow: 1;
    overflow-y: auto;
  }

  .add {
    position: relative;
    border-radius: 40px;
    min-width: 20px;
    height: 20px;
    font-weight: bold;
    line-height: 20px;

    &::after,
    &::before {
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

    &::after {
      transform: translate(-50%, -50%) rotate(90deg);
    }

    &:hover,
    &:active,
    &:focus {
      background-color: $purple-dark;
    }
  }

  .presentation {
    padding: 0.5rem;
    color: $white;
    background-color: $purple-dark;
    box-shadow: 0 0 8px color-mod($grey-darker alpha(50%));
  }
}
</style>

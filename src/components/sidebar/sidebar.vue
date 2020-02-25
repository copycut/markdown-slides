<template>
  <aside class="sidebar">
    <h1 class="title">
      Slides
      <Button class="add" title="Add Slide" @click="newSlide">+</Button>
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
  color: $grey-light;

  .title {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    font-size: 0.75rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.25rem;
    margin: 0;
    padding: 0 0 1rem;
  }

  .list {
    padding: 0;
    margin: 0;
    flex-grow: 1;
  }

  .add {
    border-radius: 40px;
    min-width: 20px;
    height: 20px;
    font-weight: bold;
    line-height: 20px;
  }

  .presentation {
    padding: 0.5rem;
    color: $white;
    background-color: $green-dark;
  }
}
</style>

<template>
  <aside class="sidebar">
    <Title>
      <Button class="add" title="Add Slide" @click="newSlide" />
    </Title>

    <div class="presentation-config">
      <input
        class="presentation-title"
        type="text"
        v-model="presentationTitle"
      />
    </div>

    <div class="list">
      <div v-if="isNoSlide" class="no-slides">
        <span>There is no slides yet.</span>
        <Button class="create" @click="newSlide">Create one</Button>
      </div>
      <draggable v-model="sortedList">
        <SidebarItem
          v-for="slide in slides"
          :key="slide.id"
          :slide="slide"
          :selectedSlideId="selectedSlideId"
          :isNotLastSlide="isNotLastSlide"
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
import Title from '../common/title.vue'
import Button from '../common/button.vue'

export default {
  components: { Button, Title, SidebarItem, draggable },
  props: ['presentation'],
  computed: {
    presentationTitle: {
      get() {
        return this.$props.presentation.title
      },
      set(title) {
        const id = this.$props.presentation.id
        this.$store.dispatch('updatePresentation', { id, title })
      },
    },
    sortedList: {
      get() {
        if (!this.$props.presentation) {
          return []
        }
        return this.$props.presentation.slides
      },
      set(slides) {
        this.$store.dispatch('updateSlides', slides)
      },
    },
    isNoSlide() {
      return this.$props.presentation.slides.length === 0
    },
    isNotLastSlide() {
      return this.$props.presentation.slides.length > 1
    },
    slides() {
      return this.$props.presentation.slides || []
    },
    selectedSlideId() {
      return this.$store.getters.getselectedSlideId
    },
  },
  methods: {
    select(id) {
      this.$store.dispatch('select', id)
    },
    newSlide() {
      this.$store.dispatch('addSlide')
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

  .list {
    padding: 0;
    margin: 0;
    flex-grow: 1;
    overflow-y: auto;
  }

  .no-slides {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    height: 100%;
  }

  .create {
    border-radius: 20px;
    font-weight: bold;
    white-space: nowrap;
    padding: 8px 16px;
    flex-shrink: 0;
    margin-top: 1rem;
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

  .presentation-config {
    padding: 8px 0;

    .presentation-title {
      width: 100%;
      background: none;
      border: 0;
      font-size: 1rem;
      color: $grey;
      padding: 4px 0;

      &:focus,
      &:hover {
        background-color: $black;
        color: $grey-lighter;
      }
    }
  }
}
</style>

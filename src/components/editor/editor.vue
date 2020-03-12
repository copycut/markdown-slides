<template>
  <div class="editor">
    <div class="editor__header">
      <TitleForm :slide="selectedSlide" />
    </div>
    <div class="editor__wrapper">
      <textarea
        class="editor__input"
        :value="content"
        @input="update"
      ></textarea>
      <Preview :content="content" />
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import TitleForm from './title-form.vue'
import Preview from './preview.vue'

export default {
  components: { TitleForm, Preview },
  computed: {
    selectedSlide() {
      return this.$store.getters.selectedSlide
    },
    content() {
      if (!this.selectedSlide) {
        return ''
      }

      return this.selectedSlide.content
    },
  },
  methods: {
    update: debounce(function(event) {
      this.$store.dispatch('update', {
        id: this.selectedSlide.id,
        content: event.target.value,
      })
    }, 300),
  },
}
</script>

<style scoped lang="scss">
@import url(../../styles/variables.scss);

.editor {
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 1;
  width: 16rem;
  height: 100vh;
  background-color: $black;
}

.editor__header {
  padding: 1rem;
}

.editor__wrapper {
  display: flex;
  flex-flow: row nowrap;
  flex-grow: 1;
  overflow: hidden;
}

.editor__input {
  color: $grey-lighter;
  width: 50%;
  resize: none;
  border: none;
  background-color: $black;
  color: $white;
  font-family: 'Courier New', Courier, monospace;
  padding: 1rem;
  overflow-y: auto;
  overflow-x: hidden;

  &:focus {
    outline: none;
  }
}
</style>

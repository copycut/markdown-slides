<template>
  <div class="preview" v-html="compiledMarkdown" v-resize-text></div>
</template>

<script>
import marked from 'marked'
import ResizeText from 'vue-resize-text'

export default {
  directives: {
    ResizeText,
  },
  props: {
    content: {
      type: String,
      default: () => '',
    },
  },
  computed: {
    compiledMarkdown: function() {
      return marked(this.content)
    },
  },
}
</script>

<style scoped lang="scss">
@import url(../../styles/variables.scss);

.preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  padding: 1rem;
  font-family: 'Lato', sans-serif;
  background-color: $white;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>

<style lang="scss">
.preview {
  @import url('../../styles/slides-styles.scss');
}
</style>

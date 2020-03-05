<template>
  <div class="slides" @mousemove="updateCoordinates">
    <Options :show="showOption" />
    <div class="slide" v-html="compiledMarkdown" v-resize-text></div>
    <Navigator @back="goBack" @next="goNext" />
  </div>
</template>

<script>
import marked from 'marked'
import Options from './options.vue'
import Navigator from './navigator.vue'
import ResizeText from 'vue-resize-text'

export default {
  components: { Options, Navigator },
  directives: {
    ResizeText,
  },
  data() {
    return { y: 0 }
  },
  mounted() {
    window.addEventListener('keyup', this.control)
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.control)
  },
  computed: {
    showOption() {
      return this.y <= 50
    },
    getCurrentSlide() {
      return this.$store.getters.selectedSlide
    },
    compiledMarkdown: function() {
      const content = this.getCurrentSlide.content || ''
      return marked(content)
    },
  },
  methods: {
    updateCoordinates(event) {
      this.y = event.clientY
    },
    goBack() {
      this.$store.dispatch('previousSlide', this.getCurrentSlide.id)
    },
    goNext() {
      this.$store.dispatch('nextSlide', this.getCurrentSlide.id)
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
.slides,
.slide {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
}

.slide {
  padding: 1rem;
  font-family: 'Lato', sans-serif;
}
</style>

<style lang="scss">
.slide {
  @import url('../../styles/slides-styles.scss');
}
</style>

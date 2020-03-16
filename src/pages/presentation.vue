<template>
  <div>
    <section v-if="isPresentationMode" class="present">
      <Slides />
    </section>
    <section v-if="!isPresentationMode" class="edition">
      <Sidebar :presentation="presentation" />
      <Editor />
    </section>
  </div>
</template>

<script>
import { PRESENTATION } from '../constants/presentation-modes'
import Slides from '../components/slides/slides.vue'
import Editor from '../components/editor/editor.vue'
import Sidebar from '../components/sidebar/sidebar.vue'

export default {
  components: { Sidebar, Editor, Slides },
  created() {
    const presentation = this.$store.getters.getPresentationById(
      this.$route.params.id,
    )
    if (!presentation) {
      this.$router.push('/manager')
    }
  },
  computed: {
    isPresentationMode() {
      return this.$store.getters.getMode === PRESENTATION
    },
    presentation() {
      return this.$store.getters.getPresentationById(this.$route.params.id)
    },
  },
}
</script>

<style scoped lang="scss">
@import url(../styles/variables.scss);

.present {
  background-color: $white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.edition {
  background-color: $grey-lighter;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: 100vh;
}
</style>

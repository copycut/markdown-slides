<template>
  <section class="manager">
    <header class="header">
      <Title />
    </header>
    <main class="main">
      <button type="button" class="create-presentation" @click="createNew">
        Add new
      </button>
      <router-link
        class="presentation"
        v-for="presentation in presentations"
        :key="presentation.id"
        :to="{ name: 'presentation', params: { id: presentation.id } }"
      >
        {{ presentation.title }}
        <button
          type="button"
          class="remove"
          @click.stop.prevent="toggleRemove(presentation.id)"
        />
        <ConfirmMessage
          class="confirm-message"
          message="Are you sure to delete this presentation?"
          :confirm="pendingDeleteId !== null"
          @confirm="removePresentation(presentation.id)"
          @cancel="toggleRemove(null)"
        />
      </router-link>
    </main>
  </section>
</template>

<script>
import Title from '../components/common/title.vue'
import ConfirmMessage from '../components/common/confirm-message.vue'

export default {
  components: { Title, ConfirmMessage },
  data() {
    return {
      pendingDeleteId: null,
    }
  },
  computed: {
    presentations() {
      return this.$store.getters.getPresentations
    },
  },
  methods: {
    createNew() {
      this.$store.dispatch('addPresentation')
      const id = this.$store.getters.getSelectedPresentationId
      this.$router.push({ name: 'presentation', params: { id } })
    },
    removePresentation(id) {
      this.$store.dispatch('removePresentation', id)
    },
    toggleRemove(id) {
      if (this.pendingDeleteId === id) {
        return
      }

      this.pendingDeleteId = id
    },
  },
}
</script>

<style scoped lang="scss">
@import url(../styles/variables.scss);

.manager {
  display: flex;
  flex-direction: column;

  .header {
    flex-shrink: 0;
    padding: 16px;
    border-bottom: 1px solid $black;
  }

  .main {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 16px;
  }

  .create-presentation,
  .presentation {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 160px;
    width: 160px;
    background-color: $black;
    color: $grey;
    border: 0;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    text-decoration: none;
    margin: 8px;
    overflow: hidden;
    transition: background-color 300 ease;

    &:hover,
    &:focus {
      box-shadow: 0 0 16px color-mod($black alpha(50%));
    }
  }

  .create-presentation {
    background-color: $purple-dark;
    color: $white;
  }

  .presentation {
    &:hover,
    &:focus {
      background-color: $purple-dark;
      color: $white;

      .remove {
        display: block;
      }
    }
  }

  .remove {
    display: none;
    position: absolute;
    top: 8px;
    right: 8px;
    height: 32px;
    width: 32px;
    border-radius: 16px;
    background-color: $red;
    border: 0;
    cursor: pointer;

    &::before,
    &::after {
      content: ' ';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
      background-color: $white;
    }

    &::before {
      width: 16px;
      height: 2px;
    }

    &::after {
      width: 2px;
      height: 16px;
    }
  }

  .confirm-message {
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & >>> button {
      padding: 8px 16px;
      height: auto;
      width: auto;
      margin-top: 1rem;
      font-size: 1rem;
    }
  }
}
</style>

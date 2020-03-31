<template>
  <span :class="{ confirm: true, active: this.confirm }" @click.stop.prevent>
    <span class="message">{{ message }}</span>
    <span class="button-group">
      <Button class="button delete" @click.stop.prevent="$emit('confirm')">{{
        $t('yes')
      }}</Button>
      <Button class="button cancel" @click.stop.prevent="$emit('cancel')">{{
        $t('no')
      }}</Button>
    </span>
  </span>
</template>

<script>
export default {
  props: {
    confirm: {
      type: Boolean,
      default: () => false,
    },
    message: {
      type: String,
    },
  },
}
</script>

<style lang="scss">
@import url(../../styles/variables.scss);

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
  font-size: 1rem;

  &.active {
    transform: translateX(0);
  }

  .button-group {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
  }

  .delete,
  .cancel {
    flex-shrink: 0;
    border-radius: 20px;
    font-weight: bold;
    color: $white;
    background-color: $red;
    border: 0;
    padding: 8px;
    cursor: pointer;
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
}
</style>

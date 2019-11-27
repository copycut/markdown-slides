<template>
	<button type="button" class="button"><slot></slot></button>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
@import url(../style/variables.scss);

.button {
	border: none;
	background-color: $grey;
	color: $grey-light;
	font-weight: bold;
	cursor: pointer;
}
</style>

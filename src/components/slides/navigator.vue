<template>
	<nav class="navigator">
		<button type="button" class="arrow arrow--back" @click="$emit('back')" />
		<button type="button" class="arrow arrow--next" @click="$emit('next')" />
	</nav>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
@import url(../../styles/variables.scss);

.navigator {
	position: fixed;
	bottom: 2rem;
	right: 2rem;
	display: flex;
	flex-flow: row nowrap;
	opacity: 0.3;
	transition: opacity 300ms ease;

	&:hover,
	&:focus-within {
		opacity: 1;
	}
}

.arrow {
	position: relative;
	padding: 0;
	border: 0;
	height: 3rem;
	width: 3rem;
	background-color: $grey-darker;
	border-radius: 0.5rem;
	margin: 0 0.5rem;
	cursor: pointer;

	&::after {
		content: "";
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border: 1rem solid transparent;
	}

	&.arrow--back::after {
		border-right-color: $grey-lighter;
		transform: translate(-75%, -50%);
	}

	&.arrow--next::after {
		border-left-color: $grey-lighter;
		transform: translate(-25%, -50%);
	}
}
</style>

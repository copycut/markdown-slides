<template>
	<section class="form">
		<label class="form__label" for="slide_title">Title</label>
		<input
			class="form__input"
			id="slide_title"
			type="text"
			:value="slide && slide.title"
			@change="update($event.target.value)"
			autofocus
		/>
	</section>
</template>

<script>
export default {
	props: ["slide"],
	methods: {
		update(title) {
			const { id } = this.slide;
			this.$store.dispatch("rename", { id, title });
		}
	}
};
</script>

<style scoped lang="scss">
@import url(../../styles/variables.scss);

.form {
	display: flex;
	flex-flow: row nowrap;
	padding-bottom: 1rem;
}

.form__label {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0.5rem;
	color: $grey-lighter;
	background-color: $grey;
	border-radius: 0.25rem 0 0 0.25rem;
}

.form__input {
	border: 0.1rem solid $grey;
	border-radius: 0 0.25rem 0.25rem 0;
	padding: 0.5rem;
	font-size: 1rem;
	font-family: sans-serif;
	color: $grey-darker;
	flex-grow: 1;

	&:focus {
		outline: none;
		border-color: $purple-dark;
	}
}
</style>

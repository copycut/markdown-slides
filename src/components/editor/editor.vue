<template>
	<div class="editor">
		<div class="editor__header">
			<h1 class="editor__title">Editor</h1>
			<TitleForm :slide="selectedSlide" />
		</div>
		<div class="editor__wrapper">
			<textarea
				class="editor__input"
				:value="selectedSlide && selectedSlide.content"
				@input="update"
			></textarea>
			<Preview :content="selectedSlide.content" />
		</div>
	</div>
</template>

<script>
import debounce from "lodash/debounce";
import TitleForm from "./title-form.vue";
import Preview from "./preview.vue";

export default {
	components: { TitleForm, Preview },
	computed: {
		selectedSlide() {
			return this.$store.getters.selectedSlide;
		}
	},
	methods: {
		update: debounce(function(event) {
			this.$store.dispatch("update", {
				id: this.selectedSlide.id,
				content: event.target.value
			});
		}, 300)
	}
};
</script>

<style scoped lang="scss">
@import url(../../styles/variables.scss);

.editor {
	display: flex;
	flex-flow: column nowrap;
	flex-grow: 1;
	width: 16rem;
	height: 100vh;
	background-color: $grey-lighter;
	color: $grey-darker;
}

.editor__header {
	padding: 1rem;
}

.editor__title {
	font-size: 0.75rem;
	font-weight: bold;
	text-transform: uppercase;
	letter-spacing: 0.25rem;
	margin: 0;
	padding: 0 0 1rem;
}

.editor__wrapper {
	display: flex;
	flex-flow: row nowrap;
	flex-grow: 1;
	border-top: 1px solid $grey-light;
	overflow: hidden;
}

.editor__input {
	width: 50%;
	resize: none;
	border: none;
	background-color: $grey-lighter;
	font-family: "Courier New", Courier, monospace;
	padding: 1rem;
	overflow-y: auto;
	overflow-x: hidden;

	&:focus {
		outline: none;
		background-color: $grey-lightest;
	}
}
</style>

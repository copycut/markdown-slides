<template>
	<section class="app">
		<Sidebar>
			<Button class="presentation" @click="present">
				Presentation mode
			</Button>
		</Sidebar>
		<Editor />
	</section>
</template>

<script>
import Sidebar from "./sidebar.vue";
import Editor from "./editor/editor.vue";
import Button from "./button.vue";
import { PRESENTATION } from "../constants/presentation-modes";

export default {
	components: { Sidebar, Editor, Button },
	created() {
		if (this.$store.getters.slides.length === 0) {
			this.$store.dispatch("create");
		}
	},
	methods: {
		present() {
			this.$store.dispatch("switchMode", PRESENTATION);
		}
	}
};
</script>

<style>
html,
body {
	padding: 0;
	margin: 0;
	min-height: 100vh;
	font-size: 16px;
	box-sizing: border-box;
}

*,
*:before,
*:after {
	box-sizing: inherit;
}
</style>

<style scoped lang="scss">
@import url(../style/variables.scss);

.app {
	font-family: sans-serif;
	font-size: 1rem;
	color: $grey-darker;
	background-color: $grey-lighter;
	display: flex;
	align-items: flex-start;
	justify-content: center;
	height: 100vh;
}

.main {
	flex-grow: 1;
	padding: 1rem;
}

.button {
	padding: 0.5rem;
	color: $white;
	background-color: $green-dark;
}
</style>

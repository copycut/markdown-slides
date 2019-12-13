<template>
	<div class="app">
		<!-- NEW FEATURE -->
		<Feature name="new-title" :data="$route.query">
			<h1>New feature 🎉</h1>
		</Feature>

		<!-- NEW TIMED FEATURE -->
		<Feature name="timed-feature">
			<h1>This feature is new at this time 🚀</h1>
		</Feature>

		<section v-if="isPresentationMode" class="present">
			<Slides />
		</section>
		<section v-if="!isPresentationMode" class="edition">
			<Sidebar />
			<Editor />
		</section>
	</div>
</template>

<script>
import Feature from "vue-feature-toggle";
import { PRESENTATION } from "../constants/presentation-modes";
import Slides from "./slides/slides.vue";
import Editor from "./editor/editor.vue";
import Sidebar from "./sidebar.vue";

export default {
	components: { Sidebar, Editor, Slides, Feature },
	created() {
		if (this.$store.getters.slides.length === 0) {
			this.$store.dispatch("create");
		}
	},
	computed: {
		isPresentationMode() {
			return this.$store.getters.presentionMode === PRESENTATION;
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
@import url(../styles/variables.scss);

.app {
	font-family: sans-serif;
	font-size: 1rem;
	color: $grey-darker;
}

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

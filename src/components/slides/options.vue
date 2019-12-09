<template>
	<div :class="{ options: true, 'options--visible': show }">
		<Button @click="edition">Back to the editor</Button>
	</div>
</template>

<script>
import { EDITION } from "../../constants/presentation-modes";
import Button from "../button.vue";

export default {
	components: { Button },
	props: ["show"],
	methods: {
		edition() {
			this.$store.dispatch("switchMode", EDITION);
		}
	}
};
</script>

<style scoped lang="scss">
@import url(../../styles/variables.scss);

.options {
	display: flex;
	flex-flow: row nowrap;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	height: 50px;
	transform: translateY(-100%);
	background-color: $black;
	transition: transform 300ms ease;

	&.options--visible {
		transform: translateY(0);
	}
}
</style>

<template>
	<div class="app">
		<Sidebar />
		<div class="main">salut</div>
	</div>
</template>

<script>
import Sidebar from "./sidebar.vue";

export default {
	components: { Sidebar }
};
</script>

<style>
html,
body {
	padding: 0;
	margin: 0;
	min-height: 100vh;
}
</style>

<style scoped lang="scss">
@import url(../style/variables.scss);

.app {
	font-family: sans-serif;
	font-size: 16px;
	color: #2f3542;
	background-color: $grey-lighter;
	display: flex;
	align-items: flex-start;
	justify-content: center;
	height: 100vh;
}

.main {
	flex-grow: 1;
	padding: 16px;
}
</style>

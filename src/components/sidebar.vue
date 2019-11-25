<template>
	<div class="sidebar">
		<form @submit.prevent="submitFolder">
			<input type="text" v-model="newFolder" />
		</form>
		<ul>
			<li v-for="folder in folders" :key="folder.id">
				<span class="folderTitle">{{ folder.title }}</span>
				<button type="button" @click="remove(folder.id)">remove</button>
				<button type="button" @click="rename(folder.id)">update</button>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	data() {
		return {
			newFolder: ""
		};
	},
	computed: {
		folders() {
			return this.$store.getters.folders;
		}
	},
	methods: {
		submitFolder() {
			if (!this.newFolder) {
				return;
			}

			this.$store.dispatch("createFolder", { title: this.newFolder });
			this.$nextTick(function() {
				this.newFolder = "";
			});
		},
		remove(id) {
			this.$store.dispatch("removeFolder", id);
		},
		rename(id) {
			this.$store.dispatch("renameFolder", { id, title: this.newFolder });
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
}
</style>

<style scoped lang="scss">
@import url(../style/variables.scss);

.sidebar {
	width: 12rem;
	padding: 16px;
	height: 100vh;
	background-color: $grey-darker;
}
</style>

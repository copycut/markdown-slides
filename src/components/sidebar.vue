<template>
	<aside class="sidebar">
		<h1 class="sidebar__title">
			Slides
			<Button @click="newSlide">new</Button>
		</h1>
		<ul class="slide-list">
			<li
				v-for="slide in slides"
				:key="slide.id"
				:class="{
					'slide-list__item': true,
					'slide-list__item--active': isSelected(slide && slide.id)
				}"
				@click="select(slide.id)"
			>
				<span class="slide-list__item__title">{{ slide && slide.title }}</span>
				<Button v-if="isNotLastSlide" @click.stop="remove(slide.id)">
					remove
				</Button>
			</li>
		</ul>
		<slot />
	</aside>
</template>

<script>
import Button from "./button.vue";

export default {
	components: { Button },
	computed: {
		slides() {
			return this.$store.getters.slides;
		},
		selectedSlide() {
			return this.$store.getters.selectedSlide;
		},
		isNotLastSlide() {
			return this.$store.getters.slides.length > 1;
		}
	},
	methods: {
		remove(id) {
			this.$store.dispatch("remove", id);
		},
		select(id) {
			this.$store.dispatch("select", id);
		},
		isSelected(id) {
			return this.selectedSlide && this.selectedSlide.id === id;
		},
		newSlide() {
			this.$store.dispatch("create");
		}
	}
};
</script>

<style scoped lang="scss">
@import url(../style/variables.scss);

.sidebar {
	display: flex;
	flex-flow: column nowrap;
	width: 16rem;
	padding: 1rem;
	height: 100vh;
	background-color: $grey-darker;
	color: $grey-light;
}

.sidebar__title {
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	justify-content: space-between;
	font-size: 0.75rem;
	font-weight: bold;
	text-transform: uppercase;
	letter-spacing: 0.25rem;
	margin: 0;
	padding: 0 0 1rem;
}

.slide-list {
	padding: 0;
	margin: 0;
	flex-grow: 1;
}

.slide-list__item {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	align-items: center;
	justify-content: space-between;
	padding: 1rem;
	cursor: pointer;
}

.slide-list__item--active {
	background-color: $purple-dark;
	color: $white;
}

.slide-list__title {
	flex-grow: 1;
}
</style>

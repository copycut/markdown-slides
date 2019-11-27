import Vue from "vue";
import Vuex from "vuex";
import uid from "uid";
import VuexPersist from "vuex-persist";
import { PRESENTATION, EDITION } from "../constants/presentation-modes";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

const presentationMode = [EDITION, PRESENTATION];

const state = {
	newSlide: {
		id: "",
		title: "new slide",
		content: "# New slide"
	},
	slides: [],
	selectedSlide: null,
	prensentionMode: EDITION
};

const getters = {
	slides: state => state.slides,
	selectedSlide: state =>
		state.slides.filter(slide => slide.id === state.selectedSlide)[0] || null
};

const mutations = {
	ADD_SLIDE(state, slide) {
		state.slides.push({ ...state.newSlide, ...slide });
	},
	UPDATE_SLIDE(state, entry) {
		const index = state.slides.findIndex(slide => slide.id === entry.id);

		if (index !== -1) {
			const slide = state.slides[index];
			state.slides.splice(index, 1, { ...slide, ...entry });
		}
	},
	DELETE_SLIDE(state, id) {
		state.slides = state.slides.filter(slide => slide.id !== id);
	},
	SELECT_SLIDE(state, id) {
		if (!id) {
			state.selectedSlide = state.slides[state.slides.length - 1].id;
		}

		if (state.selectedSlide === id) {
			return;
		}

		state.selectedSlide = id;
	},
	SWITCH_MODE(state, mode) {
		if (mode === state.isPrensentionMode) {
			return;
		}

		if (presentationMode.includes(mode)) {
			state.prensentionMode = mode;
		}
	}
};

const actions = {
	create({ commit }) {
		const id = uid();
		commit("ADD_SLIDE", { id });
		commit("SELECT_SLIDE", id);
	},
	rename({ commit }, { title, id }) {
		commit("UPDATE_SLIDE", { id, title });
	},
	update({ commit }, { id, content }) {
		commit("UPDATE_SLIDE", { id, content });
	},
	remove({ commit }, id) {
		commit("DELETE_SLIDE", id);
	},
	select({ commit }, id) {
		commit("SELECT_SLIDE", id);
	},
	selectLatest({ commit }) {
		commit("SELECT_SLIDE");
	},
	switchMode({ commit }, mode) {
		commit("SWITCH_MODE", mode);
	}
};

const vuexPersist = new VuexPersist({
	key: "markdown-slides",
	storage: window.localStorage
});

export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions,
	strict: debug,
	plugins: [vuexPersist.plugin]
});

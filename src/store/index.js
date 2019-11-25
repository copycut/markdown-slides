import Vue from "vue";
import Vuex from "vuex";
import uid from "uid";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

const state = {
	folders: [],
	slides: []
};

const getters = {
	folders: state => state.folders
};

const mutations = {
	ADD_FOLDER(state, newFolder) {
		state.folders.push(newFolder);
	},
	UPDATE_FOLDER(state, { title, id }) {
		const index = state.folders.findIndex(folder => folder.id === id);

		if (index !== -1) {
			state.folders.splice(index, 1, { title, id });
		}
	},
	DELETE_FOLDER(state, id) {
		state.folders = state.folders.filter(folder => folder.id !== id);
	}
};

const actions = {
	createFolder({ commit }, { title }) {
		commit("ADD_FOLDER", { title, id: uid() });
	},
	renameFolder({ commit }, { title, id }) {
		commit("UPDATE_FOLDER", { title, id });
	},
	removeFolder({ commit }, id) {
		commit("DELETE_FOLDER", id);
	}
};

export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions,
	strict: debug
});

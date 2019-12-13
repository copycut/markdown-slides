import Vue from "vue";
import VueRouter from "vue-router";
import feature from "vue-feature-toggle";
import { parseISO, isAfter } from "date-fns";
import VueResizeText from "vue-resize-text";
import store from "./store";
import App from "./components/app.vue";

// based on query params:  url?feature=new-title
feature.visibility("new-title", rule => rule.data.feature === rule.name);

// based on .env file (untracked)
// .env: RELEASE_DATE="2020-01-01"
const releaseDate = parseISO(process.env.RELEASE_DATE);
feature.visibility("timed-feature", () => isAfter(new Date(), releaseDate));

Vue.use(VueRouter);
Vue.use(VueResizeText);

const router = new VueRouter({
	mode: "history"
});

new Vue({
	el: "#root",
	store,
	router,
	render: h => h(App)
});

// TODO: split store in modules (UI, Settings, Storage, Drive,...)

const helpers = require("../mixins/storage/index.js");

module.exports = new Vuex.Store({
	state: {
		currentView: null,
		isDark: false,
		isSidebarOpen: false,
		showModal: false,
		currentModal: 'AppModal', // 'ModalSpace'

		quotaBytes: 0,
		usageBytes: 0,
		isSecretLink: false,

		crypto: null,
		network: null,
		context: null,
		paymentProperties: null,

		isLoggedIn: false,
		isAdmin: false,

		driveMenuPosition: null
	},

	getters: {
		currentTheme: (state) => {
			return state.isDark ? "dark-mode" : "";
		},

		quota: (state) => {
			if (state.quotaBytes == 0)
				return "N/A";

			return helpers.convertBytesToHumanReadable(state.quotaBytes.toString());
		},
		usage: (state) => {
			if (state.usageBytes == 0)
				return "N/A";

			return helpers.convertBytesToHumanReadable(state.usageBytes.toString());
		}
	},

	// Sync
	mutations: {
		// UI
		SET_VIEW(state, payload) {
			state.view = payload;
		},
		SET_THEME(state, payload) {
			state.isDark = payload;
		},
		TOGGLE_THEME(state) {
			state.isDark = !state.isDark;
		},
		SET_SIDEBAR(state, payload) {
			state.isSidebarOpen = payload;
		},
		TOGGLE_SIDEBAR(state) {
			state.isSidebarOpen = !state.isSidebarOpen;
		},
		SET_MODAL(state, payload) {
			state.showModal = payload;
		},
		CURRENT_MODAL(state, payload) {
			state.currentModal = payload;
			state.showModal = true;
		},
		CURRENT_VIEW(state, payload) {
			state.currentView = payload;
		},

		// Settings
		SET_CRYPTO(state, payload) {
			state.crypto = payload;
		},
		SET_NETWORK(state, payload) {
			state.network = payload;
		},
		SET_USER_CONTEXT(state, payload) {
			state.context = payload;
		},
		SET_PAYMENT_PROPERTIES(state, payload) {
			state.paymentProperties = payload;
		},

		// Storage
		SET_QUOTA(state, payload) {
			state.quotaBytes = payload;
		},
		SET_USAGE(state, payload) {
			state.usageBytes = payload;
		},

		// User
		USER_LOGIN(state, payload) {
			state.isLoggedIn = payload;
		},
		USER_ADMIN(state, payload) {
			state.isAdmin = payload;
		},

		//Drive
		SET_DRIVE_MENU_POSITION(state, payload) {
			state.driveMenuPosition= payload;
		}
	},

	// Async
	actions: {
		updateQuota({ commit, state }) {
			if (state.isSecretLink)
				return;
			return state.context.getQuota().thenApply(q => {
				commit('SET_QUOTA', q)
			});
		},

		updateUsage({ commit, state }) {
			if (state.isSecretLink)
				return;

			return state.context.getSpaceUsage().thenApply(u => {
				commit("SET_USAGE", u);
			});
		},
	}

});

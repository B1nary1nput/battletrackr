import Axios from 'axios'

const apiEndpoint = process.env.API_ENDPOINT


export default {
	// The state that contains the data
	state: {
		drawer: true
	},

	// Mutations set/change the state, should ideally need actions to run
	mutations: {
		setDrawer(state, drawerState) {
			state.drawer = drawerState
		},
	},

	// Actions call a mutation with data as a param, in order to save/change data
	// Can use ...mapActions([])
	actions: {
		saveDrawerState({
			commit
		}, drawerState) {
			commit('setDrawer', drawerState)
		},
	},

	// Used in the frontend to display the data
	// Can use ...mapGetters([])
	getters: {
		DRAWER_STATE: state => {
			return state.drawer
		},
	},
}
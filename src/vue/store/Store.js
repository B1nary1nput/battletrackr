import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

Vue.use(Vuex);


const apiEndpoint = 'http://localhost:3000/'


let store = new Vuex.Store({
	state: {
		encounters: [],
		monsters: [],
		loading: true,
		darkTheme: false
	},

	getters: {
		ENCOUNTERS: state => {
			return state.encounters
		},

		MONSTERS: state => {
			return state.monsters
		},
		
		DARKTHEME: state => {
			return state.darkTheme
		}
	},

	actions: {
		setDarkTheme({ commit, dispatch}, darkTheme) {
			commit('setDarkTheme', darkTheme)
		},

		getEncounters({
			commit
		}) {
			Axios.get(apiEndpoint + 'encounters')
				.then(response => {
					commit('setEncounters', response.data) //Saves the requested data to the store
					commit('changeLoadingState', false) //Changes loading state
				})
		},

		saveEncounter(context, payload) {
			Axios.post(apiEndpoint + 'encounters', {
					name: payload.name
				})
				.then(response => {
					context.dispatch('getEncounters') // Get the encounters anew to populate the available ones
				})
		},

		deleteEncounter({
			commit,
			dispatch
		}, encounter) {
			Axios.delete(apiEndpoint + 'encounters/' + encounter.id)
				.then(response => {
					commit('deleteEncounter', encounter)
				})
		},

		getMonsters({
			commit
		}, encounter) {
			Axios.get(apiEndpoint + 'encounters/' + encounter)
				.then(response => {
					commit('setMonsters', response.data)
					commit('changeLoadingState', false)
				})
		},

		saveMonster(context, payload) {
			Axios.post(apiEndpoint + 'monster/' + payload.encounter_id, {
					name: payload.name,
					isbossmonster: payload.isbossmonster,
					maxhitpoints: payload.maxhitpoints,
					currenthitpoints: payload.currenthitpoints,
					encounter_id: payload.encounter_id,
				})
				.then(response => {
					context.dispatch('getMonsters', payload.encounter_id) // Get the encounters anew to populate the available ones
				})
		},

		deleteMonster({
			commit,
			dispatch
		}, monster) {
			Axios.delete(apiEndpoint + 'monster/' + monster.id)
				.then(response => {
					commit('deleteMonster', monster)
				})
				.catch(err => {
					console.error('Error: ', err)
				})
		},
	},

	mutations: {
		setDarkTheme(state, darkTheme) {
			state.darkTheme = darkTheme
		},

		changeLoadingState(state, loading) {
			state.loading = loading
		},

		setEncounters(state, encounters) {
			state.encounters = encounters
		},

		deleteEncounter(state, encounter) {
			let encounters = state.encounters

			const index = encounters.indexOf(encounter);
			encounters.splice(index, 1);
		},

		setMonsters(state, monsters) {
			state.monsters = monsters
		},

		deleteMonster(state, monster) {
			let monsters = state.monsters

			const index = monsters.indexOf(monster);
			monsters.splice(index, 1);
		},


	},
});

export default store;
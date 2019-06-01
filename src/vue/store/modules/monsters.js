import Axios from 'axios'
const apiEndpoint = 'http://localhost:3000/'


export default {
	// The state that contains the data
	state: {
		monsters: []
	},

	// Mutations set/change the state, should ideally need actions to run
	mutations: {
		setMonsters(state, monsters) {
			console.log('monsters: ', monsters)
			state.monsters = monsters
		},

		deleteMonster(state, monster) {
			let monsters = state.monsters

			const index = monsters.indexOf(monster);
			monsters.splice(index, 1);
		},
	},

	// Actions call a mutation with data as a param, in order to save/change data
	// Can use ...mapActions([])
	actions: {
		getMonsters({
			commit
		}, command) {
			if (command.user_id && command.encounter_id) {

				Axios.get(apiEndpoint + `user/${command.user_id}/encounters/${command.encounter_id}`, {
						withCredentials: true
					})
					.then(response => {
						commit('setMonsters', response.data.monsters.rows)
						commit('changeLoadingState', false)
					})
			}
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

	// Used in the frontend to display the data
	// Can use ...mapGetters([])
	getters: {
		MONSTERS: state => {
			return state.monsters
		},
	},
}
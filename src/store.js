import Vuex from 'vuex'
import defaultBoard from './default-board'

const store = new Vuex.Store({
    state: {
        board: defaultBoard
    },

    mutations: {

    }
})

export default store
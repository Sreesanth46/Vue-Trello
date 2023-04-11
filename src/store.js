import Vuex from 'vuex'
import defaultBoard from './default-board'
import { saveStatePlugin } from './utils'

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

const store = new Vuex.Store({
    plugins: [saveStatePlugin],

    state: {
        board
    },

    mutations: {

    }
})

export default store
import Vuex from 'vuex'
import defaultBoard from './default-board'
import { saveStatePlugin } from './utils'

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

const store = new Vuex.Store({
    plugins: [saveStatePlugin],

    state: {
        board
    },

    getters: {
        getTasks(state) {
            return (id) => {
                for (const column of state.board.columns) {
                    for (const task of column.tasks) {
                        if (task.id == id) {
                            return task
                        }
                    }
                }
            }
        }
    },

    mutations: {

    }
})

export default store
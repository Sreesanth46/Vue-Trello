import Vuex from 'vuex'
import defaultBoard from './default-board'
import { saveStatePlugin, uuid } from './utils'

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
        CREATE_TASK(state, { tasks, name }) {
            tasks.push({
                name,
                id: uuid(),
                description: ''
            })
        } 
    }
})

export default store
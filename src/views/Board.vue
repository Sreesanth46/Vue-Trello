<template>
    <div class="board">
        <div class="flex flex-row items-start">
            <div
                class="column"
                v-for="(column, $columnIndex) of board.columns"
                :key="$columnIndex"
            >
                <div class="flex items-center mb-2 font-fold">
                    {{ column.name }}
                </div>
                <div class="list-reset">
                    <div
                        class="task"
                        v-for="(task, $taskIndex) of column.tasks"
                        :key="$taskIndex"
                        @click="goToTask(task)"
                    >
                        <span class="w-full flex-no-shrink font-bold">
                            {{ task.name }}
                        </span>
                        <p
                            v-if="task.description"
                            class="w-full flex-no-shrink mt-1 text-sm"
                        >
                            {{ task.description }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="task-bg" v-if="isTaskOpen" @click="close">
            <router-view />
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    computed: {
        ...mapState(["board"]),

        isTaskOpen() {
            return this.$route.name === "task";
        },
    },

    methods: {
        goToTask(task) {
            this.$router.push({ name: "task", params: { id: task.id } });
        },

        close() {
            // close on outer click not working.
            this.$router.push({ name: "board" });
        },
    },
};
</script>

<style lang="css">
.task {
    @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white  no-underline;
}

.column {
    @apply p-2 mr-4 text-left shadow rounded;
    min-width: 350px;
}

.board {
    @apply p-4 h-full overflow-auto;
    /* background: rgb(1, 207, 111); */
}
</style>
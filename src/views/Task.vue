<template>
    <div class="task-view">
        <div class="flex flex-col flex-grow itens-start justify-between px-4">
            {{ task.name }}
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters(["getTasks"]),

        task() {
            return this.getTasks(this.$route.params.id);
        },
    },
};
</script>

<style>
.task-view {
    @apply relative flex flex-row bg-white mx-4 m-32 mx-auto py-4 text-left rounded shadow;
    max-width: 700px;
}
</style>
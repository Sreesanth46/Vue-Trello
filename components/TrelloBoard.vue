<script setup lang="ts">
import { nanoid } from 'nanoid';
import type { Column, Task } from '~/types';
import draggable from 'vuedraggable';

const columns = ref<Column[]>([
  {
    id: nanoid(),
    title: 'Backlog',
    tasks: [
      {
        id: nanoid(),
        title: 'task 1',
        createdAt: new Date()
      },
      {
        id: nanoid(),
        title: 'task 2',
        createdAt: new Date()
      },
      {
        id: nanoid(),
        title: 'task 3',
        createdAt: new Date()
      }
    ]
  },

  {
    id: nanoid(),
    title: 'In Progress',
    tasks: []
  },

  {
    id: nanoid(),
    title: 'Open',
    tasks: []
  },
  {
    id: nanoid(),
    title: 'Closed',
    tasks: []
  },

  {
    id: nanoid(),
    title: 'Resigned',
    tasks: []
  }
]);

const alt = useKeyModifier('Alt');
</script>

<template>
  <div>
    <draggable
      v-model="columns"
      :animation="150"
      handle="#drag-handle"
      group="columns"
      item-key="id"
      class="flex gap-4 overflow-x-auto items-start">
      <template #item="{ element: column }: { element: Column }">
        <div class="column bg-gray-200 p-5 rounded min-w-[250px]">
          <header class="font-bold mb-4">
            <DragHandle id="drag-handle" />
            {{ column.title }}
          </header>
          <draggable
            v-model="column.tasks"
            :animation="150"
            handle="#drag-handle"
            :group="{ name: 'tasks', pull: alt ? 'clone' : true }"
            item-key="id">
            <template #item="{ element: task }: { element: Task }">
              <div>
                <TrelloBoardTask
                  :task="task"
                  @delete="
                    column.tasks = column.tasks.filter(t => t.id !== $event)
                  " />
              </div>
            </template>
          </draggable>
          <footer>
            <NewTask @add="column.tasks.push($event)" />
          </footer>
        </div>
      </template>
    </draggable>
  </div>
</template>

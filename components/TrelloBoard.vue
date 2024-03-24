<script setup lang="ts">
import { nanoid } from 'nanoid';
import type { Column, Task } from '~/types';
import draggable from 'vuedraggable';

const columns = useLocalStorage<Column[]>(
  'trelloBoard',
  [
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
  ],
  {
    serializer: {
      read: value => {
        return JSON.parse(value).map((column: Column) => {
          column.tasks = column.tasks.map((task: Task) => {
            task.createdAt = new Date(task.createdAt);
            return task;
          });
          return column;
        });
      },
      write: value => JSON.stringify(value)
    }
  }
);

const alt = useKeyModifier('Alt');

function createColumn() {
  const column: Column = {
    id: nanoid(),
    title: '',
    tasks: []
  };
  columns.value.push(column);

  /**
   * nextTick is used to make sure that VUE has updated the DOM
   * before we query the element
   */
  nextTick(() => {
    (
      document.querySelector(
        '.column:last-of-type .title-input'
      ) as HTMLInputElement
    ).focus();
  });
}

/**
 * To update columns in the backend server
 * deep: true -> since columns is an array
 */
// watch(
//   columns,
//   () => {
//     // api call
//   },
//   { deep: true }
// );
</script>

<template>
  <div class="flex items-start overflow-x-auto gap-4">
    <draggable
      v-model="columns"
      :animation="150"
      handle="#drag-handle"
      group="columns"
      item-key="id"
      class="flex gap-4 items-start">
      <template #item="{ element: column }: { element: Column }">
        <div class="column bg-gray-200 p-5 rounded min-w-[250px]">
          <header class="font-bold mb-4">
            <DragHandle id="drag-handle" />
            <input
              class="title-input bg-transparent focus:bg-white rounded p-1 w-4/5"
              @keyup.enter="($event.target as HTMLInputElement).blur()"
              @keydown.backspace="
                column.title === ''
                  ? (columns = columns.filter(c => c.id !== column.id))
                  : null
              "
              type="text"
              v-model="column.title" />
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

    <button
      @click="createColumn"
      class="bg-gray-200 whitespace-nowrap p-2 rounded opacity-50">
      + Add Another Column
    </button>
  </div>
</template>

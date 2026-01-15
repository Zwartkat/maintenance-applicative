<template>
  <div class="max-w-4xl mx-auto mt-6 p-4 max-h-[400px] overflow-y-auto">
    <n-spin :show="teacherStore.isLoading">
      <n-data-table
        :columns="columns"
        :data="sortedProfessors"
        :row-class-name="rowClassName"
        :bordered="false"
        :show-header="false"
        striped
      />
    </n-spin>
    <n-alert v-if="teacherStore.error" type="error" class="mt-4">
      {{ teacherStore.error }}
    </n-alert>
  </div>
</template>

<script setup lang="ts">
import { computed, h, onMounted } from 'vue'
import { NDataTable, NButton, NSpace, NTag, NSpin, NAlert } from 'naive-ui'
import { ArrowUpOutline, ArrowDownOutline } from '@vicons/ionicons5'
import type { DataTableColumns } from 'naive-ui'
import { useTeacherStore } from '../stores/teacherStore'
import type { Teacher } from '../types/teacherTypes'

interface Professor {
  id: number
  firstName: string
  lastName: string
  upVotes: number
  downVotes: number
}

const teacherStore = useTeacherStore()

onMounted(() => {
  teacherStore.fetchTeachers()
})

const sortedProfessors = computed(() => {
  return [...teacherStore.filteredTeachers]
    .map(teacher => ({
      ...teacher,
      upVotes: teacher.upVotes ?? 0,
      downVotes: teacher.downVotes ?? 0,
    }))
    .sort((a, b) => (b.upVotes - b.downVotes) - (a.upVotes - a.downVotes))
    .map((prof, index) => ({ ...prof, rank: index + 1 }))
})

function rowClassName(row: Professor & { rank: number }) {
  if (row.rank === 1) return 'bg-yellow-100'
  if (row.rank === 2) return 'bg-gray-100'
  if (row.rank === 3) return 'bg-orange-100'
  return ''
}

async function upvote(prof: Professor) {
  const userId = Number(localStorage.getItem('userId'))
  if (userId) {
    await teacherStore.vote(prof.id, 'upvote', userId)
    await teacherStore.fetchTeachers()
  }
}

async function downvote(prof: Professor) {
  const userId = Number(localStorage.getItem('userId'))
  if (userId) {
    await teacherStore.vote(prof.id, 'downvote', userId)
    await teacherStore.fetchTeachers()
  }
}

const columns: DataTableColumns<Professor & { rank: number }> = [
  {
    title: '',
    key: 'rank',
    width: 60,
    align: 'center',
  },
  {
    title: '',
    key: 'firstName',
  },
  {
    title: '',
    key: 'lastName',
  },
  {
    title: '',
    key: 'score',
    align: 'center',
    render(row) {
      const score = row.upVotes - row.downVotes
      const type = score > 0 ? 'success' : score < 0 ? 'error' : 'default'
      return h(NTag, { type, round: true }, { default: () => score })
    }
  },
  {
    title: '',
    key: 'votes',
    align: 'center',
    render(row) {
      return h(NSpace, { justify: 'center' }, {
        default: () => [
          h(NTag, { type: 'success', size: 'small' }, { default: () => `${row.upVotes}` }),
          h(NTag, { type: 'error', size: 'small' }, { default: () => `${row.downVotes}` }),
        ]
      })
    }
  },
  {
    title: '',
    key: 'actions',
    align: 'center',
    render(row) {
      return h(NSpace, { justify: 'center' }, {
        default: () => [
          h(NButton, {
            type: 'success',
            size: 'medium',
            onClick: () => upvote(row)
          }, { icon: () => h(ArrowUpOutline) }),
          h(NButton, {
            type: 'error',
            size: 'medium',
            onClick: () => downvote(row)
          }, { icon: () => h(ArrowDownOutline) }),
        ]
      })
    }
  },
]
</script>

<style scoped>
:deep(.bg-yellow-100 td) {
  background-color: rgb(254 249 195) !important;
}
:deep(.bg-gray-100 td) {
  background-color: rgb(243 244 246) !important;
}
:deep(.bg-orange-100 td) {
  background-color: rgb(255 237 213) !important;
}
:deep(.n-data-table-table) {
  border-collapse: separate !important;
  border-spacing: 0 12px;
}

:deep(.n-data-table-table tr) {
  background-color: white; 
  border-radius: 8px;
}

:deep(.n-data-table-table thead) {
  display: none;
}
</style>

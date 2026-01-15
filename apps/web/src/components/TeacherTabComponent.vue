<template>
  <div class="max-w-4xl mx-auto mt-6 p-4">
    <n-data-table
      :columns="columns"
      :data="sortedProfessors"
      :row-class-name="rowClassName"
      :bordered="false"
      :show-header="false"
      striped
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, h } from 'vue'
import { NDataTable, NButton, NSpace, NTag } from 'naive-ui'
import { ArrowUpOutline, ArrowDownOutline } from '@vicons/ionicons5'
import type { DataTableColumns } from 'naive-ui'

interface Professor {
  id: number
  firstName: string
  lastName: string
  upVotes: number
  downVotes: number
}

const professors = ref<Professor[]>([
  { id: 1, firstName: 'Jean', lastName: 'Dupont', upVotes: 3, downVotes: 1 },
  { id: 2, firstName: 'Marie', lastName: 'Durand', upVotes: 5, downVotes: 2 },
  { id: 3, firstName: 'Pierre', lastName: 'Martin', upVotes: 8, downVotes: 1 },
  { id: 4, firstName: 'Sophie', lastName: 'Bernard', upVotes: 2, downVotes: 3 },
  { id: 5, firstName: 'Luc', lastName: 'Petit', upVotes: 4, downVotes: 0 },
])

const sortedProfessors = computed(() => {
  return [...professors.value]
    .sort((a, b) => (b.upVotes - b.downVotes) - (a.upVotes - a.downVotes))
    .map((prof, index) => ({ ...prof, rank: index + 1 }))
})

function rowClassName(row: Professor & { rank: number }) {
  if (row.rank === 1) return 'bg-yellow-100'
  if (row.rank === 2) return 'bg-gray-100'
  if (row.rank === 3) return 'bg-orange-100'
  return ''
}

function upvote(prof: Professor) {
  const found = professors.value.find(p => p.id === prof.id)
  if (found) found.upVotes++
}

function downvote(prof: Professor) {
  const found = professors.value.find(p => p.id === prof.id)
  if (found) found.downVotes++
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

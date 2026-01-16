<template>
  <div class="max-w-4xl mx-auto mt-6 p-4 max-h-[400px] overflow-y-auto teacher-table-container">
    <n-spin :show="teacherStore.isLoading">
      <!-- Professeurs avec des votes -->
      <n-data-table
        v-if="votedProfessors.length > 0"
        :columns="columns"
        :data="votedProfessors"
        :row-class-name="rowClassName"
        :bordered="false"
        :show-header="false"
        striped
      />
      
      <!-- Séparateur -->
      <div v-if="votedProfessors.length > 0 && unvotedProfessors.length > 0" class="separator-section">
        <div class="flex items-center gap-4 py-4">
          <div class="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <span class="text-white/40 text-sm font-medium">Sans vote</span>
          <div class="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
      </div>
      
      <!-- Professeurs sans votes -->
      <n-data-table
        v-if="unvotedProfessors.length > 0"
        :columns="columns"
        :data="unvotedProfessors"
        :row-class-name="() => 'unvoted-row'"
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

// Professeurs avec au moins un vote (upvote ou downvote)
const votedProfessors = computed(() => {
  return [...teacherStore.filteredTeachers]
    .map(teacher => ({
      ...teacher,
      upVotes: teacher.upVotes ?? 0,
      downVotes: teacher.downVotes ?? 0,
    }))
    .filter(prof => prof.upVotes > 0 || prof.downVotes > 0)
    .sort((a, b) => (b.upVotes - b.downVotes) - (a.upVotes - a.downVotes))
    .map((prof, index) => ({ ...prof, rank: index + 1 }))
})

// Professeurs sans aucun vote
const unvotedProfessors = computed(() => {
  return [...teacherStore.filteredTeachers]
    .map(teacher => ({
      ...teacher,
      upVotes: teacher.upVotes ?? 0,
      downVotes: teacher.downVotes ?? 0,
    }))
    .filter(prof => prof.upVotes === 0 && prof.downVotes === 0)
    .sort((a, b) => a.lastName.localeCompare(b.lastName))
    .map((prof, index) => ({ ...prof, rank: votedProfessors.value.length + index + 1 }))
})

const sortedProfessors = computed(() => {
  return [...votedProfessors.value, ...unvotedProfessors.value]
})

function rowClassName(row: Professor & { rank: number }) {
  if (row.rank === 1) return 'bg-gold-dark'
  if (row.rank === 2) return 'bg-silver-dark'
  if (row.rank === 3) return 'bg-bronze-dark'
  return ''
}

async function upvote(prof: Professor) {
  const userId = Number(localStorage.getItem('user'))
  if (userId) {
    await teacherStore.vote(prof.id, true, userId)
    await teacherStore.fetchTeachers()
  }
}

async function downvote(prof: Professor) {
  const userId = Number(localStorage.getItem('user'))
  if (userId) {
    await teacherStore.vote(prof.id, false, userId)
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
.teacher-table-container {
  scrollbar-width: thin;
  scrollbar-color: rgba(34, 197, 94, 0.3) rgba(0, 0, 0, 0.2);
}

.teacher-table-container::-webkit-scrollbar {
  width: 6px;
}

.teacher-table-container::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.teacher-table-container::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, rgba(34, 197, 94, 0.4) 0%, rgba(34, 197, 94, 0.2) 100%);
  border-radius: 8px;
  border: 1px solid rgba(34, 197, 94, 0.1);
}

.teacher-table-container::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, rgba(34, 197, 94, 0.6) 0%, rgba(34, 197, 94, 0.3) 100%);
}

:deep(.n-data-table-table) {
  border-collapse: separate !important;
  border-spacing: 0 8px;
}

:deep(.n-data-table-table tr) {
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(10, 10, 10, 0.4) 100%);
  border: 1px solid rgba(34, 197, 94, 0.05);
  backdrop-filter: blur(10px);
}

:deep(.n-data-table-table tbody tr:hover) {
  transform: scale(1.01) translateX(3px);
  box-shadow: 
    0 8px 25px rgba(34, 197, 94, 0.15),
    inset 0 1px 0 rgba(34, 197, 94, 0.1);
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.08) 0%, rgba(34, 197, 94, 0.04) 100%) !important;
  border-color: rgba(34, 197, 94, 0.2);
}

:deep(.n-data-table-table tbody tr:hover td) {
  background: transparent !important;
}

:deep(.n-data-table-table td) {
  background: transparent !important;
  color: rgba(255, 255, 255, 0.9);
  padding: 12px 16px;
}

:deep(.n-data-table-table thead) {
  display: none;
}

/* Couleurs spéciales pour le podium */
:deep(.bg-gold-dark) {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.15) 0%, rgba(255, 193, 7, 0.08) 100%) !important;
  border-color: rgba(255, 215, 0, 0.3) !important;
  box-shadow: 0 4px 20px rgba(255, 215, 0, 0.1);
}

:deep(.bg-silver-dark) {
  background: linear-gradient(135deg, rgba(192, 192, 192, 0.15) 0%, rgba(169, 169, 169, 0.08) 100%) !important;
  border-color: rgba(192, 192, 192, 0.3) !important;
  box-shadow: 0 4px 20px rgba(192, 192, 192, 0.1);
}

:deep(.bg-bronze-dark) {
  background: linear-gradient(135deg, rgba(205, 127, 50, 0.15) 0%, rgba(184, 115, 51, 0.08) 100%) !important;
  border-color: rgba(205, 127, 50, 0.3) !important;
  box-shadow: 0 4px 20px rgba(205, 127, 50, 0.1);
}

:deep(.unvoted-row) {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.01) 100%) !important;
  border-color: rgba(255, 255, 255, 0.05) !important;
  opacity: 0.7;
}

/* Animation pour le changement de rang */
:deep(.n-data-table-table tbody tr) {
  animation: slideIn 0.4s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Effet de montée/descente */
:deep(.rank-up) {
  animation: rankUp 0.6s ease-out;
}

:deep(.rank-down) {
  animation: rankDown 0.6s ease-out;
}

@keyframes rankUp {
  0% {
    background: linear-gradient(135deg, rgba(34, 197, 94, 0.3) 0%, rgba(34, 197, 94, 0.15) 100%) !important;
    transform: translateY(15px);
    box-shadow: 0 8px 30px rgba(34, 197, 94, 0.3);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes rankDown {
  0% {
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.1) 100%) !important;
    transform: translateY(-15px);
    box-shadow: 0 8px 30px rgba(239, 68, 68, 0.2);
  }
  100% {
    transform: translateY(0);
  }
}

.separator-section {
  margin: 1rem 0;
}
</style>

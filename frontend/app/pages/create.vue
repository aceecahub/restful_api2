<script setup lang="ts">
import { useCategory } from '~/composable/useCategory'

const { createCategory } = useCategory()
const name = ref('')
const loading = ref(false)

const handleCreate = async () => {
  if (!name.value.trim()) return alert('Nama kategori tidak boleh kosong!')
  loading.value = true
  try {
    await createCategory(name.value)
    navigateTo('/')
  } catch (err: any) {
    alert(err?.data?.message || 'Gagal menambah kategori')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-md mx-auto my-12 px-4">
    <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Tambah Kategori Baru</h2>
      
      <form @submit.prevent="handleCreate" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nama Kategori</label>
          <input 
            v-model="name"
            type="text" 
            placeholder="Contoh: Makanan, Elektronik"
            class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            required
          />
        </div>

        <div class="flex justify-end gap-2 pt-2">
          <NuxtLink 
            to="/" 
            class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Batal
          </NuxtLink>
          <button 
            type="submit" 
            :disabled="loading"
            class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:bg-indigo-400"
          >
            {{ loading ? 'Menyimpan...' : 'Simpan' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
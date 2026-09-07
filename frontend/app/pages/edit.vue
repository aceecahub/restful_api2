<script setup lang="ts">
import { useCategory } from '~/composable/useCategory'
const route = useRoute()
const id = Number(route.query.id || route.params.id)
const { categories, updateCategory } = useCategory()
const name = ref('')
const loading = ref(false)

watchEffect(() => {
  if (categories.value && categories.value.length > 0) {
    const item = categories.value.find(c => String(c.id) === String(id))
    if (item) {
      name.value = item.name
    }
  }
})

const handleUpdate = async () => {
  if (!name.value.trim()) return alert('Nama kategori tidak boleh kosong!')
  loading.value = true
  try {
    await updateCategory(id, name.value)
    navigateTo('/')
  } catch (err: any) {
    alert(err?.data?.message || 'Gagal mengubah kategori')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-md mx-auto my-12 px-4">
    <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Ubah Nama Kategori</h2>
      
      <form @submit.prevent="handleUpdate" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nama Kategori</label>
          <input 
            v-model="name"
            type="text" 
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
            class="rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 disabled:bg-amber-400"
          >
            {{ loading ? 'Memperbarui...' : 'Perbarui' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
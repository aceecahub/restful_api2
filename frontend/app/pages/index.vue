<script setup lang="ts">
import { useCategory } from '~/composable/useCategory'

const { categories, deleteCategory } = useCategory()

const handleHapus = async (id: string | number): Promise<void> => {
  if (confirm("Yakin ingin menghapus?")) {
    try {
      await deleteCategory(id)
      alert("Berhasil dihapus!")
    } catch (error) {
      alert("Gagal menghapus data")
    }
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto my-8 px-4">
    <!-- Header: Judul dan Tombol Tambah -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 tracking-tight">
          Daftar Kategori
        </h1>
        <p class="text-sm text-gray-500 mt-1">
          Kelola data kategori produk aplikasi Anda.
        </p>
      </div>
      <NuxtLink
        to="/create"
        class="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
      >
        <svg class="-ml-0.5 mr-1.5 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
        </svg>
        Tambah Data
      </NuxtLink>
    </div>

    <!-- Tabel Data -->
    <div class="overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white">
      <table class="w-full border-collapse text-left text-sm text-gray-500">
        <thead class="bg-gray-50/70 border-b border-gray-200">
          <tr>
            <th scope="col" class="px-6 py-4 font-semibold text-gray-900 w-20 text-center">
              No
            </th>
            <th scope="col" class="px-6 py-4 font-semibold text-gray-900">
              Kategori
            </th>
            <th scope="col" class="px-6 py-4 font-semibold text-gray-900 text-center w-40">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-if="!categories || categories.length === 0">
            <td colspan="3" class="px-6 py-10 text-center text-gray-400 italic">
              Tidak ada data kategori.
            </td>
          </tr>

          <tr
            v-else
            v-for="(category, index) in categories"
            :key="category.id"
            class="hover:bg-gray-50/60 transition-colors"
          >
            <td class="px-6 py-4 text-center font-medium text-gray-400">
              {{ index + 1 }}
            </td>
            <td class="px-6 py-4 font-medium text-gray-900">
              {{ category.name }}
            </td>
            <td class="px-6 py-4">
              <div class="flex justify-center gap-2">
                <!-- Tombol Edit -->
                <NuxtLink
                  :to="`/edit?id=${category.id}`"
                  class="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-xs font-semibold text-amber-600 border border-amber-200 shadow-sm hover:bg-amber-50 hover:border-amber-300 transition-all"
                >
                  Edit
                </NuxtLink>
                <!-- Tombol Hapus -->
                <button
                  class="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-xs font-semibold text-red-600 border border-red-200 shadow-sm hover:bg-red-50 hover:border-red-300 transition-all"
                  @click="handleHapus(category.id)"
                >
                  Hapus
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
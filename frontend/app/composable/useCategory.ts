export interface Category {
  id: string | number;
  name: string;
}

export interface ApiResponse<T> {
  status: string;
  message?: string;
  data?: T;
}

export const useCategory = () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase as string;

  const { data: categories, refresh, error, status } = useAsyncData<Category[]>(
    "categories",
    async () => {
      const res = await $fetch<ApiResponse<Category[]>>("/category", { baseURL: apiBase });
      return res.data || [];
    }
  );

  const createCategory = async (name: string) => {
    const res = await $fetch<ApiResponse<Category>>("/category", {
      method: "POST",
      baseURL: apiBase,
      body: { name },
    });
    await refresh();
    return res;
  };

  const updateCategory = async (id: string | number, name: string) => {
    const res = await $fetch<ApiResponse<Category>>(`/category/${id}`, {
      method: "PUT",
      baseURL: apiBase,
      body: { name },
    });
    await refresh();
    return res;
  };

  const deleteCategory = async (id: string | number) => {
    const res = await $fetch<ApiResponse<null>>(`/category/${id}`, {
      method: "DELETE",
      baseURL: apiBase,
    });
    await refresh();
    return res;
  };

  return {
    categories,
    refresh,
    error,
    status,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};
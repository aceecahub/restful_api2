import {
    CategoryService
} from "../service/categoryService";

export const CategoryController = {
  getAll: async ({ set }: any) => {
    try {
      const categories = await CategoryService.getAll();
      return { status: "success", data: categories };
    } catch (error) {
      set.status = 500;
      return { status: "error", message: "Failed to fetch categories" };
    }
  },

  getById: async ({
    params: { id },
    set,
  }: any & { params: { id: number } }) => {
    try {
      const category = await CategoryService.getById(id);
      if (!category) {
        set.status = 404;
        return { status: "error", message: "Category not found" };
      }
      return { status: "success", data: category };
    } catch (error) {
      set.status = 500;
      return { status: "error", message: "Failed to fetch category" };
    }
  },

  create: async ({ body: { name }, set }: any & { body: { name: string } }) => {
    try {
      const category = await CategoryService.create(name);
      set.status = 201;
      return {
        status: "success",
        message: "Category created successfully",
        data: category,
      };

      // cek duplicate data
    } catch (error: any) {
      if (error.name === "DuplicateError") {
        set.status = 400;
        return { status: "error", message: error.message };
      }

      set.status = 500;
      return { status: "error", message: error.message };
    }
  },

  update: async ({
    params: { id },
    body: { name },
    set,
  }: any & { params: { id: number }; body: { name: string } }) => {
    try {
      const category = await CategoryService.update(id, name);
      return {
        status: "success",
        message: "Category updated successfully",
        data: category,
      };
    } catch (error) {
      set.status = 404;
      return { status: "error", message: "Category not found" };
    }
  },

  delete: async ({ params: { id }, set }: any & { params: { id: number } }) => {
    try {
      await CategoryService.delete(id);
      return { status: "success", message: "Category deleted successfully" };
    } catch (error) {
      set.status = 404;
      return { status: "error", message: "Category not found" };
    }
  },
};

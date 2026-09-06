import { prisma } from "../../prisma/client"

export const CategoryService = {

    getAll: async () => {
        return await prisma.category.findMany({
            orderBy: { id: "asc" }
        })
    },

    getById: async (id: number) => {
        return await prisma.category.findUnique({
            where: { id }
        })
    },

    create: async (name: string) => {
    // cek duplicate data
    const exist = await prisma.category.findFirst({
        where: { name }
    })

    if (exist) {
        const error = new Error("Category already exists")
        error.name = "DuplicateError"
        throw error
    }

    return await prisma.category.create({
        data: { name }
    })
},

    update: async (id: number, name: string) => {
    return await prisma.category.update(
        {
            where: { id },
            data: { name }
        }
    )
},

    delete: async (id: number) => {
    return await prisma.category.delete({
        where: { id }
    })
}
}
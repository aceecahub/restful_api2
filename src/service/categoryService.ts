import { prisma } from "../../prisma/client"

const getAllCategory = async () => {
    return await prisma.category.findMany({
        orderBy: { id: "asc" }
    })
}

const getCategoryById = async (id: number) => {
    return await prisma.category.findUnique({
        where: { id }
    })
}

const createCategory = async (name: string) => {
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
}

const updateCategory = async (id: number, name: string) => {
    return await prisma.category.update(
        {
            where: { id },
            data: { name }
        }
    )
}

const deleteCategory = async (id: number) => {
    return await prisma.category.delete({
        where: { id }
    })
}

export {
    getAllCategory,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}
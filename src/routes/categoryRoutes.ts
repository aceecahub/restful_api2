import { Elysia, t } from "elysia"
import { CategoryController } from "../controller/categoryController"

const idParamSchema = t.Object({
    id: t.Numeric()
})

const categoryBodySchema = t.Object({
    name: t.String({ minLength: 1 })
})

const categoryRoutes = new Elysia({ prefix: "/api/category" })
    .get("/", CategoryController.getAll)
    .get("/:id", CategoryController.getById, { params: idParamSchema })
    .post("/", CategoryController.create, { body: categoryBodySchema })
    .put("/:id", CategoryController.update, { params: idParamSchema, body: categoryBodySchema })
    .delete("/:id", CategoryController.destroy, { params: idParamSchema })

export default categoryRoutes

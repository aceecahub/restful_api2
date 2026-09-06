import { Elysia } from "elysia"
import categoryRoutes from "./routes/categoryRoutes"

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .get("/api/name", () => ({ name: "Echa Gacor" }))
  .use(categoryRoutes)
  .listen(5000)

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
)

import { Elysia } from "elysia"
import { cors } from "@elysiajs/cors"
import categoryRoutes from "./routes/categoryRoutes"

const app = new Elysia()
  .use(cors())
  .get("/", () => "Hello Elysia")
  .get("/api/name", () => ({ name: "Echa Gacor" }))
  .use(categoryRoutes)
  .listen(5000)

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
)

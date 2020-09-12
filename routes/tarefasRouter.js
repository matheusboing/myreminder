const express = require("express")
const router = express.Router()
const tarefasController = require("../controllers/tarefasController")
const app = require("../bin/server")
const authMiddleware = require("../middlewares/authMiddleware")

router.use((req, res, next) => authMiddleware(req, res, next))

app.use("/tarefas",
    router.get("/", (req, res) => tarefasController.getAll(req, res)),
    router.get("/:id", (req, res) => tarefasController.get(req, res)),
    router.post("/", (req, res) => tarefasController.post(req, res)),
    router.put("/:id", (req, res) => tarefasController.put(req, res)),
    router.delete("/:id", (req, res) => tarefasController.delete(req, res))
)
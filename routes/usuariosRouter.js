const express = require("express")
const router = express.Router()
const usuariosController = require("../controllers/usuariosController")
const app = require("../bin/server")
const authMiddleware = require("../middlewares/authMiddleware")

router.use((req, res, next) => authMiddleware(req, res, next))

app.use('/usuarios', 
    router.get("/", (req, res) => usuariosController.get(req, res)),
    router.post("/", (req, res) => usuariosController.post(req, res)),
    router.put("/", (req, res) => usuariosController.put(req, res)),
    router.delete("/", (req, res) => usuariosController.delete(req, res))
)

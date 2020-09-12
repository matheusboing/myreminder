const sqlite = require("sqlite-sync")
const base64 = require("base-64")
const path = require("path")
const database = require("../db/database")
const { info } = require("console")


const authMiddleware = function(req, res, next){
    let { authorization } = req.headers

    if(!authorization || !authorization.startsWith("Basic ")) {
        return res.status(401).send()
    }

    authorization = authorization.replace("Basic ", "")

    try {
        authorization = base64.decode(authorization)
    } catch {
        return res.status(400).send()
    }

    if(!authorization.includes(":")) {
        return res.status(401).send()
    }

    const [nome, senha] = authorization.split(":")

    let usuario = database.selectFirst(`SELECT * FROM usuarios WHERE nome = '${nome}'`)

    if(!usuario || usuario.senha != senha ) {
        return res.status(401).send()
    }

    next()

}

module.exports = authMiddleware
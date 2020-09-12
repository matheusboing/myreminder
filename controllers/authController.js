const base64 = require("base-64")
const database = require("../db/database")

const authController = {
    post(req, res) {
        const login = req.body
        let usuario = database.selectFirst(`SELECT nome, senha FROM usuarios WHERE nome = '${login.nome}'`)

        if(!usuario) {
            return res.status(404).send({error: "Credenciais inválidas"})
        }

        if(usuario.senha != login.senha) {
            return res.status(404).send({error: "Credenciais inválidas"})
        }

        const token = base64.encode(usuario.nome + ":" + usuario.senha)
        res.send({token})
    }
}

module.exports = authController
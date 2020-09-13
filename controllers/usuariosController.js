const database = require("../db/database")
const sqliteConnection = require("../db/database")


const usuariosController = {
    get(req, res) {
        const { id } = req.user
        let usuario = database.selectFirst(`SELECT * FROM usuarios WHERE usuarios.id = '${ id }'`)

        if(!usuario) {
            return res.status(404).send({error: "Usuário não encontrado"})
        }

        res.send(usuario)
    },

    post(req, res) {
        const body = req.body

        delete body.id

        body.id = database.insert("usuarios", body)
        res.status(201).send(body)
    },

    put(req, res) {
        const { id } = req.user
        const body = req.body

        let usuario = database.selectFirst(`SELECT id, nome, senha FROM usuarios WHERE usuarios.id = '${ body.id }'`)

        if(parseInt(id) !== parseInt(body.id)) {
            return res.status(400).send({error: "O ID do corpo da requisiçao é diferente do ID da URL"})
        }  

        if(!usuario) {
            return res.status(404).send({error: "Usuário não encontrado"})
        }

         usuario.nome = body.nome
         usuario.senha = body.senha
         database.update("usuarios", usuario, {id: body.id})
         res.send(usuario)
    },

    delete(req, res) {
        const { id } = req.user
        let usuario = database.selectFirst(`SELECT * FROM usuarios WHERE usuarios.id = ${id}`)

        if (!usuario) {
            res.status(404).send({error: "Usuário não encontrado"})
        }

        database.delete("usuarios", {id: id})
        res.status(204).send()
    }
}

module.exports = usuariosController
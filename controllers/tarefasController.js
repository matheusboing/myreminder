const express = require("express")
const database = require("../db/database")

const tarefasController = {
    getAll(req, res) {
        tarefas = database.select("SELECT * FROM tarefas")
        res.send(tarefas)
    },

    get(req, res) {
        const { id } = req.params
        const tarefa = database.selectFirst(`SELECT * FROM tarefas WHERE tarefas.id = ${id}`)

        if(!tarefa) {
            return res.status(404).send({error: "Tarefa não encontrada"})
        }

        res.send(tarefa)
    },

    post(req, res) {
        const body = req.body

        delete body.id

        body.id = database.insert('tarefas', body)
        res.status(201).send()
    },

    put(req, res) {
        const { id } = req.params 
        const body = req.body

        let tarefa = database.selectFirst(`SELECT * FROM tarefas WHERE tarefas.id = ${id}`)

        if(parseInt(body.id) !== parseInt(id)) {
            return res.status(400).send({error: "O ID do corpo da requisição é diferente do ID da URL"})
        }

        if(!tarefa) {
            return res.status(404).send({error: "Tarefa não encontrada"})
        }

        tarefa.titulo = body.titulo
        tarefa.conclusao = body.conclusao
        tarefa.idUsuario = body.idUsuario

        database.update("tarefas", tarefa, {id: body.id})

        res.send(tarefa)
    },

    delete(req, res) {
        const { id } = req.params
        const tarefa = database.selectFirst(`SELECT * FROM tarefas WHERE tarefas.id = ${id}`)

        if(!tarefa) {
            return res.status(404).send({error: "Tarefa não encontrada"})
        }

        database.delete("tarefas", {id: id})
        res.status(201).send()
        
    }
}

module.exports = tarefasController;


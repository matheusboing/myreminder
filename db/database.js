const path = require("path")
const sqlite = require("sqlite-sync")

const sqliteConnection = {
    connect() {
        sqlite.connect(path.resolve(__dirname, "../database.sqlite"));
    },

    disconect() {
        sqlite.close();
    },

    select(sql) {
        this.connect()
        const resultado = sqlite.run(sql);
        this.disconect();

        return resultado;
    },

    insert(table, data) {
        this.connect()
        const resultado = sqlite.insert(table, data)
        this.disconect()

        return resultado
    },

    update(table, data, where) {
        this.connect()
        const resultado = sqlite.update(table, data, where)
        this.disconect()

        return resultado
    },

    delete(table, where) {
        this.connect()
        const resultado = sqlite.delete(table, where)
        this.disconect()

        return resultado
    },

    selectFirst(sql) {
        let resultado = this.select(sql)
        
        return resultado[0]
    }
}

module.exports = sqliteConnection
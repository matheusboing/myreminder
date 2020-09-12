const app = require('./bin/server')
/**
 * Importar rotas aqui:
 */

require("./routes/routes")

/**
 * Inicia o servidor
 */
 app.listen(3000, function() {
     console.log("listening on localhost:3000")
 })

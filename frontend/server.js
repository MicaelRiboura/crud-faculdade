
const bodyParser = require('body-parser') //dependencia de pegar dados no formulário
const express = require('express') // dependencia de servidor
const app = express()

app.use(express.static('src')) //Serve todas as páginas estáticas
app.use(bodyParser.urlencoded({extended: true})) //Transforma requisição em objeto
app.use(bodyParser.json()) //Transforma o JSON em Objeto

app.listen(8080, () => console.log('Server para Frontend executando...'))
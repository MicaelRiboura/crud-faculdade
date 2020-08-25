
const express = require('express') // dependencia de servidor
const app = express()

app.use(express.static('src')) //Serve todas as páginas estáticas
app.listen(8080, () => console.log('Server para Frontend executando...'))
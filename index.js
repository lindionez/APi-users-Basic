/****** MODULOS ******/
const express = require('express');
const app = express();
const users = require('./dataBase/controlers/users');
// Setando como json
app.use(express.json());

// Rotas
app.post('/database/usuarios/adicionar', users.insert);
app.put('/database/usuarios/update/:id', users.update);
app.get('/database/usuarios/getall', users.findAll);
app.get('/database/usuarios/getbyname/name=:nome&&senha=:senha', users.login);
app.delete('/database/usuarios/delete/token=:token&&name=:nome', users.delete);


// Inicializando o servidor
const PORT = process.env.PORT || 6512;
app.listen(PORT, () => {
    console.log(`Api online na porta: ${PORT}`);
});
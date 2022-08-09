/****** MODULOS ******/
const express = require('express');
const app = express();
const users = require('./dataBase/controlers/users');

// Middleware de autenticação 
const { authenticateApi } = require("./middleware");

// Setando como json
app.use(express.json());

// Rotas
app.post('/database/usuarios/adicionar', authenticateApi , users.insert);
app.put('/database/usuarios/update/:id', authenticateApi , users.update);
app.get('/database/usuarios/getall', authenticateApi , users.findAll);
app.get('/database/usuarios/getbyname/name=:nome&&senha=:senha', authenticateApi , users.login);
app.delete('/database/usuarios/delete/token=:token&&name=:nome', authenticateApi , users.delete);


// Inicializando o servidor
const PORT = process.env.PORT || 6512;
app.listen(PORT, () => {
    console.log(`Api online na porta: ${PORT}`);
});
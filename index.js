/****** MODULOS ******/
const express = require('express');
const app = express();
const users = require('./dataBase/controlers/users');
// Setando como json
app.use(express.json());

// Rotas
app.post('/database/usuarios', users.insert);
app.put('/database/update/:id', users.update);


// Inicializando o servidor
const PORT = process.env.PORT || 6512;
app.listen(PORT, () => {
    console.log(`Api online na porta: ${PORT}`);
});
/****** MODULOS ******/
const express = require('express');
const app = express();
const users = require('./dataBase/users');
// Setando como json
app.use(express.json());

// Rotas
app.post('/usuarios', users.insert);
app.put('/update/:id', users.update);


// Inicializando o servidor
const PORT = process.env.PORT || 6512;
app.listen(PORT, () => {
    console.log(`Api online na porta: ${PORT}`);
});
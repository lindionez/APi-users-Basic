const express = require('express');
const app = express();


// Setando como json
app.use(express.json());

// Rotas
app.get('/', (req, res) => {
    res.json({ "Nada encontrado": "Use api de forma correta!" });
});

app.get('/usuarios', (req, res) => {
    res.json({ "Error": "Digite o nome de usuario!" });
});

app.get('/usuarios/:name', (req, res) => {
    var name = req.params.name;
    res.json({ "Nome": name });
});

app.post('/usuarios', async (req, res) => {
    var body = await req.body;
    // Futura verificação de email existente!
    if (body.email.includes('sexo@gmail.com')) return res.json({ "Error": "Email Ja temn seu lixo burro!" });
    res.json({ "Nome": body.name, "Email": body.email, "Senha": body.password });
    console.log(body);
});

// Inicializando o servidor
const PORT = process.env.PORT || 6512;
app.listen(PORT, () => {
    console.log(`Api online na porta: ${PORT}`);
});
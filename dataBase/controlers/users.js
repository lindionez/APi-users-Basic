const mysql = require('mysql2/promise');
const { key } = require('../config.json');

var connection = mysql.createPool({
    host: (process.env.MYSQL_HOST) ? process.env.MYSQL_HOST : 'localhost',
    user: (process.env.MYSQL_USER) ? process.env.MYSQL_USER : 'root',
    password: (process.env.MYSQL_PASSWORD) ? process.env.MYSQL_PASSWROD : '',
    database: (process.env.MYSQL_DATABASE) ? process.env.MYSQL_DATABASE : 'apidouglas'
});

module.exports = {
    async insert(req, res) {
        var data = {
            "Nome": req.body.name,
            "Email": req.body.email,
            "Senha": req.body.password
        }
        try {
            var respose = await connection.query('INSERT INTO users SET ?', [data]);
            res.json(respose);
        } catch (error) {
            console.log(error);
            res.json({ status : "error"});
        }

    },
    async update(req, res) {
        var id = req.params.id;
        var data = {
            "Nome": req.body.name,
            "Email": req.body.email,
            "Senha": req.body.password
        }
        try {
            var respose = await connection.query('UPDATE users SET ? WHERE id = ?', [data, id]);
            res.json(respose);
        } catch (error) {
            console.log(error);
            res.json({ status : "error"});
        }
    },
    async findAll(req, res) {
        try {
            var respose = await connection.query('SELECT * FROM users');
            res.json(respose[0]);
        } catch (error) {
            console.log(error);
            res.json({ status : "error"});
        }
    },
    async login(req, res) {
        var nome = req.params.nome;
        var senha = req.params.senha;
        try {
            var respose = await connection.query('SELECT * FROM users WHERE nome = ?', [nome]);
            if (respose[0][0].senha != senha) return await res.json({ error : "senha incorreta"});
            await res.json(respose[0]);
        } catch (error) {
            console.log(error);
            res.json({ status : "error"});
        }
    },
    async delete(req, res) {
        var nome = req.params.nome;
        var token = req.params.token;
        try {
            if (token != key) return await res.json({ error : "token incorreto"});
            var respose = await connection.query('DELETE FROM users WHERE nome = ?', [nome]);
            if (respose[0].affectedRows == 0) return await res.json({ error : "usuario não encontrado"});
            res.json(respose);
        } catch (error) {
            console.log(error);
            res.json({ status : "error"});
        }
    }
}

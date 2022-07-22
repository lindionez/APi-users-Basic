const connection = require('../mysql');

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
    
}

const mysql = require('mysql2/promise');

var connection = mysql.createPool({
  host: (process.env.MYSQL_HOST) ? process.env.MYSQL_HOST : 'localhost',
  user: (process.env.MYSQL_USER) ? process.env.MYSQL_USER : 'root',
  password: (process.env.MYSQL_PASSWORD) ? process.env.MYSQL_PASSWROD : '',
  database: (process.env.MYSQL_DATABASE) ? process.env.MYSQL_DATABASE : 'apidouglas'
});

exports.authenticateApi = async (req, res, next) => {
  if (!req.headers.authorization) return res.status(401).json({ error: 'Token não informado' });

  try {
    const auth = req.headers.authorization;
    var tmp = auth.split(' ');   // Split on a space, the original auth looks like  "Basic Y2hhcmxlczoxMjM0NQ==" and we need the 2nd part
    var buf = Buffer.from(tmp[1], 'base64'); // create a buffer and tell it the data coming in is base64
    var plain_auth = buf.toString();        // read it back out as a string

    console.log("autorizado", plain_auth);

    // At this point plain_auth = "username:password"

    var creds = plain_auth.split(':');      // split on a ':'
    var nome = creds[0];
    var senha = creds[1];
    if ((nome || senha) === '') return res.status(401).json({ error: 'Usuário ou senha inválidos' });

    var respose = await connection.query('SELECT * FROM users WHERE nome = ?', [nome]);
    if (respose[0][0].senha != senha) return await res.json({ error: "senha incorreta" });
    return next();
  } catch (e) {
    console.log(e);
    return res.status(401).json({
      msg: "Falha na autenticação"
    });
  }
};

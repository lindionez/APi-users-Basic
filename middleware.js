// arquivo middleware/index.js
// Exemplo de middlware de autenticação
exports.authenticateApi = async (req, res, next) => {
  
    try {
      const auth = req.headers.auhtorization || req.query.authorization;
      var tmp = auth.split(' ');   // Split on a space, the original auth looks like  "Basic Y2hhcmxlczoxMjM0NQ==" and we need the 2nd part
  
       var buf = new Buffer(tmp[1], 'base64'); // create a buffer and tell it the data coming in is base64
       var plain_auth = buf.toString();        // read it back out as a string
  
       console.log("Decoded Authorization ", plain_auth);
  
        // At this point plain_auth = "username:password"
  
        var creds = plain_auth.split(':');      // split on a ':'
        var nome = creds[0];
        var senha = creds[1];
  
        var respose = await connection.query('SELECT * FROM users WHERE nome = ?', [nome]);
        if (respose[0][0].senha != senha) return await res.json({ error : "senha incorreta"});
        await res.json(respose[0]);
    } catch (e) {
      console.log(e);
      return res.status(401).json({
        msg: "Failed to authenticate",
      });
    }
  };
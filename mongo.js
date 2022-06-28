const mongoose = require('mongoose');
main().catch(err => console.log(err));

//database conexão
async function main() {
    await mongoose.connect('mongodb://localhost:27017/database');
}

const formato = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const dataBase = mongoose.model('users', formato);

const users = new dataBase({ name: "Felipe", email: "sexo@gmail.com", password: "Senha213" });
console.log(users)

module.exports = {
    dataBase
};
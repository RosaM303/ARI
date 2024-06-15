require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

//config JSON response
app.use(express.json())

// Models
const User = require('./models/User')


// Open route - public route (para todos acessarem)
app.get('/', (req, res) => {
    res.status(200).json({ msg: "Bem vindo a nossa API" });
});

// Registrando usuário
app.post('/auth/register', async(req, res) => {
    const {name, email, password} = req.body
    
    //validações
    if(!name){
        return res.status(422).json({ msg: 'O nome é obrigatório' })
    }

    if(!email){
        return res.status(422).json({ msg: 'O email é obrigatório' })
    }

    if(!password){
        return res.status(422).json({ msg: 'A senha é obrigatória' })
    }

    // checar se o usuário existe
    const userExists = await User.findOne ({ email: email})
    
    if(userExists)
        return res.status(422).json({ msg: 'Por favor, utilize outro e-mail' })

})


// Credenciais
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS


mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.tcl90hl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => {
        app.listen(3000, () => {
            console.log('Conectado ao banco de dados!')
        })
    })
    .catch((err) => {
        console.log('Erro ao conectar ao banco de dados:', err)
    });

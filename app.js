const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()

const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const User = require('./routes/user')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'public')))

//const usuario = 'jordanluna';
//const contra = 'BMufI0MPzW0MuCgX';
//const dbname = 'registro';
//const uri = `mongodb+srv://${usuario}:${contra}@clustercertus.vilts.mongodb.net/${dbname}?retryWrites=true&w=majority`;
//mongoose.connect(mongo_uri).then((result => console.log('yes')))

const mongo_uri = "mongodb+srv://Michael_JordanL:pJPHgLJcVmn0TUrh@clustercertus.vilts.mongodb.net/registro?retryWrites=true&w=majority";    

mongoose.connect(mongo_uri).then((result) => console.log('yes'))

app.post('/register', (req, res) =>{
    const {username, password} = req.body;

    const user = new User({username, password})

    user.save(err =>{
        if(err){
            res.status(500).send('ERROR AL REGISTRAR USUARIO');

        }else{
            res.status(200).send('USUARIO REGISTRADO')
        }
    })
})

app.post('/authenticate', (req, res) =>{
    const {username, password} = req.body;

    User.findOne({username}, (err, user) =>{
        if(err){
            res.status(500).send('ERROR  AL AUTENTICAR AL USUARIO')
        }else if(!user){
            res.status(500).send('EL USUARIO NO EXISTE')
        }else{
            user.isCorrectPassword(password, (err, result) =>{
                if(err){
                    res.status(500).send('ERROR AL AUTENTICAR')    
                }else if(result){
                    res.status(200).send('USUARIO AUTENTICADO CORRECTAMENTE')
                    
                }else{
                    res.status(500).send('USUARIO Y/O CONTRASEÑA INCORRECTA')
                }
            })
        }
    })
})

app.listen(process.env.PORT || 9000, () =>{
    console.log('servidor iniciado')
})
module.expors = app;
const express = require("express");
const http = require("http").Server(express);
const Idb = require ('./config/bd');
const app = express();
const ejs =require('ejs')
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const { redirect } = require("express/lib/response");

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));


const usersScheme = new mongoose.Schema({
    nombre: {type: String},
    protagonista: {type: String},
    ano: {type: Number},
    sinopsis: {type: String}
});

const Note = mongoose.model('users', usersScheme);

app.get("/", function (req, res) {
        Note.find({}, function(err,users){
            res.render('cartelera.ejs',{
                moviesList: users
            })
    });
});
app.get("/menu.html", function(req, res) {
    res.sendFile(__dirname + "/menu.html");
});
app.get("/insertar.html", function(req, res) {
    res.sendFile(__dirname + "/insertar.html");
});
app.get("/views/borrar.ejs", function(req, res) {
    Note.find({}, function(err,users){
        res.render('borrar.ejs',{
            moviesList: users
        })
    });
});

app.get("/views/cartelera.ejs", function (req, res) {
    Note.find({}, function(err,users){
        res.render('cartelera.ejs',{
            moviesList: users
        })
    })
});

app.get("/views/cartelera.ejs", function (req, res) {
    Note.find({}, function(err,users){
        res.render('cartelera.ejs',{
            moviesList: users
        })
    })
});


app.get("/views/info_completa.ejs/views/cartelera.ejs", function (req, res) {
    res.redirect("/views/cartelera.ejs")
});
app.get("/views/info_completa.ejs", function (req, res) {
    res.redirect("/views/info_completa.ejs")
});

app.get("/views/cartelera.ejs/views/cartelera.ejs", function(req, res) {
    res.redirect("/views/cartelera.ejs")
});

app.post("/views/cartelera.ejs/buscar", function(req, res) {
    const nombre = req.body.buscar
    const encotrar = async (nombre) =>{
      UsersModel.find({nombre: nombre}, function(err,users){
           res.render('info_completa.ejs',{
               moviesList: users
           })
           
       })
       
       
   }
    encotrar(nombre);
});

app.post("/", function(req, res) {
    let newNote = new Note({
        nombre: req.body.nombre,
        protagonista: req.body.protagonista,
        ano: req.body.ano,
        sinopsis: req.body.sinopsis
    });
    newNote.save();
    res.sendFile(__dirname + "/insertar.html");
})

app.post("/views/borrar.ejs/borrar", function(req, res) {
    const id = req.body.id
    const deletemovie = async (id) =>{
    const registros= await UsersModel.deleteOne({_id: id});
         console.log(registros);
    }
    deletemovie(id);
    res.redirect("/views/borrar.ejs");
});

app.post("/views/info_completa.ejs/ver", function(req, res) {
    const id = req.body.id
     const encotrar = async (id) =>{
       UsersModel.find({_id: id}, function(err,users){
            res.render('info_completa.ejs',{
                moviesList: users
            })
            
        })
        
        
    }
     encotrar(id);
});

app.listen(3000, function() {
    console.log("Server corriendo en el puerto 3000");
})

Idb();

const UsersModel= mongoose.model('users', usersScheme)
const mostrar = async ()=> {
    const registros = await UsersModel.find();
    console.log(registros);
}
mostrar();
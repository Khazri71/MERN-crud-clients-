const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const ClientModel = require('./models/Client')


// Créer app express
const app = express()
app.use(cors())
app.use(express.json())


// Connecter base de données mongodb
mongoose.connect("mongodb://localhost:27017/crud-clients")



// API : CRUD 
// API : Afficher clients
app.get("/" , (req , res) => {
    ClientModel.find()
    .then( clients => res.json(clients))
    .catch( err => res.json(err))
})


// API : Ajouter client
app.post("/ajouterClient" , (req , res) => {
    ClientModel.create(req.body)
    .then( client => res.json(client))
    .catch( err => res.json(err))
})

// API : Obtenir client by id
app.get("/obtenirClient/:id" , (req , res) => {
    const id = req.params.id
    ClientModel.findById({_id : id})
    .then( client => res.json(client))
    .catch( err => res.json(err))
})



// API : Modifier client
app.put("/modifierClient/:id" , (req,res) => {
    const id = req.params.id
    ClientModel.findByIdAndUpdate({_id:id} , {nom : req.body.nom , email:req.body.email , age:req.body.age})
    .then( client => res.json(client))
    .catch( err => res.json(err))
})


// API : Supprimer client
app.delete("/supprimerClient/:id" , (req,res) => {
    const id = req.params.id
    ClientModel.findByIdAndDelete({_id:id})
    .then( client => res.json(client))
    .catch( err => res.json(err))
})







app.listen("3001" , () => {
    console.log("Server is Running")
})





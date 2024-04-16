const Clients = require('../models/clients')

const getAllClients = async (req,res) => {
    const clients = await Clients.find({}).sort({$natural:-1})
    //console.log(clients)
    res.status(200).render('allClients.ejs', { clients })
}

const getLastClients = async (req,res) => {
    const clients = await Clients.find({}).sort({$natural:-1}).limit(15)
    //console.log(clients)
    let random = 'Hello there'
    res.status(200).render('index.ejs', { clients })
    //res.status(200).json(clients)
}

const getClientByID = async (req,res) => {
    try {
        const client = await Clients.findById(req.params.id)
        if(client.fixed){
            const client = await Clients.findByIdAndUpdate(req.params.id, {fixed: false})
        }
        else {
            const client = await Clients.findByIdAndUpdate(req.params.id, {fixed: true})
        }
        res.status(201).redirect('back')
    } catch(error) {
        res.send(error)
    }
    
    
}

const editClientByID = async (req,res) => {
    //console.log(req.params.id)
    try {
        const client = await Clients.findById(req.params.id)
        //console.log(client)
        res.status(200).render('editClient.ejs', { editClient: client })
    } catch(error) {
        res.send("User with this ID does not exist")
    }
}


const createClient = async (req,res) => {
    console.log(req.body)
    try {
        const newClient = req.body
        await Clients.create(req.body)
        res.status(201).redirect('/')
    } catch(error) {
        res.json(error)
    }
    
    
}

module.exports = {getAllClients, getLastClients, createClient, getClientByID, editClientByID}
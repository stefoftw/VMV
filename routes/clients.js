const express = require('express')
const router = express.Router()
const clientsController = require('../controllers/clientsController')



//localhost:3000/clients
router.get('/', clientsController.getAllClients)


router.get('/editClient/:id', clientsController.editClientByID)

router.post('/', (req, res) => {
    console.log(req.body)
    res.send('Create Client')
})

// localhost:3000/clients/id
router.patch('/:id',clientsController.getClientByID)

// Option 1: This matches the /:id route for all http methods
// router.route('/:id').get((req, res) => {
//     console.log(req.user)
//     res.send(`Client with ID: ${req.user.name}`)
// }).put((req, res) => {
//     const id = req.params.id
//     res.send(`Update Client with ID: ${id}`)
// }).patch((req, res) => {
//     const id = req.params.id
//     res.send(`Update Client with ID: ${id}`)
// }).delete((req, res) => {
//     const id = req.params.id
//     res.send(`Delete Client with ID: ${id}`)
// })

// Option 2:

router.get('/:id',clientsController.getClientByID)




// router.delete('/:id',(req,res)=>{
//     const id = req.params.id
//     res.send(`Delete User with ID: ${id}`)
// })

const users = [{name: 'Kyle'},{name:'Sally'}]
router.param('id',(req,res,next,id)=> {
    req.user = users[id]
    next()
})

module.exports = router
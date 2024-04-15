const express = require('express')
const app = express()
const path = require('path')
const connectDB = require('./db/connect')
const url = 'mongodb://localhost:27017/clientsDB'
const clientsController = require('./controllers/clientsController')

//Allows access to body of page (from forms)
app.use(express.urlencoded({extended: true}))
app.use(express.json())


//Remove later
const Clients = require('./models/clients')

app.use(express.static('public'))
app.use(
    express.static(path.join(__dirname, "node_modules/bootstrap/dist/"))
  );

//Sets view engine to EJS
app.set('view engine', 'ejs')

//Get List of last 10 clients on Home Page
app.get('/',clientsController.getLastClients)

app.post('/', clientsController.createClient)
//app.patch('/clients/:id', clientsController.getClientByID)


app.get('/service',(req,res)=> {
    const text = 'text'
    res.render('ServiceNumber.ejs')
})

app.get('/editClient/:id', clientsController.editClientByID)
app.post('/editClient/:id',async (req,res) => {
    const info = req.body.information
    const phone = req.body.phone
    const name = req.body.name
    const money = req.body.money
    
    try {
        const client = await Clients.findById(req.params.id)
        if(client.information !== info) {
            const client = await Clients.findByIdAndUpdate(req.params.id, {information: info})
        }
        if(client.phone !== phone) {
            const client = await Clients.findByIdAndUpdate(req.params.id, {phone: phone})
        }
        if(client.name !== name) {
            const client = await Clients.findByIdAndUpdate(req.params.id, {name: name})
        }
        if(client.money !== info) {
            const client = await Clients.findByIdAndUpdate(req.params.id, {money: money})
        }

        
        res.status(201).redirect('/')
    } catch(error) {
        res.send(error)
    }
})


const userRouter = require('./routes/clients')
const { ClientEncryption } = require('mongodb')

// if we access home page with /users, we get access to 
// users.js http methods in routes/users.js
app.use('/clients',userRouter)

//Start Server and Connect to DB
const port = process.env.PORT || 3000
const start = async () => {
    try {
        await connectDB(url)
        app.listen(port, console.log(`Server running on Port: ${port}`))
    } catch(error) {
        console.log(error)
    }
}
start()
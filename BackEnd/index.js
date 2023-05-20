const express  = require('express')
const cors = require('cors')
const app = express()

const userRoutes = require('./routes/userRoutes')
const sectorRoutes = require('./routes/sectorRoutes')

const host = '127.0.0.1'
const port = 3333

app.use(cors("http://localhost:3000/users"))
app.use(express.json())
app.use('/users',userRoutes)
app.use('/sectors',sectorRoutes)

app.listen(port, host,()=>{
    console.log(`Server running at http://${host}:${port}`)
})
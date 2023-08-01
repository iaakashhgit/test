const express = require('express')
const app = express()
const port = 3000
const raftLabsRoutes = require('./routes/raftLabs')

app.use("/",raftLabsRoutes)

// Start the server and listen on port 3000
app.listen(port, () => {
    console.log(`server listen on port ${port}`)
})
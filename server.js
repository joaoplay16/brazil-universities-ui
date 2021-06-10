const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('./build'))

app.get('*', function (req, res) {
  res.status(200).sendFile(__dirname + '/build/index.html')
})

app.listen(process.env.PORT || 8080, () => {
  console.log('The server is now running on Port 8080')
})

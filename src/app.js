// 1. require necessary odules
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

// 2. create express application
const app = express()

// 6. add port
const port = process.env.PORT || 5000

// 3. add initial middleware
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

// 8. create routes

app.use('/notes', require('./routes/notes'))


// 4. create default route handler
app.use(function(req, res, next) {
  next( { status: 404, message: { error: 'Not Found'}} )
})

// 5. error handler
app.use(function(err, req, res, next){
  const error = {}

  error.message = err.message || "Internal Server Error"
  error.status = err.status || 500
  error.stack = err.stack

  res.status(error.status).send(error)
})

// 7. start server

app.listen(port, function(){
  console.log(`Server started on port ${port}`)
})
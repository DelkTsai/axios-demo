const express = require('express')
const bodyParser = require('body-parser')

const PORT = 3000
const app = express()
const log = console.log.bind(console)

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

app.use((req, res, next) => {
  
  next()
})
app.get('/user', (req, res) => {
  setTimeout(() => {
    res.json({
      status: 1,
      message: 'very ok'
    })
  }, 2900)
  
})

app.post('/user', (req, res) => {
  if (Math.random() > 0.5) {
    setTimeout(() => {
      res.json({
        status: -1,
        message: 'u r ok ?'
      })
    }, 2000)
  } else {
    res.json({
      status: 1,
      message: 'very good'
    })
  }
})

app.get('/random1', (req, res) => {
  res.send('random1 ' + Math.random())
})
app.get('/random2', (req, res) => {
  res.send('random2 ' + Math.random())
})

app.listen(PORT)[0]




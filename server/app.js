const express = require("express")
const { createServer } = require("http")
// const io = require("socket.io")(server);

const app = exports.app = express()
const server = exports.server = createServer(app)

const api = express.Router()

api.get('', (req, res) => {
  res.send('Olá, Minha api respondeu!!')
})

app.use('api/', api)

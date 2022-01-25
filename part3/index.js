const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('build'))
morgan.token('req', (req, res) =>{
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req'))

const persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

// get all
app.get('/api/persons', (req, res) => {
  res.json(persons)
})

// get info
app.get('/info', (req, res) => {
  res.send(
    `<div>Phonebook has info for ${persons.length} people</div> <div>${new Date()}</div>`
  )
})

// get by id
app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  person ? res.json(person) : res.status(404).end()
})

// delete by id
app.delete('/api/persons/:id', (req, res) =>  {
  const id = Number(req.params.id)
  res.status(204).end()
})

const generateId = () => {
  const maxId = Math.ceil(Math.random(0, 1) * 100)
  return maxId
}
// post
app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name) res.status(400).json({error:'missing name'}).end()
  if (!body.number) res.status(400).json({error:'missing number'}).end()
  const isHave = persons.some(person => person.number === body.number)
  if (isHave) res.status(400).json({error: 'already have number'}).end()
  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }
  res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`server is listen in port: ${PORT}`)
})
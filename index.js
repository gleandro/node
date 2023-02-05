const express = require('express')
const cors = require('cors')
const app = express()
const Note = require('./models/note')

const url = '/api/notes';
app.use(cors())
app.use(express.json())

app.get(url, (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

app.post(url, (request, response) => {
    const body = request.body
    if (!body.content) {
        return response.status(400).json({ error: 'content missing' })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    })

    note.save().then(savedNote => {
        response.json(savedNote)
    })
})

app.get(`${url}/:id`, (request, response) => {
    Note.findById(request.params.id).then(note => {
        response.json(note)
    })
})

app.delete(`${url}/:id`, (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

app.put(`${url}/:id`, (request, response) => {
    const id = Number(request.params.id)
    if (!notes.find(x => x.id === id)) {
        return response.status(400).json({
            error: 'not found note'
        })
    }
    const body = request.body
    notes = notes.map(x => x.id === id ? body : x)
    response.json(body ? body : response.status(404).end())
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
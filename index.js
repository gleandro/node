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
    Note.findById(request.params.id)
        .then(note => {
            note ? response.json(note) : response.status(404).end()
        })
        .catch(error => {
            console.log(error)
            response.status(500).send({ error: 'malformatted id' })
        })
})

app.delete(`${url}/:id`, (request, response) => {
    Note.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.put(`${url}/:id`, (request, response) => {
    const body = request.body
    const note = {
        content: body.content,
        important: body.important,
    }

    Note.findByIdAndUpdate(request.params.id, note, { new: true })
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
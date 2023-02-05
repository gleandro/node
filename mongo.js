const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://gleandro:${password}@notes.23pn9zk.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url)

const agendaSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Agenda = mongoose.model('Agenda', agendaSchema)

if (process.argv.length < 4) {
  Agenda.find({}).then(result => {
    console.log("phonebook:")
    result.forEach(note => {
      console.log(`${note.name} ${note.number}`)
    })
    mongoose.connection.close()
  })
} else {
  const agenda = new Agenda({
    name: process.argv[3],
    number: process.argv[4]
  })

  agenda.save().then(result => {
    console.log(`added ${agenda.name} number ${agenda.number} to phonebook`)
    mongoose.connection.close()
  })
}





const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('please confirm you password!')
  process.exit(1)
}

// 连接
const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.eympu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
mongoose.connect(url)
// schema
const PhonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: String
})
// model
const Phonebook = mongoose.model('Phonebook', PhonebookSchema)
const phonebook = new Phonebook({
  name: process.argv[3],
  number: process.argv[4]
})
// close
phonebook.save().then(result => {
  console.log('phonebook saved!')
  mongoose.connection.close()
})

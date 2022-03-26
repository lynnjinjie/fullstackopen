const mongoose = require('mongoose')

const url = process.env.MONGODB_URL

mongoose.connect(url).then(result => {
  console.log('connect to mongodb success')
}).catch(error => {
  console.log('connect error mes:', error.message)
})

const PhonebookSchema = new mongoose.Schema({
  name: String,
  number: String
})

PhonebookSchema.set('toJSON', {
  transform: (document, returnObj) => {
    returnObj.id = returnObj._id.toString()
    delete returnObj._id
    delete returnObj.__v
  }
})

module.exports = mongoose.model('Phonebook', PhonebookSchema)


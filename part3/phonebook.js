const mongoose = require('mongoose')

const url = process.env.MONGODB_URL

mongoose.connect(url).then(() => {
  console.log('connect to mongodb success')
}).catch(error => {
  console.log('connect error mes:', error.message)
})

const PhonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    validate: {
      validator: function(v) {
        const arr = v.split('-')
        const numLen = arr.join().length
        if (arr.length === 1) {
          return numLen > 8
        } else if (arr.length === 2) {
          const headLen = arr[0].length
          return headLen >= 2 && headLen <= 3 && numLen > 8
        } else if (arr.length > 2) {
          return false
        }
      }
    },
    required: true
  }
})

PhonebookSchema.set('toJSON', {
  transform: (document, returnObj) => {
    returnObj.id = returnObj._id.toString()
    delete returnObj._id
    delete returnObj.__v
  }
})

module.exports = mongoose.model('Phonebook', PhonebookSchema)


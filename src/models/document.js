const mongoose = require('mongoose')

const documentSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  file_name: {
    type: String,
    required: true
  },
  file_data: {
    type: String,
    required: true
  }
}, { timestamps: true })

const model = mongoose.model('Document', documentSchema)

module.exports = model

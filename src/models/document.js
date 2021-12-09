const mongoose = require('mongoose')

const documentSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  file_name: String,
  file_data: Buffer
}, { timestamps: true })

const model = mongoose.model('Document', documentSchema)

module.exports = model

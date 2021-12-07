const mongoose = require('mongoose')

const documentSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
      unique: true
    },
    file: {
      file_name: { type: String },
      file_data: { type: Buffer }
    }
  }
)

const model = mongoose.model('Document', documentSchema)

module.exports = model

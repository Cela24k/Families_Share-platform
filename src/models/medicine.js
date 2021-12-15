const mongoose = require('mongoose')

const medSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true
    },
    med_name: {
      type: String,
      required: true
    },
    user_id: {
      type: String,
      required: true
    },
    repetition: {
      type: Boolean,
      required: true
    },
    different_timeslots: {
      type: Boolean,
      required: true
    },
    status: {
      type: String,
      required: true
    }
  }, { timestamps: true })

const model = mongoose.model('Medicine', medSchema)

module.exports = model

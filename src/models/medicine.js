const mongoose = require('mongoose')

const medSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true
    },
    user_id: {
      type: String,
      required: true
    },
    information: {
      name: {
        type: String,
        required: true
      },
      color: String,
      description: String

    },
    dates: {
      selectedDay: {
        day: {
          type: String,
          required: true
        }// cambiare e vedere cosa mettere da qui per poi gesitre le post
      },
      repetition: Boolean,
      repetitionType: String,
      lastSelect: Date
    },
    timeslots: {
      type: String
    },
    status: {
      type: String,
      required: true
    }
  }, { timestamps: true })

const model = mongoose.model('Medicine', medSchema)

module.exports = model

const mongoose = require('mongoose')

const health_profileSchema = new mongoose.Schema(
  {
    health_id: {
      type: String,
      unique: true,
      required: true
    },
    user_id: {
      type: String,
      required: true
    },
    mood: {
      text: String,
      rate: Number
    },
    sintomi: {
      type: String
    },
    allergies: {
      type: String
    },
    day: {
      type: Date,
      default: Date.now,
      required: true
    }
  },
  { timestamps: true }
)

const model = mongoose.model('HealthProfile', health_profileSchema)

module.exports = model

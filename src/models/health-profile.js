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
      type: Number
      // encoding based on your mood
    },
    sintomi: {
      type: Buffer
    },
    day: {
      type: Date,
      default: Date.now,
      required: true
    }
  },
  { timestamps: true }
)

const model = mongoose.model('health-profile', health_profileSchema)

module.exports = model

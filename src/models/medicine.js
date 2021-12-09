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
    assumption: {
      // Buffer of full dates (month + day + time) o str
      type: Buffer
      // EX 'December 17, 1995 03:24:00' o '1995-12-17T03:24:00'
    }
  }
)

function get_date_nd_time (datetime) {
  var date_time
  if (!('string'.localeCompare(typeof datetime))) { date_time = new Date(datetime) } else date_time = datetime
  return {
    getMonth: function () {
      return date_time.getMonth() // 0 = gennaio
    },

    getDay: function () {
      return date_time.getDay() // 0 = domenica
    },

    getHours: function () {
      return date_time.getHours()
    },

    getMinutes: function () {
      return date_time.getMinutes()
    },

    toString: function () {
      return date_time.toLocaleTimeString()
    }
  }
}

const model = mongoose.model('Medicine', medSchema)

module.exports = model

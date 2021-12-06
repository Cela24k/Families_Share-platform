const express = require('express')
const router = new express.Router()

/* TODO http request per richiedere i documenti */
router.get('/', (req, res, next) => {
  return (res.status(202).send('Yeah'))
})

module.exports = router

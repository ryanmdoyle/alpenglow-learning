const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('Hello World!'));

router.get('/test', (req, res) => res.send({ testing: "hello!" }));

module.exports = router;